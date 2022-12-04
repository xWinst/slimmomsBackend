const Joi = require("joi");
const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
        .min(3)
        .required(),
    password: Joi.string().min(3).required(),

    token: Joi.string(),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
        .min(3)
        .required(),
    password: Joi.string().min(3).required(),

    token: Joi.string(),
});

const refreshSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

const update = Joi.object({
    dailyRate: Joi.number().required(),
    bloodGroup: Joi.number().required(),
    date: Joi.string().required(),
    weight: Joi.number(),
});

module.exports = { registerSchema, loginSchema, refreshSchema, update };
