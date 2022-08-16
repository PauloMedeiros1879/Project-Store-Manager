const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/products');

describe('Testa o products da camada Models', () => {
  describe('Testa productsAll, quando são listados todos os produtos do banco de dados', () => {
    const products = [
      [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
    ];

    before(async () => {
      sinon.stub(connection, 'execute').resolves(products);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Testa se o retorno é um array com objetos', async () => {
      const response = await productsModel.productsAll();

      expect(response).an('array');
    });
  });
});