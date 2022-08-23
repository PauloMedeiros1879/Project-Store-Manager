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

productCreate: async (name) => {
    const [{ insertId }] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?);',
      [name],
    );
    return { id: insertId, name };
  },

productUpdate: (id, name) => connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
      [name, id],
  ).then(() => ({ id, name })),

productDelete: (id) => connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
      [id],
  ).then(() => true),

};

module.exports = productsModel;