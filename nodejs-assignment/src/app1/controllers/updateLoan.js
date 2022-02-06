const callApp2 = require("../../app2/changeStatus");

module.exports.updateLoan = async (event, body) => {
    try {
        return callApp2.changeStatus(event, body);
    } catch (e) {
        return {
            statusCode: 500,
            body: e.stack,
        };
    }
};
