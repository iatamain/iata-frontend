const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	login: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	role: {type: String, default: "user"},
	net: [{type: Types.ObjectId, ref: 'Net'}]
})

module.exports = model('User', schema);
