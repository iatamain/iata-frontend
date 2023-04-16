const WordState = Object.freeze({
	DEFAULT: "default",
	ACTIVE: "active",
	ERROR: "error",
	CORRECT: "correct",
});

(async function App() {
	const words = await getWords();
	const scene = new Scene(words);
	const divContainer = document.querySelector(".container");

	divContainer.addEventListener("click", handleContainerClick);
	function handleContainerClick(e) {
		const targetWordDiv = e.target.closest(".word");
		if (!targetWordDiv) return;
		const lang = targetWordDiv.dataset.lang;
		const key = targetWordDiv.dataset.key;
		const targetWord = scene[lang].find((el) => el.key == key);
		if (targetWord.getState() === WordState.CORRECT) return;
		const prevActiveWord = scene[lang].find(
			(el) => el.getState() === WordState.ACTIVE
		);
		targetWord.setState(WordState.ACTIVE);
		if (prevActiveWord) {
			prevActiveWord.setState(WordState.DEFAULT);
		}
		scene.update();
	}
	scene.render();
})();

class Scene {
	constructor(words) {
		this.allWords = words;
		this.freeCells = {
			en: [],
			ru: [],
		};
		this.en = [];
		this.ru = [];
		const tempWords = this.allWords.splice(0, 5);
		tempWords.forEach((word) => {
			this.en.push(new Word(word.en, word.key, "en"));
			this.ru.push(new Word(word.ru, word.key, "ru"));
		});
		this.en = shuffle(this.en);
		this.ru = shuffle(this.ru);
		this.timer = new SmartTimer();
	}

	update() {
		let activeEnWord = this.en.find((el) => el.getState() === WordState.ACTIVE);
		let activeRuWord = this.ru.find((el) => el.getState() === WordState.ACTIVE);
		if (activeRuWord && activeEnWord) {
			const isCorrect = activeEnWord.key === activeRuWord.key;
			const state = isCorrect ? WordState.CORRECT : WordState.ERROR;
			activeEnWord.setState(state);
			activeRuWord.setState(state);
			if (isCorrect) {
				const newFreeCellEn = this.en.indexOf(activeEnWord);
				const newFreeCellRu = this.ru.indexOf(activeRuWord);
				this.freeCells.en.push(newFreeCellEn);
				this.freeCells.ru.push(newFreeCellRu);
				if (this.timer.timerId) {
					this.timer.reduceDelay(1000);
				} else {
					this.timer.setTimer(this.updateWords.bind(this), 5000);
				}
			}
		}
		activeEnWord = this.en.find((el) => el.getState() === WordState.ACTIVE);
		activeRuWord = this.ru.find((el) => el.getState() === WordState.ACTIVE);
		if (activeEnWord || activeRuWord) {
			this.en.forEach(
				(el) =>
					el.getState() === WordState.ERROR && el.setState(WordState.DEFAULT)
			);
			this.ru.forEach(
				(el) =>
					el.getState() === WordState.ERROR && el.setState(WordState.DEFAULT)
			);
		}
	}

	updateWords() {
		while (this.allWords.length > 0 && this.freeCells.en.length > 0) {
			let enInd, ruInd;
			const word = this.allWords.splice(0, 1)[0];

			if (this.freeCells.en.length >= 1) {
				const randomEnIndex = Math.floor(
					Math.random() * this.freeCells.en.length
				);
				enInd = this.freeCells.en[randomEnIndex];
				this.freeCells.en.splice(randomEnIndex, 1);
			}

			if (this.freeCells.ru.length >= 1) {
				const randomRuIndex = Math.floor(
					Math.random() * this.freeCells.ru.length
				);
				ruInd = this.freeCells.ru[randomRuIndex];
				this.freeCells.ru.splice(randomRuIndex, 1);
			}

			this.en[enInd].updateFrom(new Word(word.en, word.key, "en"));
			this.ru[ruInd].updateFrom(new Word(word.ru, word.key, "ru"));
		}
	}

	render() {
		const partRuDiv = document.querySelector(".ru");
		const partEnDiv = document.querySelector(".en");
		partRuDiv.innerHTML = "";
		partEnDiv.innerHTML = "";
		this.en.forEach((el) => {
			partEnDiv.appendChild(el.render());
		});
		this.ru.forEach((el) => {
			partRuDiv.appendChild(el.render());
		});
	}
}

class Word {
	#state = WordState.DEFAULT;

	constructor(word, key, lang) {
		this.word = word;
		this.key = key;
		this.lang = lang;
		this.element = null;
	}

	updateFrom(word) {
		this.word = word.word;
		this.setState(word.getState());
		this.key = word.key;
		this.lang = word.lang;
		this.element.setAttribute("data-key", word.key);
		this.element.setAttribute("data-lang", word.lang);
		this.element.innerHTML = word.word;
	}

	getState() {
		return this.#state;
	}

	setState(state) {
		if (Object.values(WordState).includes(state)) {
			this.#state = state;
		} else {
			throw new Error(`Invalid state: ${state}`);
		}
		setStateClass(this.element, state);
	}

	render() {
		this.element = createElement(
			"div",
			{
				"data-lang": this.lang,
				"data-key": this.key,
				classList: ["word", this.getState()],
			},
			this.word
		);
		return this.element;
	}
}
