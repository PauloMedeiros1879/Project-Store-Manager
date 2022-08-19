const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/sales');
const productsModel = require('../../../models/products');
const salesService = require('../../../services/sales');

describe('Testa salesCreate da camada Service', () => {
  describe('Testa retorno caso algum id passado não existe', () => {
    const saleInsert = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 50,
        "quantity": 5
      },
      {
        "productId": 4,
        "quantity": 5
      }
    ];

    const errMessage = { message: 'Product not found', code: 404 };
    const product = [[{ id: 1, name: 'Martelo de Thor' }], [], [{ id: 4, name: 'Lævateinn' }]];
      
    before(async () => {
      sinon.stub(salesModel, 'salesCreate').resolves(errMessage);
      sinon.stub(productsModel, 'productsId')
        .onFirstCall().resolves(product[0])
        .onSecondCall().resolves(product[1])
        .onThirdCall().resolves(product[2]);
    });

    after(async () => {
      salesModel.salesCreate.restore();
      productsModel.productsId.restore();
    });

    it('Testa se o retorno é um objeto', async () => {
      const res = await salesService.salesCreate(saleInsert);

      expect(res).an('object');
      expect(res).eql({ message: 'Product not found', code: 404 });
    });
  });
});