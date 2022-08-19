const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/sales');
const salesController = require('../../../controllers/sales');

describe('Testa salesCreate da camada controllers', () => {
  describe('Testa retorno quando o id fornecido não existe no banco de dados', () => {
    const errMessage = { message: 'Product not found', code: 404 };

    before(async () => {
      sinon.stub(salesService, 'salesCreate').resolves(errMessage);
    });

    after(async () => {
      salesService.salesCreate.restore();
    });

    it('Testa se o status de retorno é 404', async () => {
        const req = {};
        const res = {};
        const next = (err) => {
          if (err.message) {
            return res.status(err.code).json({ message: err.message });
          }
          return res.status(500).json({ message: 'Erro no servidor' });
        }

        req.params = { id: '50' }
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        await salesController.salesCreate(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });
  });
});