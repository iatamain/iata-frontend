function shuffle(array) {
	const shuffledArray = array;
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

class SmartTimer {
	constructor() {
		this.timerId = null;
		this.startTime = null;
		this.delay = null;
		this.callback = null;
	}

	setTimer(callback, delay) {
		this.reset();
		this.startTime = Date.now();
		this.delay = delay;
		this.callback = callback;

		this.timerId = setTimeout(() => {
			callback();
			this.reset();
		}, delay);
	}

	reset() {
		if (this.timerId) {
			clearTimeout(this.timerId);
			this.timerId = null;
			this.startTime = null;
			this.delay = null;
			this.callback = null;
		}
	}

	setDelay(delay) {
		if (!this.timerId) {
			throw new Error("Таймер не был запущен");
		}
		this.setTimer(this.callback, delay);
	}

	reduceDelay(timeToReduce) {
		const elapsedTime = Date.now() - this.startTime;
		const timeRemaining = this.delay - elapsedTime;
		const newTimeRemaining = Math.max(timeRemaining - timeToReduce, 0);
		this.setDelay(newTimeRemaining);
	}

	setMinDelay(minTime) {
		const elapsedTime = Date.now() - this.startTime;
		const timeRemaining = this.delay - elapsedTime;
		const newTimeRemaining = Math.min(timeRemaining, minTime);
		this.setDelay(newTimeRemaining);
	}
}

function createElement(tag, props = {}, ...children) {
	const element = document.createElement(tag);
	for (const [key, value] of Object.entries(props)) {
		if (key.startsWith("on")) {
			element[key.toLowerCase()] = value;
		} else if (key === "className") {
			element.classList.add(...value.split(" ").filter((el) => !!el));
		} else if (key === "classList") {
			element.classList.add(...value);
		} else {
			element.setAttribute(key, value);
		}
	}
	children.forEach((child) => {
		if (typeof child === "string") {
			element.textContent = child;
		} else {
			element.appendChild(child);
		}
	});
	return element;
}

function toggleClass(el, value, className) {
	if (el && className) {
		if (value) {
			el.classList.add(className);
		} else {
			el.classList.remove(className);
		}
	} else {
    if(!el){
      console.warn("В toggleClass не передан el");
    }
    if(!className){
      console.warn("В toggleClass не передан className");
    }
  }
}

function setStateClass(el, value) {
  const states = ["error", "correct", "default", "active"];
  el.classList.remove(...states);
  el.classList.add(value);
}
