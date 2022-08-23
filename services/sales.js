const salesModel = require('../models/sales');
const productsModel = require('../models/products');
const validatedSale = require('../middlewares/validateSales');

const salesService = {
  salesCreate: async (sales) => {
    const ids = sales.map(({ productId }) => productId);
    const productsIds = await Promise.all(ids.map((id) => productsModel.productsId(id)));
    const productsEvery = validatedSale(productsIds);

    if (productsEvery.message) {
      return productsEvery;
    }

    const createId = await salesModel.salesCreate();
    const createSales = await Promise
      .all(sales
        .map((sale) => salesModel.salesProductsCreated(createId, sale.productId, sale.quantity)));
    
    return { id: createId, itemsSold: createSales };
  },

  salesAll: async () => {
    const sale = await salesModel.salesAll();

    return sale;
  },

  salesId: async (id) => {
    const sale = await salesModel.salesId(id);

    if (sale.length === 0) {
      return { message: 'Sale not found' };
    }

    return sale;
  },

  salesDelete: async (id) => {
    const sales = await salesModel.salesId(id);

    if (sales.length === 0) {
      return { message: 'Sale not found' };
    }
    const salesDeleted = await salesModel.salesDelete(id);

    return salesDeleted;
  },

  salesUpdate: async (sales, saleId) => {
    const ids = sales.map(({ productId }) => productId);
    const productsIds = await Promise.all(ids.map((id) => productsModel.productsId(id)));
    const productsEvery = validatedSale(productsIds);

    if (productsEvery.message) {
      return productsEvery;
    }
    const Onsale = await salesModel.salesId(saleId);
    if (Onsale.length === 0) {
      return { message: 'Sale not found', code: 404 };
    }
    const salesUpdated = await Promise
      .all(sales
        .map((sale) => salesModel.salesUpdate(sale.productId, sale.quantity, saleId)));
    
    return { saleId, itemsUpdated: salesUpdated };
  },
};

module.exports = salesService;