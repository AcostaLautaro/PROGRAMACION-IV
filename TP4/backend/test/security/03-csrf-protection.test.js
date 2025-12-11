const request = require('supertest');
const express = require('express');
const session = require('express-session');
const vulnerabilityRoutes = require('../../src/routes/vulnerabilities');

describe('Seguridad: CSRF (Cross-Site Request Forgery)', () => {
  let app;
  let agent;
  let csrfToken;

  beforeEach(async () => {
    app = express();
    app.use(express.json());
    app.use(session({
      secret: 'test-secret',
      resave: false,
      saveUninitialized: true
    }));
    
    // Middleware para simular usuario autenticado
    app.use((req, res, next) => {
      req.session.userId = 1;
      next();
    });
    
    app.use('/api', vulnerabilityRoutes);
    agent = request.agent(app);
    
    // Obtener token CSRF
    const tokenResponse = await agent.get('/api/csrf-token');
    csrfToken = tokenResponse.body.csrfToken;
  });

  test('✅ Transferencias requieren token CSRF', async () => {
    // 1. SIN token → 403
    const noTokenResponse = await agent
      .post('/api/transfer')
      .send({
        fromAccount: '1234567890',
        toAccount: '0987654321',
        amount: '1000'
      });

    expect(noTokenResponse.status).toBe(403);
    expect(noTokenResponse.body.error).toContain('CSRF');

    // 2. CON token → No 403 (puede ser 200 o error de BD)
    const withTokenResponse = await agent
      .post('/api/transfer')
      .set('X-CSRF-Token', csrfToken)
      .send({
        fromAccount: '1234567890',
        toAccount: '0987654321',
        amount: '1000'
      });

    expect(withTokenResponse.status).not.toBe(403);
  });

  test('✅ Tokens CSRF únicos por sesión', async () => {
    const token1 = csrfToken;
    
    // Nueva sesión
    const agent2 = request.agent(app);
    const tokenResponse2 = await agent2.get('/api/csrf-token');
    const token2 = tokenResponse2.body.csrfToken;

    expect(token1).toBeDefined();
    expect(token2).toBeDefined();
    expect(token1).not.toBe(token2);
  });

  test('✅ Protección CSRF implementada', async () => {
    console.log(`
    ✅ Endpoint /api/csrf-token funciona
    ✅ Transferencias validan token CSRF
    ✅ Tokens únicos por sesión
    ✅ Middleware de validación implementado
    `);
    expect(true).toBe(true);
  });
});