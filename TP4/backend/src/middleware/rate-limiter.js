const rateLimit = require('express-rate-limit');

// Rate Limiter - 2 intentos máximo
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: {
    error: 'Demasiados intentos de login. Intente nuevamente en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

// Almacenamiento para intentos fallidos
const FAILED_ATTEMPTS = new Map();

const getFailedAttempts = (ip) => {
  const attempts = FAILED_ATTEMPTS.get(ip) || [];
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const recentAttempts = attempts.filter(time => now - time < windowMs);
  
  if (recentAttempts.length > 0) {
    FAILED_ATTEMPTS.set(ip, recentAttempts);
  } else {
    FAILED_ATTEMPTS.delete(ip);
  }
  
  return recentAttempts.length;
};

const recordFailedAttempt = (ip) => {
  if (!FAILED_ATTEMPTS.has(ip)) {
    FAILED_ATTEMPTS.set(ip, []);
  }
  FAILED_ATTEMPTS.get(ip).push(Date.now());
};

const clearFailedAttempts = (ip) => {
  FAILED_ATTEMPTS.delete(ip);
};

// Middleware de CAPTCHA
const progressiveDelayAndCaptcha = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const failedCount = getFailedAttempts(ip);
  
  // CAPTCHA después de 3 intentos
  if (failedCount >= 3) {
    return res.status(400).json({
      error: 'Se requiere verificación CAPTCHA',
      requiresCaptcha: true
    });
  }
  
  next();
};

module.exports = {
  loginLimiter,
  progressiveDelayAndCaptcha,
  recordFailedAttempt,
  clearFailedAttempts,
  getFailedAttempts
};