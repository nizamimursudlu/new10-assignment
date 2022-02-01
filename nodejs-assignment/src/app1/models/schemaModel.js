const dynamodb = require("dynamodb");
const Joi = require("joi");

module.exports = dynamodb.define("Loan", {
    hashKey: "id",
    timestamps: true,
    schema: {
        id: dynamodb.types.uuid(),
        amount: Joi.number().required(),
        loanStatus: Joi.string().valid("offered", "disbursed")
    }
});
