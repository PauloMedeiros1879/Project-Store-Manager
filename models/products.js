const connection = require('./connection');

const productsModel = {
  productsAll: async () => {
    const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products;',
    );
    return products;
  },

  productsId: async (id) => {
    const [product] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?;',
      [id],
    );
    return product;
  },

};

module.exports = productsModel;