const salesService = require('../services/sales');

const salesController = {
  salesCreate: async (req, res, next) => {
    const { body } = req;
    const salesProductsCreate = await salesService.salesCreate(body);

    if (salesProductsCreate.message) {
      return next(salesProductsCreate);
    }
    return res.status(201).json(salesProductsCreate);
  },
};

module.exports = salesController;