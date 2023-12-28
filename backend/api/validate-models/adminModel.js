var joi = require("joi");

module.exports.signinuser = joi.object({
    email:joi.string().required(),
    password:joi.string().required()
})

module.exports.signupuser = joi.object({
    first_name:joi.string().required(),
    last_name:joi.string().required(),
    email: joi.string().email().required(),
    password:joi.string().required()
})

module.exports.deleteuser = joi.object({
    id:joi.number().integer().required()
})