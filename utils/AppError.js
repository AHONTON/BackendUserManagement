class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // utile pour différencier erreurs "connues" des crashs
  }
}

module.exports = AppError;
