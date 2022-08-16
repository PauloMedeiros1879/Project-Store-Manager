const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/products');
const productsController = require('../../../controllers/products');

describe('Testa productsAll de products da camada Controllers', () => {
  describe('Testa productsAll de products da camada Controllers, quando são retornados todos os produtos', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      sinon.stub(productsService, 'productsAll').resolves(products);
    });

    after(async () => {
      productsService.productsAll.restore();
    });

    it('Testa se o status de retorno é 200', async () => {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.productsAll(req, res);
      expect(res.status.calledWith(200));
    });
  });
});