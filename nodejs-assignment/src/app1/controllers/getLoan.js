// const Loan = require("../schemaLoan");
// const dynamodb = require("./dynamoConfig");

// module.exports.getLoan = async event => {
//     try {
//         dynamodb;
//         const loan = await new Promise((resolve, reject) => {
//             Loan.scan().exec((err, loan) => {
//                 return err
//                     ? reject(err)
//                     : resolve(
//                           loan.Items.filter(
//                               item => item.attrs.id === event.pathParameters.id
//                           )
//                       );
//             });
//         });
//         if (loan.length === 0) {
//             return {
//                 status: 404,
//                 body: `Load with id: ${event.pathParameters.id} not found in the database`
//             };
//         }
//         return {
//             statusCode: 200,
//             body: JSON.stringify(loan)
//         };
//     } catch (e) {
//         return {
//             statusCode: 500,
//             body: e.stack
//         };
//     }
// };

const dynamoDB = require("../dynamoConfig");

exports.getLoan = async (event, body) => {
    try {
        const loan = await dynamoDB
            .get({
                TableName: "loans",
                Key: {
                    id: event.pathParameters.id
                }
            })
            .promise();

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
