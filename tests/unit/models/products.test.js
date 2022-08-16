const sinon = require('sinon');
const connection = require('../../../models/connection');

describe('Testa o products da camada Models', () => {
  describe('Testa productsAll, quando são listados todos os produtos do banco de dados', () => {
    const products = [
      [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ],
    ];

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(products);
    });

    afterEach(async () => {
      connection.execute.restore();
    });
  });
});