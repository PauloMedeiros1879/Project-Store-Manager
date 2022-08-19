const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models//sales');

describe('Testa o salesCreate na camada model', () => {
  const salesCreate = [{insertId: 4}];

      before(async () => {
        sinon.stub(connection, 'execute').resolves(salesCreate);
    });

      after(async () => {
        connection.execute.restore();
      });
    
    it('Testa se o um id é retornado', async () => {
      const response = await salesModel.salesCreate();

        expect(response).a('number');
    });
    
    it('Testa se o id correto é retornado', async () => {
      const response = await salesModel.salesCreate();

        expect(response).equal(4);
    });
});