exports.success = function (req, res, message, status) {
    res.status(status || 200).send({"error": false,
                                    "codigo": status,
                                    "message": message,
                                    "body": req.body,
                                    "method": req.method
                                });
} // si es estatus no viniera, tomara el 200 por default

exports.error = function (req, res, message, status, details) {
    console.error("\x1b[31m"+"[response error] " +details);
    res.status(status || 500).send({"error": true,
                                    "codigo": status,
                                    "message": message,
                                    "body": req.body,
                                    "method": req.method
                                });
}