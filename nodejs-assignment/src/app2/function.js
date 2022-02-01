module.exports.function5 = async () => {
    // I will update the loan status
};

// const AWS = require("aws-sdk");
// AWS.config.update({ region: "us-east-1" });
// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// module.exports.updateLoan = async (event, body) => {
//     const params = {
//         TableName: "loans",
//         Key: {
//             id: event.pathParameters.id
//         },
//         UpdateExpression: "set amount = :amount, status = :s",
//         ExpressionAttributeValues: {
//             ":amount": 89,
//             ":s": "dis"
//         },
//         ReturnValues: "UPDATED_NEW"
//     };
//     dynamoDB.update(params).promise();
//     return {
//         status: 200,
//         body: `Load with id: ${event.pathParameters.id} had been updated in the database`
//     };
// };
