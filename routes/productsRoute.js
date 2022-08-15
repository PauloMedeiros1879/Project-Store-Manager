const express = require('express');
const productsController = require('../controllers/products');

const productsRoutes = express.Router();

productsRoutes.get('/:id', productsController.productsId);

productsRoutes.get('/', productsController.productsAll);

module.exports = productsRoutes;