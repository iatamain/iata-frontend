const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	netParam: {
		type: String
		/*
		default: {
			binaryThresh: 0.5,
			hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
			activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
			leakyReluAlpha: 0.01,

		}
		*/
	}, //
	trainParam: {
		type: String
		/*
		default: {
			iterations: 20000,    // the maximum times to iterate the training data
	      errorThresh: 0.005,   // the acceptable error percentage from training data
	      log: false,           // true to use console.log, when a function is supplied it is used
	      logPeriod: 10,        // iterations between logging out
	      learningRate: 0.3,    // multiply's against the input and the delta then adds to momentum
	      momentum: 0.1,        // multiply's against the specified "change" then adds to learning rate for change
	      callback: null,       // a periodic call back that can be triggered while training
	      callbackPeriod: 10,   // the number of iterations through the training data between callback calls
	      timeout: Infinity,    // the max number of milliseconds to train for
		}
		*/
	}, //
	trainData: {type: Array, default: []}, //Нормализованные данные
   trainObj: {type: Array}, //То, что будет различать нейронка
   isTrain: {type: Boolean, default: false},
	jsonNet: {type: Types.ObjectId, ref: 'jsonNet'}, //Обученная сеть
   name: {type: String},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Net', schema);
