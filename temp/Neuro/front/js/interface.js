{
	let netArray = {};
	testToken().then((val)=>{
		return getNetList()
	})
	.then((list)=>{
		console.log(list);
		list.forEach((val)=>{
			netArray[val._id] = val;
		})
		setInterface(list);
	})
	.catch((err)=>{
		loginShow()
		console.log(err.message)
	});
	const auth = document.querySelector("#auth"); //Регистрация и авторизация
	const root = document.querySelector("#root");
	function loginShow(){
		auth.style.display = "block";
		root.style.display = "none";
	}
	function openNet(id){
		let trainScene = document.querySelector("#scene4");
		let lastActive = document.querySelector(".content.active");
		lastActive.classList.remove("active");
		trainScene.classList.add("active");
		let name_label = trainScene.querySelector(".name_label");
		name_label.innerHTML = netArray[id].name;
	}
	function setList(list, mode){
		let netList = document.querySelector("#net_list");
		let listForPush = list.reduceRight((acc1, elem)=>{
			 return acc1 + `
				<li>
					<div class = "left_side">
						<h2 class = "name_label">${elem.name}</h2>
						<div class = "net_list-nav">
							<input type = "button" class = "open" value = "Открыть" data-id = "${elem._id}">
							<input type = "button" class = "del" value = "Удалить" data-id = "${elem._id}">
						</div>
					</div>
					<div class = "right_side">
						Объекты изучения:
						<ul>
							${
								elem.trainObj.reduce((acc2, trainElem)=>{
									return acc2 + `<li>${trainElem}</li>`
								}, '')
							}
						</ul>
					</div>
				</li>
			`
		}, '');
		if(mode == "add"){
			listForPush += netList.innerHTML;
		}
		netList.innerHTML = listForPush;

	}
	function setInterface(list, mode){ //Убирает auth и выставляет nav
		document.querySelectorAll(".active").forEach((elem)=>{
			elem.classList.remove("active");
		})
		let li = document.querySelector("nav li");
		if(li.dataset.scene == "scene1"){
			li.remove();
		}
		if(list.length){
			li = document.createElement('li');
			li.dataset.scene = "scene1";
			li.innerText = "Мои нейронки";
			let listUl = document.querySelector("nav ul");
			listUl.prepend(li);
		}else{
			li = document.querySelector("nav li");
		}
		li.classList.add("active");
		let scene = document.querySelector("#" + li.dataset.scene);
		scene.classList.add("active");

		root.style.display = "block";
		auth.style.display = "none";
		setList(list, mode);
	}
	function pushMessage(msg){
		const container = document.querySelector('#push_message-wrapper');
		let msgDiv = document.createElement('div');
		msgDiv.className = 'push_message-content';
		msgDiv.innerText = msg;
		msgDiv.style.bottom = "-160px";
		msgDiv.style.marginTop = "-60px";
		msgDiv.style.position = "relative";
		msgDiv.style.opacity = "1";
		setTimeout(()=>{
			msgDiv.style.bottom = "0px";
			msgDiv.style.marginTop = "10px";
		}, 30)
		setTimeout(()=>{
			msgDiv.style.opacity = "0";
		}, 3000)
		setTimeout(()=>{
			msgDiv.remove();
		}, 4000)
		container.appendChild(msgDiv);
	}
	const authForm = document.querySelector("#auth-form"); //Логин или регистрация
	authForm.addEventListener("submit", (e)=>{
		e.preventDefault();
		let login = document.querySelector("#login").value;
		let password = document.querySelector("#pass").value;
		auth.style.display = "none";
		let path = e.submitter.formAction.split("/").pop();
		goAuth(path, login, password)
		.then((msg)=>{
			pushMessage(msg.message);
			return getNetList()
		})
		.then((list)=>{
			list.forEach((val)=>{
				netArray[val._id] = val;
			})
			setInterface(list);
			console.log(list);
		})
		.catch((err)=>{
			loginShow();
			pushMessage(err.message);
			console.log(err.message);
		});
	});

	const nav = document.querySelector("nav"); //Переход по главным сценам
	nav.addEventListener("click", (e)=>{
		if(e.target.tagName == "LI"){
			if(e.target.dataset.scene == "logout"){
				localStorage.removeItem('user');
				loginShow();
				netArray = {};
				return 0;
			}
			const oldLi = document.querySelector("ul li.active");
			oldLi.classList.remove("active");
			e.target.classList.add("active");
			const oldScene = document.querySelector(".content.active");
			const curScene = document.querySelector("#" + e.target.dataset.scene);
			oldScene.classList.remove("active");
			curScene.classList.add("active");
		}
	});

	const plus = document.querySelector("#plus"); //Добавление поля ввода объекта изучения
	plus.addEventListener("click", ()=>{
		const inputs = document.querySelectorAll('#train_objects input[type="text"]');
		const newInput = document.createElement('input');
		newInput.type = "text";
		newInput.setAttribute("maxlength", "40");
		newInput.required = true;
		inputs[inputs.length - 1].after(newInput);
		let scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
		minus.style.display = "inline-block";
		window.scrollTo(pageXOffset, scrollHeight);
	});

	const minus = document.querySelector("#minus"); //Удаление поля ввода объекта изучения
	minus.addEventListener('click', ()=>{
		let childs = [...document.querySelectorAll('#train_objects input[type="text"]')];
		childs.pop().remove();
		if(childs.length <= 1){
			minus.style.display = "none";
		}
	});

	let name = "Деревяшка";
	const inputForName = document.querySelector("#name"); //Считывание и применение имени нейронки
	inputForName.addEventListener("input", (e)=>{
		const h2 = document.querySelector("#difHeader");
		const value = inputForName.value.trim() || "нейронная сеть";
		name = value[0].toUpperCase() + value.slice(1, value.length).toLowerCase();
		h2.innerText = "Я хочу, чтоб " + name + " различала:";
	})

	const trainObjectsForm = document.querySelector("#train_objects"); //Установка базовых данных и переход к след. этапу
	trainObjectsForm.addEventListener("submit", (e)=>{
		e.preventDefault();
		const trainObjects = [...trainObjectsForm.querySelectorAll('input[type="text"]')].map((inp)=>inp.value.trim());
		createNet({trainObjects, name})
		.then((net)=>{
			netArray[net._id] = net;
			setInterface([net], "add");
			pushMessage("Создано!:)");
		})
		.catch((err)=>{
			console.log(err.message);
			pushMessage(err.message);
		});
	})

	let netList = document.querySelector("#net_list");
	netList.addEventListener("click", (e)=>{
		if(e.target.className == "del"){ //Удаление нейронки
			e.target.style.display = "none";
			let targetParent = e.target.parentNode.parentNode.parentNode;
			deleteNet(e.target.dataset.id)
			.then((ans)=>{
				targetParent.remove();
				pushMessage(ans.message);
				let li = document.querySelector('#net_list li');
				if(!li){
					setInterface([]);
				}
			})
			.catch((err)=>{
				pushMessage(err.message);
				e.target.display = "block";
			});
		}
		if(e.target.className == "open"){ //Открытие нейронки
			openNet(e.target.dataset.id)
		}
	})
}
