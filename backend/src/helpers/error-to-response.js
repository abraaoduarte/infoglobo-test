import HttpResponseError from 'exceptions/HttpResponseError';

export default function errorToResponse(error, extra = {}) {
  if (error instanceof HttpResponseError) {
    return [error.status, error.response(extra)];
  }

  return [error.status || error.statusCode || 500, {
    ...extra,
    success: false,
    status: error.status || error.statusCode,
    type: error.name,
    message: error.message || (error.nativeError ? error.nativeError.message : null),
  }];
}
