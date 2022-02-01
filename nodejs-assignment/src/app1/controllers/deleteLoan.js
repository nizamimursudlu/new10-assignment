// const Loan = require("../schemaLoan");
// const dynamodb = require("./dynamoConfig");

// module.exports.deleteLoan = async event => {
//     try {
//         dynamodb;
//         return await new Promise((resolve, reject) => {
//             Loan.destroy(
//                 { id: event.pathParameters.id },
//                 { ReturnValues: "ALL_OLD" },
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
//                               body: `Load with id: ${event.pathParameters.id} had been deleted from the database`
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
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

exports.deleteLoan = async (event, body) => {
    try {
        await dynamoDB
            .delete({
                TableName: "loans",
                Key: {
                    id: event.pathParameters.id
                }
            })
            .promise();
        return {
            statusCode: 200,
            body: `Load with id: ${event.pathParameters.id} had been deleted from the database`
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: err.stack
        };
    }
};
