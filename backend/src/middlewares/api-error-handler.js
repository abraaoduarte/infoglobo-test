export default function apiErrorHandler(err, req, res, next) {
  if (res.headersSent || !req.originalUrl.startsWith('/api')) {
    return next(err);
  }

  if (req.app.get('env') !== 'development') {
    delete err.stack;
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    status: err.statusCode,
    type: err.name,
    message: err.toString(),
  });
}
