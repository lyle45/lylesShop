var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/getProducts', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) res.status(500).json({err: err});
        res.send(products)
    })
});
module.exports = router;