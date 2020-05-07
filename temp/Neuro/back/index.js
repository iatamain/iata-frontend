const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const brain = require("./brain-browser.min.js");
const User = require('./models/User');
const Net = require('./models/Net');
const JsonNet = require('./models/JsonNet');
const auth = require('./middleware/auth.middleware')
const {jwtSecret, mongoUrl, port} = require('./config');
const app = express();
const {Types} = mongoose;
const urlencodedParser = bodyParser.json();

async function start(){
	mongoose.connect(mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(()=>{
		app.listen(port, () => console.log(`Слушаем порт ${port}!`));
	})
	.catch((e)=>{
		console.log('Ошибка подключения к бд: ' + e.message);
	});
}
start();
app.use(urlencodedParser, (req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-type");
	if(req.method == "OPTIONS"){
		return res.status(200).send('ok');
	}
	next();
})
app.post('/test', (req, res) => {
	res.status(200).send(req.body)
});

app.post('/reg', (req, res) => {
		const {login, password} = req.body;
		let user;
		User.findOne({login})
		.then((candidate)=>{
			return new Promise((resolve, reject)=>{
				if(candidate){
					reject("Пользователь уже существует");
				}else{
					resolve(bcrypt.hash(password, 12))
				}
			})
		})
		.then((hashedPassword)=>{
			user = new User({login, password: hashedPassword});
			return user.save()
		})
		.then(()=>{
			console.log("Создан новый пользователь", login, password);
			token = jwt.sign(
				{ userId: user.id },
				jwtSecret,
				{ expiresIn: '1h' }
			)
			res.status(201).send({
				message: "Пользователь создан",
				token,
				userId: user.id,
			});
		})
		.catch((e)=>{
			console.log("Неуспешная попытка создать пользователя. Ошибка: " + e)
			res.status(400).send({message: e})
		})
		}
);
app.post('/login', (req, res) => {
		const {login, password} = req.body;
		let user;
		User.findOne({login})
		.then((foundUser)=>{
			user = foundUser;
			return new Promise((resolve, reject)=>{
				if(!user){
					reject("Пользователь не найден");
				}else{
					resolve(bcrypt.compare(password, user.password))
				}
			})
		})
		.then((isEquiv)=>{
			return new Promise((resolve, reject)=>{
				if(isEquiv){
					console.log("Авторизовались", login, password);
					let token = jwt.sign(
						{ userId: user.id },
						jwtSecret,
						{ expiresIn: '7d' }
					)
					res.status(201).send({
						message: "Авторизовались",
						token,
						userId: user.id
					});
				}else{
					reject("Неверный пароль")
				}
			})
		})
		.catch((e)=>{
			console.log("Неуспешная попытка залогиниться. Ошибка: " + e)
			res.status(400).send({message: e})
		})
		}
);
app.get('/netList', auth, (req, res)=>{
	Net.find({owner: req.user.userId})
	.then((nets)=>{
		console.log("Отправляем список нейронок");
		res.status(200).send(nets);
	})
	.catch((err)=>{
		console.log("Ошибка: ", e);
		res.status(400).send({message: e});
	})
})
app.get('/testToken', auth, (req, res)=>{
	res.status(200).send({message: "Токен валидный"});
})
app.post('/createNet', auth, (req, res)=>{
	let {name} = req.body;
	let {trainObjects} = req.body;
	net = new Net({
		name,
		trainObj: trainObjects,
		owner: req.user.userId
	});
	net.save()
	.then((val)=>{
		console.log("Нейронка создана");
		res.status(201).send(val);
	})
	.catch((e)=>{
		console.log(e)
		res.status(400).send({message: "Создать не удалось :с"})
	})
})
app.delete('/deleteNet/:id', auth, (req, res)=>{
	console.log("Удаляем", req.params.id);
	Net.deleteOne( {"_id": Types.ObjectId(req.params.id)})
	.then((e)=>{
		return JsonNet.deleteOne( {"ownerNet": Types.ObjectId(req.params.id)})
	})
	.then(()=>{
		res.status(200).send({message: "Удалено!"});
	})
	.catch((err)=>{
		console.log("Не получилось:с", e);
		res.status(400).send({message: "Удалить не удалось :с"});
	})
})
app.put('/addTrainData', auth, (req, res)=>{
	let {_id, trainData} = req.body;
	Net.updateOne({_id, owner: req.user.userId}, { $push: {trainData} })
	.then((net)=>{
		res.status(200).send({message: "Добавлено к выборке!:)"});
	})
	.catch((err)=>{
		console.log("Ошибка: ", e);
		res.status(400).send({message: "Добавить не удалось :с"});
	})
})
app.delete('/removeTrainData', auth, (req, res)=>{
	let {_id, trainData} = req.body;
	Net.updateOne({_id, owner: req.user.userId}, { $pull: {trainData} })
	.then((net)=>{
		res.status(200).send({message: "Удалено!"});
	})
	.catch((err)=>{
		console.log("Ошибка: ", e);
		res.status(400).send({message: "Удалить не удалось :с"});
	})
})
app.put('/train', auth, (req, res)=>{
	let {_id} = req.body;
	const net = new brain.NeuralNetwork();
	Net.findOne({_id, owner: req.user.userId})
	.then((foundNet)=>{
		//Начинаем обучать
		let trainData = foundNet.trainData;
		trainData.forEach((val, i)=>{
			trainData[i].input = trainData[i].input.reduce((acc, val)=>acc.concat(val), []);
		})
		return net.trainAsync(trainData, {log: true});
	})
	.then((ans)=>{
		return Net.updateOne({_id, owner: req.user.userId}, {
			$set: {
				isTrain: true,
			}
		})
	})
	.then(()=>{
		return JsonNet.findOne({ownerNet: _id, ownerUser: req.user.userId})
	})
	.then((res)=>{
		if(!res){
			let jsonNet = new JsonNet({
				ownerNet: _id,
				ownerUser: req.user.userId,
				net: JSON.stringify(net.toJSON())
			})
			return jsonNet.save()
		}else{
			return res.updateOne({ownerNet: _id, ownerUser: req.user.userId}, {
				$set: {
					net: JSON.stringify(net.toJSON())
				}
			})
		}
	})
	.then(()=>{
		console.log("Обучили нейронку и сохранили");
		res.status(200).send({message: "Обучили!"});
	})
	.catch((err)=>{
		//сonsole.log("Ошибка: ", err);
		console.log("Ошибочка", err)
		res.status(400).send({message: err});
	})
})
app.post('/ask', auth, (req, res)=>{
	const {_id, data} = req.body;
	JsonNet.findOne({ownerNet: _id, ownerUser: req.user.userId})
	.then((jsonNet)=>{
			if(jsonNet){
				jsonNet = JSON.parse(jsonNet.net);
				const net = new brain.NeuralNetwork();
				net.fromJSON(jsonNet);
				res.status(200).send({message: brain.likely(data, net), info: net.run(data)});
			}else{
				throw {message: "Сеть не обучена"};
			}
	})
	.catch((err)=>{
		console.log("Ошибочка", err)
		res.status(400).send({message: err});
	})
})
