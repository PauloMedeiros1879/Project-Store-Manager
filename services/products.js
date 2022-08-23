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

  productCreate: async (name) => {
  const product = await productsModel.productCreate(name);

    return product;
  },
  
  productUpdate: async ({ id, name }) => {
    const product = await productsModel.productsId(id);
    if (product.length === 0) {
      return { message: 'Product not found' };
    }
    const productsUpdated = await productsModel.productUpdate(id, name);
    
    return productsUpdated;
  },
};

module.exports = productsService;
