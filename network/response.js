const statusMessages = {
    "200": "Done",
    "201": "Created",
    "400": "Invalid format",
    "500": "Internal error",
}

exports.success = function (req, res, message, status) {
    let statusMessage = message;
    if (!status) {
        status = 200
    }

    if (!message) {
        statusMessage = statusMessages[status];
    }
    res.status(status).send({"error": false,
                                    "codigo": status,
                                    "message": statusMessage,
                                    "body": req.body,
                                    "method": req.method
                                });
} // si es estatus no viniera, tomara el 200 por default

exports.error = function (req, res, message, status, details) {
    let statusMessage = message;
    if (!status) {
        status = 500
    }
    if (!message) {
        statusMessage = statusMessages[status];
    }
    console.error("[response error] " + details);
    res.status(status).send({"error": true,
                                    "codigo": status,
                                    "message": statusMessage,
                                    "body": req.body,
                                    "method": req.method
                                });
}