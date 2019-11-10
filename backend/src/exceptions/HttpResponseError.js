class HttpResponseError extends Error {
  constructor({ status = 500, message = '' }, result = {}) {
    super(message);
    this.name = 'HttpResponseError';
    this.status = status;
    this.message = message;
    this.result = result;
  }
  response(merge = {}) {
    return {
      ...merge,
      result: this.result,
      type: this.name,
      status: this.status,
      message: this.message,
    };
  }
}

export default HttpResponseError;
