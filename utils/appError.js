class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    //! error stack trace : show the error where
    Error.captureStackTrace(this, this.constructor);
  }
}
module.export = AppError;
