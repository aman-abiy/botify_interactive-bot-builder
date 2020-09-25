const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    //  CAN HANDLE ERRORS BASED ON ERROR NAMES HERE AND SEND AN ERROR RESPONSE

    return res.status(err.statusCode || 500).json({
        status: false,
        hasError: true,
        message: err.errorMessage || 'Error'
    })
}

module.exports = errorHandler;