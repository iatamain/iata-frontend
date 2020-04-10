
/*
let system = getSystemForN([3, 5, 2], [4, 2, 1], 2);
var matrix = system.matrix;
var res = system.res;
console.log(resolveSystem(matrix, res));
*/
function getSystemForN(vectorX, vectorY, n){ //a + ax+bx^2...
	var N = Math.min(vectorX.length, vectorY.length);
	let resultMatrix = new Array(n).fill(1).map(val => new Array(n).fill(1));
	for(let i = 0; i < n; i++){
		for(let j = 0; j < n; j++){
			let sum = 0;
			for(let k = 0; k < N; k++){
				sum += vectorX[k]**(j + i);
			}
			resultMatrix[i][j] = sum;
		}
	}
	let resultRes = [];
	for(let i = 0; i < n; i++){
		let sum = 0;
		for(let j = 0; j < N; j++){
			sum += vectorY[j]*vectorX[j]**i;
		}
		resultRes[i] = sum;
	}
	return {
		matrix: resultMatrix,
		res: resultRes
	}
}
function getSystemForLog(vectorX, vectorY){ //a + ax+bx^2...
	var N = Math.min(vectorX.length, vectorY.length);
	let resultMatrix = new Array(2).fill(1).map(val => new Array(2).fill(1));
	for(let i = 0; i < 2; i++){
		for(let j = 0; j < 2; j++){
			let sum = 0;
			for(let k = 0; k < N; k++){
				sum += Math.log(vectorX[k])**(j + i);
			}
			resultMatrix[i][j] = sum;
		}
	}
	let resultRes = [];
	for(let i = 0; i < 2; i++){
		let sum = 0;
		for(let j = 0; j < N; j++){
			sum += vectorY[j]*Math.log(vectorX[j])**i;
		}
		resultRes[i] = sum;
	}
	return {
		matrix: resultMatrix,
		res: resultRes
	}
}
function resolveSystem(matrix, res){
	let x = [];
	let d = getDet(matrix);
	for(let i = 0; i < matrix.length; i++){
		let tempMatrix = deepCopy(matrix);
		for(let j = 0; j < matrix.length; j++){
			tempMatrix[j][i] = res[j];
		}
		let dx = getDet(tempMatrix);
		x.push(dx/d);
	}
	return x;
}
function getDet(matrix){
	if(matrix.length == 1){
		return matrix[0][0];
	}else{
		let tempDet = 0;
		let sig = 1;
		for(let i = 0; i < matrix.length; i++){
			let minor = new Array(matrix.length - 1).fill(0);
			minor = minor.map(elem => new Array(matrix.length - 1));
			for(let j = 0; j < matrix.length; j++){
				for(let k = 1; k < matrix.length; k++){
					if(j < i){
						minor[k - 1][j] = matrix[k][j];
					}
					if(j > i){
						minor[k - 1][j - 1] = matrix[k][j];
					}
				}
			}
			tempDet += sig * matrix[0][i] * getDet(minor);
			sig *= -1;
		}
		return tempDet;
	}
}
function deepCopy(elem){
	if(Array.isArray(elem)){
		let tempArr = [];
		elem.forEach((val)=>{
			tempArr.push(deepCopy(val));
		})
		return tempArr
	}else if(typeof elem == "object" && elem != null){
		let tempObj = {};
		for(i in elem){
			tempObj[i] = deepCopy(elem[i]);
		}
		return tempObj;
	}else{
		return elem;
	}
}