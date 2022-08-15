const productsService = require('../services/products');

const productsController = {
  productsAll: async (req, res) => {
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
};

module.exports = productsController;