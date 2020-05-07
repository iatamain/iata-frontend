const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
	net: {type: String},
	ownerNet: {type: Types.ObjectId, ref: 'Net'},
	ownerUser: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('JsonNet', schema);
