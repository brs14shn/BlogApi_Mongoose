"use strict";

module.exports = (err, req, res, next) => {
  const errorstatusCode = res.statusCode ?? 500;
  res.status(errorstatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    body: req.body,
  });
};