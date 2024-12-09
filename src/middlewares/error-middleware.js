const errorHandler = function (err, req, res, next) {
  return res.status(500).json({
    message: "An error occcured. Please try again.",
    error: err,
  });
};

export default errorHandler;
