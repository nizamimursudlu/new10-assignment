// const Loan = require("../schemaLoan");
// const dynamodb = require("../dynamoConfig");

// module.exports.updateLoan = async event => {
//     try {
//         dynamodb;
//         return await new Promise((resolve, reject) => {
//             Loan.update(
//                 { id: event.pathParameters.id, status: "disbursed" },
//                 function(err, loan) {
//                     if (!loan) {
//                         return resolve({
//                             status: 404,
//                             body: `Load with id: ${event.pathParameters.id} not found in the database`
//                         });
//                     }
//                     return err
//                         ? reject(err)
//                         : resolve({
//                               statusCode: 200,
//                               body: `Load with id: ${event.pathParameters.id} had been updated in the database`
//                           });
//                 }
//             );
//         });
//     } catch (e) {
//         return {
//             statusCode: 500,
//             body: e.stack
//         };
//     }
// };

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.updateLoan = async (event, body) => {
    try {
        const params = {
            TableName: "loans",
            Key: {
                id: event.pathParameters.id
            },
            UpdateExpression: "set loanStatus = :loanStatus",
            ExpressionAttributeValues: {
                ":loanStatus": "disbursed"
            }
        };
        console.log(params);
        const loan = await dynamoDB.update(params).promise();
        return loan
            ? {
                  statusCode: 200,
                  body: `Load with id: ${event.pathParameters.id} had been updated in the database`
              }
            : {
                  statusCode: 400,
                  body: `Bad request`
              };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack
        };
    }
};
