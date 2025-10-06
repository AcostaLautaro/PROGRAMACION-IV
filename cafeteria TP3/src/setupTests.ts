// Importa los matchers extendidos de jest-dom (ej. toBeInTheDocument)
import '@testing-library/jest-dom'; 
import { server } from './mocks/server';

// Iniciar el mockeo antes de todos los tests
beforeAll(() => server.listen());

// Resetear los handlers después de cada test para aislar las pruebas
afterEach(() => server.resetHandlers());

// Detener el mockeo al terminar
afterAll(() => server.close());