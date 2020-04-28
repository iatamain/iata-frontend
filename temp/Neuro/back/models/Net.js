const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	netParam: {type: String},
	trainParam: {type: String},
	trainData: {type: String}, //Нормализованные данные
   trainObj: [{type: String}], //То, что будет различать нейронка
   isTrain: {type: Boolean},
   name: {type: String},
   owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Net', schema);
