const productsModel = require('../models/products');

const productsService = {
  productsAll: async () => {
    const products = await productsModel.productsAll();
    
    return products;
  },

  productsId: async (id) => {
    const [product] = await productsModel.productsId(id);

    if (!product) {
      return { message: 'Product not found' };
    }
    return product;
  },
};

module.exports = productsService;
