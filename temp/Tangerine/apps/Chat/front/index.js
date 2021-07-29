const userNameInput = document.querySelector("#name");
userNameInput.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		const userName = userNameInput.value;
		document.querySelector("#authorization").style.display = "none";
		document.querySelector("#container").style.display = "flex";
		const msgInput = document.querySelector("#msg");
		const color = "#" + Math.random().toString(16).slice(2, 5);

		const msgContainer = document.querySelector("#messages");
		msgInput.addEventListener("keydown", (event) => {
			if (event.key == "Enter") {
				fetch("http://127.0.0.1:8088/sendMsg", {
					method: "post",
					headers: {
						"Content-type": "application/json;charset=utf-8",
					},
					body: JSON.stringify({
						text: msgInput.value,
						user: { color, userName },
					}),
				});
				msgInput.value = "";
			}
		});

		setInterval(() => {
			fetch("http://127.0.0.1:8088/getMessages", {
				method: "get",
				headers: {
					"Content-type": "application/json;charset=utf-8",
				},
			})
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					msgContainer.innerHTML = res.reduce((acc, msg) => {
						return (acc + `
              <div class="message">
                <div class="name" data-color="${msg.user.color}">${msg.user.userName}:</div>
                <div class="text">${msg.text}</div>
              </div>`);
					}, "");
					document.querySelectorAll(".name").forEach((val) => {
						val.style.color = val.dataset.color;
					});
				})
				.catch((err) => {
					console.log("err", err);
				});
		}, 200);
	}
});
