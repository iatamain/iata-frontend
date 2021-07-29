const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.json();

app.listen(8088, () => console.log(`Слушаем порт!`));

app.use(urlencodedParser, (req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "Origin, Content-type");
	if(req.method == "OPTIONS"){
		return res.status(200).send('ok');
	}
	next();
})
const messages = [];
app.post("/sendMsg", (req, res)=>{
  res.status(200).send(req.body);
	messages.push(req.body);
	if(messages.length > 7) messages.shift();
});

app.get("/getMessages", (req, res)=>{
	res.status(200).send(messages);
});