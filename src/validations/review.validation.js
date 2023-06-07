const Joi = require('joi');

const validateReview = (data) => {
    const Schema = Joi.object({
        username: Joi.string().alphanum().required(),
        rating: Joi.number().min(0).max(5).required(),
        message: Joi.string().max(200).required()
    })

    const { error } = Schema.validate(data);
    if(error){
        return error ? error.message : false;
    }
}

module.exports = validateReview;