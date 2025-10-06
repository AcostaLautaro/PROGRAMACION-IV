import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { OrderProvider } from './context/OrderContext'; 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrderProvider>
      <App />
    </OrderProvider>
  </StrictMode>,
);