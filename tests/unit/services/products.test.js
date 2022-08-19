const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/products');
const productsService = require('../../../services/products');

describe('Testa productsAll de products da camada Services', () => {
  describe('Testa productsAll, quando são listados todos os produtos do banco de dados', () => {
    const products = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];

    before(async () => {
      sinon.stub(productsModel, 'productsAll').resolves(products);
    });

    after(async () => {
      productsModel.productsAll.restore();
    });

    it('Testa se o retorno é um array com objetos', async () => {
        const res = await productsService.productsAll();

        expect(res).an('array');
    });
    
    it('Testa se os produtos retornados estão ordenados', async () => {
        const res = await productsService.productsAll();

        res.forEach(({ id }, index) => expect(id).equal(index + 1));
      });

      it('Testa se todos os produtos são retornados', async () => {
        const res = await productsService.productsAll();

        expect(res).eql([
          { id: 1, name: 'Martelo de Thor' },
          { id: 2, name: 'Traje de encolhimento' },
          { id: 3, name: 'Escudo do Capitão América' },
        ]);
      });
    
    describe('Testa productsId da camada Services', () => {
      describe('Testa productsId se o id passado é de um produto que existe', async () => {
        const product = [{ id: 1, name: 'Martelo de Thor' }];

        before(async () => {
          sinon.stub(productsModel, 'productsId').resolves(product);
        });

        after(async () => {
          productsModel.productsId.restore();
        });

        it('Testa se o retorno é um objeto', async () => {
          const res = await productsService.productsId(1);
          expect(res).an('object');
        });
      });
    });

    describe('Testa função productCreate da camada Services', () => {
      describe('Testa que quando um nome é passado, retorna o produto inserido', () => {
        const productCreated = { id: 4, name: 'Lævateinn' };

        before(async () => {
          sinon.stub(productsModel, 'productCreate').resolves(productCreated);
        });

        after(async () => {
          productsModel.productCreate.restore();
        });

        it('Testa se um objeto é retornado', async () => {
          const res = await productsService.productCreate({ name: 'Lævateinn' });
          expect(res).an('object');
        });
      });
    });
  });
});