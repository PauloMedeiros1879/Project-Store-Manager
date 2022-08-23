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

  salesAll: async (_req, res) => {
    const sale = await salesService.salesAll();

     return res.status(200).json(sale);
  },

  salesId: async (req, res, next) => {
    const { id } = req.params;
    const sale = await salesService.salesId(id);

    if (sale.message) {
      return next({ message: sale.message, code: 404 });
    }

    return res.status(200).json(sale);
  },

  salesDelete: async (req, res, next) => {
    const { id } = req.params;

    const salesDeleted = await salesService.salesDelete(id);
    if (salesDeleted.message) {
      return next({ message: salesDeleted.message, code: 404 });
    }
    return res.status(204).end();
  },
   
  salesUpdate: async (req, res, next) => {
      const { body } = req;
      const { id } = req.params;
      const salesUpdated = await salesService.salesUpdate(body, id);

    if (salesUpdated.message) {
      return next(salesUpdated);
    }
    return res.status(200).json(salesUpdated);
  },
};

module.exports = salesController;