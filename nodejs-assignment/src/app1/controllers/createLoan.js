// const dynamodb = require("../oldDynamo");
// const dynamo = require("dynamodb");
// const Loan = require("../models/schemaModel");
// // const Company = require("../models/companiesModel");

// // const axios = require("axios");

// module.exports.createLoan = async event => {
//     try {
//         dynamodb;
//         await new Promise((resolve, reject) => {
//             dynamo.createTables(err => (err ? reject(err) : resolve()));
//         });
//         return await new Promise((resolve, reject) => {
//             Loan.create(
//                 { amount: event.pathParameters.amount, loanStatus: "offered" },
//                 function(err, loan) {
//                     err && reject(err);
//                     resolve({
//                         statusCode: 201,
//                         body: `Loan has been created: ${JSON.stringify(loan)}`
//                     });
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

// const dynamoDB = require("../dynamoConfig");

// const AWS = require("aws-sdk");
// const dynamoDB = new AWS.DynamoDB({ region: "us-east-1" });

// module.exports.createTableLoans = async (event, body) => {
//     const res = await dynamoDB
//         .createTable({
//             AttributeDefinitions: [
//                 {
//                     AttributeName: "id",
//                     AttributeType: "S"
//                 }
//             ],
//             KeySchema: [
//                 {
//                     AttributeName: "id",
//                     KeyType: "HASH"
//                 }
//             ],
//             BillingMode: "PAY_PER_REQUEST",
//             TableName: "loans"
//         })
//         .promise();

//     return {
//         status: 201,
//         body: `Loan has been created: ${JSON.stringify(res)}`
//     };
// };

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: "localhost",
    endpoint: "http://localhost:8000"
});

const { v4: uuidv4 } = require("uuid");

module.exports.createLoan = async (event, body) => {
    try {
        const param = {
            Item: {
                createdAt: new Date().toISOString(),
                id: "iqwepiqupqeu",
                amount: 10,
                loanStatus: "offered"
            },
            TableName: "loans"
        };

        const loan = await dynamoDB.put(param).promise();
        console.log(loan);

        // const res = await axios.get(`https://api.overheid.io/openkvk/`, {
        //     headers: {
        //         "ovio-api-key":
        //             "0cdd7eca3a809d1097a68d819c6264a1ada2ba6ab25d897e80fb8d7007d7b363"
        //     }
        // });

        // res.data._embedded.bedrijf.filter(async item => {
        //     const res1 = await axios.get(
        //         `https://api.overheid.io${item._links.self.href}`,
        //         {
        //             headers: {
        //                 "ovio-api-key":
        //                     "0cdd7eca3a809d1097a68d819c6264a1ada2ba6ab25d897e80fb8d7007d7b363"
        //             }
        //         }
        //     );
        // });

        return Promise.resolve({
            statusCode: 201,
            body: `Loan has been created: ${JSON.stringify(param)}`
        });
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack
        };
    }
};
