class InvalidBodyContentError extends Error {
  constructor(message) {
    super(JSON.stringify(message));
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 422;
  }

  get statusCode() {
    return this.status;
  }
}

module.exports = InvalidBodyContentError;
