// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw'; // <--mmportar delay

//menu mockeado para la HU1
export const mockMenu = [
  { id: '1', name: 'Café Espresso', price: 2.50 },
  { id: '2', name: 'Té Chai', price: 3.00 },
  { id: '3', name: 'Muffin', price: 4.00 },
];

export const handlers = [
  //handler para obtener el menú (HU1)
  http.get('/api/menu', () => {
    return HttpResponse.json(mockMenu);
  }),
  
  //handler para enviar el pedido (HU5)
  http.post('/api/orders', async ({ request }) => {
    //simular un pequeño retraso para que el test capture el estado "Enviando..."
    await delay(50); 
    
    //simular una respuesta exitosa
    return HttpResponse.json({ success: true, orderId: 'ORD-12345' }, { status: 200 });
  }),
];