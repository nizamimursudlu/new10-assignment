const dynamo = require("dynamodb");
const Loan = require("../models/loansModel");
const Company = require("../models/companiesModel");
const axios = require("axios");

const createCompany = async () => {
    try {
        await new Promise((resolve, reject) => {
            dynamo.createTables((err) => (err ? reject(err) : resolve()));
        });
        const res = await axios.get(`https://api.overheid.io/openkvk/`, {
            headers: {
                "ovio-api-key":
                    "dfc00e71d892c25cb4d8eda68490f689dd46d13da2daa18ab9482b369513b104",
            },
        });

        res.data._embedded.bedrijf.filter(async (item) => {
            const company = await axios.get(
                `https://api.overheid.io${item._links.self.href}`,
                {
                    headers: {
                        "ovio-api-key":
                            "dfc00e71d892c25cb4d8eda68490f689dd46d13da2daa18ab9482b369513b104",
                    },
                }
            );

            return await new Promise((resolve, reject) => {
                company.data.actief
                    ? Company.create(
                          { info: company.data },
                          function (err, company) {
                              err && reject(err);
                              resolve({
                                  statusCode: 201,
                                  body: `Active company has been created: ${JSON.stringify(
                                      company
                                  )}`,
                              });
                          }
                      )
                    : resolve({
                          statusCode: 200,
                          body: `Company is not active`,
                      });
            });
        });
    } catch (err) {
        return {
            statusCode: 500,
            body: err.stack,
        };
    }
};

module.exports.createLoan = async (event, body) => {
    try {
        createCompany();
        await new Promise((resolve, reject) => {
            dynamo.createTables((err) => (err ? reject(err) : resolve()));
        });
        return await new Promise((resolve, reject) => {
            Loan.create(
                { amount: event.pathParameters.amount, status: "offered" },
                function (err, loan) {
                    err && reject(err);
                    resolve({
                        statusCode: 201,
                        body: `Loan has been created: ${JSON.stringify(loan)}`,
                    });
                }
            );
        });
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        };
    }
};
