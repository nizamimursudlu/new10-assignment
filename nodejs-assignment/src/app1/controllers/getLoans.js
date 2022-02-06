const Loan = require("../models/loansModel");

module.exports.getLoans = async (event) => {
    try {
        const loans = await new Promise((resolve, reject) => {
            Loan.scan()
                .loadAll()
                .exec((err, loans) => {
                    return err ? reject(err) : resolve(loans.Items);
                });
        });

        return loans.length === 0
            ? {
                  statusCode: 200,
                  body: "The database is empty",
              }
            : {
                  statusCode: 200,
                  body: JSON.stringify(loans),
              };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        };
    }
};
