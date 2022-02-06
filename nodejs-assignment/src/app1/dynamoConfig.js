const dynamodb = require("dynamodb");

module.exports = dynamodb.AWS.config.update({
    region: "localhost",
    endpoint: "http://localhost:8000",
});
