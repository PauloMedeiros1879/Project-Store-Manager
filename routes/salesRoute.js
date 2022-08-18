const express = require('express');
const salesController = require('../controllers/sales');
const validate = require('../middlewares/validate');

const salesRoute = express.Router();

salesRoute.get('/:id', salesController.salesId);

salesRoute.get('/', salesController.salesAll);

salesRoute.post('/', validate.salesValidations, salesController.salesCreate);

module.exports = salesRoute;