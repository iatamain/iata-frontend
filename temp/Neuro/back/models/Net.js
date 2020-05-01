const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	netParam: {type: String},
	trainParam: {type: String},
	trainData: {type: Array}, //Нормализованные данные
   trainObj: {type: Array}, //То, что будет различать нейронка
   isTrain: {type: Boolean, default: false},
   name: {type: String},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Net', schema);
