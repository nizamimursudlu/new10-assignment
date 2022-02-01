// const dynamoDB = require("../dynamoConfig");

exports.getLoan = async (event, body) => {
    try {
        const loan = await axios.get();

        return !loan.Item
            ? {
                  status: 404,
                  body: `Loan with id: ${event.pathParameters.id} not found in the database`
              }
            : {
                  statusCode: 200,
                  body: JSON.stringify(loan.Item)
              };
    } catch (err) {
        return {
            statusCode: 500,
            body: err.stack
        };
    }
};
