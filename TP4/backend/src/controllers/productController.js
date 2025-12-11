const { db } = require('../config/database');

// ✅ CORREGIDO: SQL Injection prevenida
const getProducts = (req, res) => {
  try {
    const { category, search } = req.query;
    
    // 1. CONSTRUIR CONSULTA PARAMETRIZADA
    let query = 'SELECT id, name, category, price, description FROM products WHERE 1=1';
    const params = [];
    
    // 2. Agregar condiciones con PARÁMETROS (no concatenación)
    if (category && typeof category === 'string' && category.trim().length > 0) {
      // Sanitizar category (opcional, pero los parámetros ya protegen)
      const sanitizedCategory = category.trim().substring(0, 100); // Limitar longitud
      query += ' AND category = ?';
      params.push(sanitizedCategory);
    }
    
    if (search && typeof search === 'string' && search.trim().length > 0) {
      // Sanitizar search
      const sanitizedSearch = search.trim().substring(0, 100);
      query += ' AND name LIKE ?';
      params.push(`%${sanitizedSearch}%`);
    }
    
    // 3. Agregar límite para prevenir DoS
    query += ' LIMIT 100';
    
    console.log('✅ Consulta SQL segura:');
    console.log('   Query:', query);
    console.log('   Parámetros:', params);
    
    // 4. EJECUTAR CON PREPARED STATEMENT
    db.query(query, params, (err, results) => {
      if (err) {
        // ✅ NO EXPONER ERRORES SQL AL CLIENTE
        console.error('❌ Error de base de datos:', err.message);
        return res.status(500).json({ 
          error: 'Error interno del servidor' 
        });
      }
      
      // ✅ RETORNAR RESULTADOS SEGUROS
      res.json(results);
    });
    
  } catch (error) {
    console.error('❌ Error en getProducts:', error);
    res.status(400).json({ error: 'Parámetros inválidos' });
  }
};

// Función adicional para demostrar más protecciones
const getProductById = (req, res) => {
  const { id } = req.params;
  
  // Validar que ID sea numérico
  if (!id || isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({ error: 'ID de producto inválido' });
  }
  
  const query = 'SELECT * FROM products WHERE id = ? LIMIT 1';
  
  db.query(query, [parseInt(id)], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error interno' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json(results[0]);
  });
};

module.exports = {
  getProducts,
  getProductById  // Opcional: exportar si lo vas a usar
};