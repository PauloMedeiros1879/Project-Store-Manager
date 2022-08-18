const connection = require('./connection');

const salesModel = {
  salesCreate: async () => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.sales () VALUES ();',
    );
    return insertId;
  },

  salesProductsCreated: (saleId, productId, quantity) => connection.execute(
      'INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) VALUES (?, ?, ?);',
      [productId, saleId, quantity],
  ).then(() => ({ productId, quantity })),
};

module.exports = salesModel;