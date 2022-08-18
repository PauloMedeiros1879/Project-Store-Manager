const validatedSale = (arrayProducts) => {
  let products = true;
  arrayProducts.forEach((e) => {
    if (e.length === 0) {
      products = { message: 'Product not found', code: 404 };
    }
  });
  
  return products;
};

module.exports = validatedSale;