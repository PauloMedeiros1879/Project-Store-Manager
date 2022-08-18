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

  salesAll: async () => {
    const [sales] = await connection.execute(`
      SELECT 
        sproduct.sale_id AS saleId,
        sales.date AS date,
        sproduct.product_id AS productId,
        sproduct.quantity AS quantity
        FROM StoreManager.sales_products AS sproduct
        JOIN StoreManager.sales AS sales
        ON sproduct.sale_id = sales.id
        ORDER BY saleID, productId;
    `);

    return sales;
  },

  salesId: async (id) => {
    const [sales] = await connection.execute(`
      SELECT 
        sproduct.sale_id AS saleID,
        sales.date AS date,
        sproduct.product_id AS productId,
        sproduct.quantity AS quantity
        FROM StoreManager.sales_products AS sproduct
        JOIN StoreManager.sales AS sales
        ON sproduct.sale_id = sales.id
        WHERE sproduct.sale_id = ?
        ORDER BY saleID, productId;
    `,
      [id]);
    
    return sales;
  },
};

module.exports = salesModel;