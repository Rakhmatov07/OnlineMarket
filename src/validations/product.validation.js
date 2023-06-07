const Joi = require('joi');

const validateProduct = (data) => {
    const Schema = Joi.object({
        name: Joi.string().min(3).required(), 
        price: Joi.string().regex(/^\$[0-9]+(\.[0-9]{2})?$/).required(), 
        info: Joi.string().max(200).required()
    })

    const { error } = Schema.validate(data);
    if(error){
        return error ? error.message : false;
    }
}

module.exports = validateProduct;