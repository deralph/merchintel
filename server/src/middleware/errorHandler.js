const errorHandler = (err, req, res, _next) => {
  const status = err.status ?? err.statusCode ?? 500;
  const safeStatus = Number.isInteger(status) ? status : 500;
  const message = err.message ?? "Internal Server Error";
  if (process.env.NODE_ENV !== "test") {
    console.error("[error]", err);
  }
  res.status(safeStatus).json({
    message,
    ...(err.details ? { details: err.details } : {}),
  });
};

export default errorHandler;
