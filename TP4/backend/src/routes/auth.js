const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { 
  loginLimiter, 
  progressiveDelayAndCaptcha 
} = require('../middleware/rate-limiter');

// RUTA DE LOGIN CON PROTECCIÓN
router.post('/login', 
  progressiveDelayAndCaptcha,  // 1. CAPTCHA (3 intentos)
  loginLimiter,                // 2. Rate limit (2 intentos)
  authController.login         // 3. Procesar login
);

// Otras rutas
router.post('/register', authController.register);
router.post('/auth/verify', authController.verifyToken);
router.post('/check-username', authController.checkUsername);

module.exports = router;