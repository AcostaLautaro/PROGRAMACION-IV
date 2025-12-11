const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');
const { 
  recordFailedAttempt, 
  clearFailedAttempts 
} = require('../middleware/rate-limiter');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
    }
    
    const ip = req.ip || req.connection.remoteAddress;
    const query = `SELECT * FROM users WHERE username = ?`;
    
    db.query(query, [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      
      if (results.length === 0) {
        recordFailedAttempt(ip);
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      
      const user = results[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        recordFailedAttempt(ip);
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      
      // Login exitoso
      clearFailedAttempts(ip);
      
      const token = jwt.sign(
        { id: user.id, username: user.username }, 
        process.env.JWT_SECRET || 'supersecret123'
      );
      
      res.json({ 
        token, 
        username: user.username,
        message: 'Login exitoso'
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    
    db.query(query, [username, hashedPassword, email], (err) => {
      if (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const verifyToken = (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecret123');
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

const checkUsername = (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Nombre de usuario requerido' });
    }
    
    const query = `SELECT COUNT(*) as count FROM users WHERE username = ?`;
    
    db.query(query, [username], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      
      const exists = results[0].count > 0;
      res.json({ exists });
    });
  } catch (error) {
    console.error('Check username error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  login,
  register,
  verifyToken,
  checkUsername
};