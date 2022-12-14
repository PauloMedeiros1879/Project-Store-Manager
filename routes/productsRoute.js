const express = require('express');
const productsController = require('../controllers/products');
const validate = require('../middlewares/validate');

const productsRoutes = express.Router();

productsRoutes.get('/:id', productsController.productsId);

productsRoutes.get('/', productsController.productsAll);

productsRoutes.post('/', validate.name, productsController.productCreate);

productsRoutes.put('/:id', validate.name, productsController.productUpdate);

productsRoutes.delete('/:id', productsController.productDelete);

module.exports = productsRoutes;