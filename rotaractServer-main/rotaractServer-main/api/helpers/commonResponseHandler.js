

exports.response = function (res, success, statusCode, result, message) {
    res.status(statusCode);

    return res.json({
        success: success,
        result: result || '',
        message: message || '',
        statusCode: statusCode
    });
}