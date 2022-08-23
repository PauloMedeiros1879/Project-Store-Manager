const productsService = require('../services/products');

const productsController = {
  productsAll: async (_req, res) => {
    const products = await productsService.productsAll();

    return res.status(200).json(products);
  },

  productsId: async (req, res, next) => {
    const { id } = req.params;
    const product = await productsService.productsId(id);

    if (product.message) {
      return next({ message: product.message, code: 404 });
    }

    return res.status(200).json(product);
  },
  
  productCreate: async (req, res, _next) => {
    const { name } = req.body;
    const product = await productsService.productCreate(name);

    return res.status(201).json(product);
  },

  productUpdate: async (req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;

    const productsUpdated = await productsService.productUpdate({ id, name });
    if (productsUpdated.message) {
      return next({ message: productsUpdated.message, code: 404 });
    }

    return res.status(200).json(productsUpdated);
  },
};

module.exports = productsController;