const dynamodb = require("dynamodb");
const Joi = require("joi");

module.exports = dynamodb.define("Company", {
    hashKey: "id",
    timestamps: true,
    schema: {
        id: dynamodb.types.uuid(),
        info: Joi.object(),
    },
});
