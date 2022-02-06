const Loan = require("../app1/models/loansModel");

module.exports.changeStatus = async (event, body) => {
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
        return await new Promise((resolve, reject) => {
            Loan.update(
                { id: event.pathParameters.id, status: "disbursed" },
                function (err, loan) {
                    console.log(loan.attrs);
                    if (!loan.attrs.createdAt) {
                        return resolve({
                            statusCode: 404,
                            body: `Load with id: ${event.pathParameters.id} not found in the database`,
                        });
                    }
                    return err
                        ? reject(err)
                        : resolve({
                              statusCode: 200,
                              body: `Load with id: ${event.pathParameters.id} had been updated in the database`,
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
