'use strict';
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputString = [];
let currentLine = 0;

rl.on('line', inputLine => {
	inputString.push(inputLine);
	//console.log(inputLine);
});
rl.on('SIGINT', () => {
	//rl.pause();
	//print("Вывод:");
	main();	
});

function readline() {
    return inputString[currentLine++];
}
function print() { 
	console.log(...arguments);
}

function main() {
	var obj = {
		a: 1,
		b: 2,
		c: 3
	}
	var {a} = obj;
	console.log(a);
	let t = readline();
	while(t--){
		print(readline());
	}
}

