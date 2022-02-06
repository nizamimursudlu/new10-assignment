const Loan = require("../models/loansModel");

module.exports.getLoan = async (event) => {
    try {
        const loan = await new Promise((resolve, reject) => {
            Loan.scan().exec((err, loan) => {
                return err
                    ? reject(err)
                    : resolve(
                          loan.Items.filter(
                              (item) =>
                                  item.attrs.id === event.pathParameters.id
                          )
                      );
            });
        });
        return loan.length === 0
            ? {
                  status: 404,
                  body: `Loan with id: ${event.pathParameters.id} not found in the database`,
              }
            : {
                  statusCode: 200,
                  body: JSON.stringify(loan),
              };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        };
    }
};
