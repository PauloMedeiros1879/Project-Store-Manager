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
      const res = await productsModel.productsAll();

      expect(res).an('array');
    });

    it('Testa se os produtos retornados estão ordenados', async () => {
      const res = await productsModel.productsAll();

      res.forEach(({ id }, index) => expect(id).equal(index + 1));
    });
    
    it('Testa se todos os produtos são retornados', async () => {
      const res = await productsModel.productsAll();

      expect(res).eql([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ]);
    });

    describe('Testa productsId quando o id passado não existe', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(async () => {
        connection.execute.restore();
      });
      it('Testa se o retorno é um array', async () => {
        const response = await productsModel.productsId(50);

        expect(response).an('array');
      });
    });

    describe('Testa productCreate, que insere produto no banco de dados', async () => {
      const productCreated = [{ insertId: 4 }];

      before(async () => {
        sinon.stub(connection, 'execute').resolves(productCreated);
      });

      after(async () => {
        connection.execute.restore();
      });
    
      it('Testa se o array retornado não está vazio', async () => {
        const res = await productsModel.productCreate('Lævateinn');

        expect(res).not.empty;
      });
    });
  });
});