const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Erreur interne du serveur";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
