const Joi = require('joi');

const joiValidate = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required|400',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required|400',
    'number.min': '"quantity" must be greater than or equal to 1|422',
  }),
});

const validate = {

  name: (req, _res, next) => {
    const { name } = req.body;
    
    if (!name) {
      return next({ message: '"name" is required', code: 400 });
    }
    
    if (name.length < 5) {
      return next({ message: '"name" length must be at least 5 characters long', code: 422 });
    }

    return next();
  },

   salesValidations: (req, _res, next) => {
    const { body } = req;
    const result = body.map((sale) => joiValidate.validate(sale));
    let validSale = [...result];
    if (result.some((rs) => rs.error)) {
      result.forEach((r) => {
        if (r.error) {
          const [error, code] = r.error.details[0].message.split('|');
          validSale = { message: error, code: Number(code) };
        }
      });
    }
    return validSale.message ? next(validSale) : next();
  },
};

module.exports = validate;