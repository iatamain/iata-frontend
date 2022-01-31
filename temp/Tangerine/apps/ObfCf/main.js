function randNum(min = 0, max = 9) {
	return Math.floor(min + Math.random() * (max - min + 1));
}
function randLetter() {
	const r = Math.random();
	let c = String.fromCharCode(randNum(97, 122));
	if (r < 0.5) {
		c = c.toUpperCase();
	}
	return c;
}
function randChar() {
	const r = Math.random();
	if (r < 0.3) return randNum();
	else return randLetter();
}
function repeat(n, func) {
	let result = "";
	for (let i = 0; i < n; i++) result += func();
	return result;
}
function randName() {
	let result = randLetter();
	for (let i = 0; i < 12; i++) {
		result += randChar();
	}
	return result;
}
function randDefine() {
	return `#define ${randName()} ${randName()}`;
}
function randVariable() {
	const r = Math.random();
	const types = ["int", "long long", "double"];
	if (r < 0.25) {
		return `string ${randName()} = "${randName()}";`;
	} else {
		return `${types[randNum(0, types.length - 1)]} ${randName()} = ${randNum(
			-1e9,
			1e9
		)};`;
	}
}
function randExpression() {
	const a = randNum(0, 2000);
	const b = randNum(2001, 4000);
	const expressions = [
		`${a} > ${b}`,
		`${a} >= ${b}`,
		`${b} < ${a}`,
		`${b} <= ${a}`,
		`${a} == ${b}`,
		"false",
		"!true",
	];
	return expressions[randNum(0, expressions.length - 1)];
}
function randIf(inner = "") {
	return `if (${randExpression()}){\n${inner}\n}`;
}
function randWhile(inner = "") {
	return `while (${randExpression()}){\n${inner}\n}`;
}
function randFor(inner = "") {
	const types = ["int", "long long", "double"];
	const varType = types[randNum(0, types.length - 1)];
	const varName = randName();
	return `for (${varType} ${varName} = ${randNum(
		0,
		1e8
	)}; ${randExpression()}; ${varName}++){\n${inner}\n}`;
}

function randBlock(n = 5) {
	let inner = randVariable();
	if (n > 1) inner = randBlock(n - 1);
	const funs = [randIf, randWhile, randFor];
	return funs[randNum(0, funs.length - 1)](inner);
}
function obfText() {
	return (
		randBlock(randNum(2, 5)) +
		"\n" +
		repeat(randNum(3, 5), () => randVariable() + "\n") +
		randBlock(randNum(2, 5)) +
		"\n"
	);
}

const blockInput = document.querySelector("#cicles textarea");
const defineInput = document.querySelector("#define textarea");
const variablesInput = document.querySelector("#variables textarea");
blockInput.innerHTML = repeat(2, () => randBlock(randNum(2, 5) + "\n"));
defineInput.innerHTML = repeat(20, () => randDefine() + "\n");
variablesInput.innerHTML = repeat(20, () => randVariable() + "\n");

const obfButton = document.querySelector("#input input");
obfButton.addEventListener("click", () => {
	let p = document.querySelector("#input textarea").value;
	// p = repeat(randNum(3, 5), () => randDefine() + "\n") + p;
	for (let i = 0; i < 100; i++) {
		p = p.replace("//OBF", obfText());
		p = p.replace(
			"//DEF",
			repeat(randNum(4, 7), () => randDefine() + "\n")
		);
		p = p.replace(
			"//VAR",
			repeat(randNum(5, 10), () => randVariable() + "\n")
		);
	}
	document.querySelector("#output textarea").innerHTML = p;
});

const copyButton = document.querySelector("#output input");
copyButton.addEventListener("click", () => {
	const text = document.querySelector("#output textarea");
	text.select();
	document.execCommand("copy");
});

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", () => {
	const generic = document.querySelector("#generic");
	generic.style.display = "none";
});
