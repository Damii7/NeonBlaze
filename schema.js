const Joi = require("joi");

const orderRequest = Joi.object({
    request : Joi.object({
        textInput : Joi.string().required(),
        fontStyle : Joi.string().required(),
        fontSize : Joi.string().required(),
        color : Joi.string().required(),
        name: Joi.string().required(),
        phone1: Joi.number().required(),
        phone2: Joi.number().required(),
        address: Joi.string().required(),
        images: Joi.string().required(),
        estimatedCost :Joi.number().min(0).required(),

    }).required(),
})
module.exports = {orderRequest};