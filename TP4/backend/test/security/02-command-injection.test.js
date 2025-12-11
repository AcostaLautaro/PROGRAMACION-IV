const request = require('supertest');
const express = require('express');
const vulnerabilityRoutes = require('../../src/routes/vulnerabilities');

describe('Seguridad: Command Injection', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api', vulnerabilityRoutes);
  });

  test('✅ No debe permitir ejecutar comandos arbitrarios', async () => {
    const maliciousInputs = [
      '8.8.8.8; ls -la',
      '8.8.8.8 && cat /etc/passwd',
      '8.8.8.8 | whoami',
      '8.8.8.8`id`',
      '$(cat /etc/passwd)'
    ];

    for (const input of maliciousInputs) {
      const response = await request(app)
        .post('/api/ping')
        .send({ host: input });

      // Debe rechazar comandos maliciosos
      expect([400, 403, 422, 500]).toContain(response.status);
      expect(response.body.output).toBeUndefined();
    }
  });

  test('✅ Solo debe aceptar IPs o hostnames válidos', async () => {
    const validHosts = ['8.8.8.8', '1.1.1.1'];
    
    for (const host of validHosts) {
      const response = await request(app)
        .post('/api/ping')
        .send({ host });

      // Puede ser 200 (éxito) o error, pero no inyección
      expect(response.status).not.toBe(500);
    }
  });

  test('✅ Debe usar métodos seguros para ejecutar comandos', async () => {
    const response = await request(app)
      .post('/api/ping')
      .send({ host: '8.8.8.8' });

    // Si es exitoso, verificar output
    if (response.status === 200) {
      expect(response.body.output).toBeDefined();
      // No debe contener output de comandos adicionales
      expect(response.body.output).not.toMatch(/ls|cat|whoami|id|passwd/i);
    }
  });

  test('✅ No debe exponer errores del sistema', async () => {
    const maliciousInputs = [
      '--invalid-option',
      ';invalid',
      '`invalid`'
    ];

    for (const input of maliciousInputs) {
      const response = await request(app)
        .post('/api/ping')
        .send({ host: input });

      // No debe mostrar detalles internos
      const errorMessage = response.body.error || '';
      const forbiddenErrors = ['ping:', 'command not found', 'sh:', 'bash:'];
      
      for (const forbidden of forbiddenErrors) {
        expect(errorMessage.toLowerCase()).not.toContain(forbidden.toLowerCase());
      }
    }
  });
});