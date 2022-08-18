const express = require('express');
const salesController = require('../controllers/sales');
const validate = require('../middlewares/validate');

const salesRoute = express.Router();

salesRoute.post('/', validate.salesValidations, salesController.salesCreate);

module.exports = salesRoute;