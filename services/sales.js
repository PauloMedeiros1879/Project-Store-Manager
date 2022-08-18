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
};

module.exports = salesService;