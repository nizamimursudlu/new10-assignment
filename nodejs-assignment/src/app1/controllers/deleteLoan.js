const Loan = require("../models/loansModel");

module.exports.deleteLoan = async (event) => {
    try {
        return await new Promise((resolve, reject) => {
            Loan.destroy({ id: event.pathParameters.id }, function (err, loan) {
                return err
                    ? reject(err)
                    : resolve({
                          statusCode: 200,
                          body: `Load with id: ${event.pathParameters.id} had been deleted from the database`,
                      });
            });
        });
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        };
    }
};
