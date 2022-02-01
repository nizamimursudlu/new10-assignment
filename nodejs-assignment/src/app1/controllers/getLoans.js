// const Loan = require("../schemaLoan");
// const dynamodb = require("../dynamoConfig");

// module.exports.getLoans = async event => {
//     try {
//         dynamodb;

//         const loans = await new Promise((resolve, reject) => {
//             Loan.scan()
//                 .loadAll()
//                 .exec((err, loans) => {
//                     return err ? reject(err) : resolve(loans.Items);
//                 });
//         });

//         return {
//             statusCode: 200,
//             body: JSON.stringify(loans)
//         };
//     } catch (e) {
// return {
//     statusCode: 500,
//     body: e.stack
// };
//     }
// };

// module.exports.getLoans = async () => {
//     try {
//         dynamodb;
//         const res = await Loan.scan()
// .loadAll()
//             .exec();
//         const data = await res;
//         return data;
//     } catch (e) {
//         return {
//             statusCode: 500,
//             body: e.stack
//         };
//     }
// };

// const aws = require("aws-sdk");
// const dynamoDB = new aws.DynamoDB.DocumentClient();

const dynamoDB = require("../dynamoConfig");

exports.getLoans = async (event, body) => {
    try {
        const loans = await dynamoDB
            .scan({
                TableName: "loans"
            })
            .promise();
        return {
            statusCode: 200,
            body: JSON.stringify(loans.Items)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: err.stack
        };
    }
};
