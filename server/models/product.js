var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name: String,
    description: String,
    price: Number,
    thumbnail: String
});

module.exports = mongoose.model('shop', Product, 'shop');