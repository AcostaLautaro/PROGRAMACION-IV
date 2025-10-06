import { render, screen, waitFor } from '@testing-library/react';
import { expect, test } from 'vitest';

import { mockMenu } from '../mocks/handlers'; 
import Menu from '../components/Menu'; 
import { OrderProvider } from '../context/OrderContext'; // <-- NECESARIO PARA EL TEST

//wrapper para darle contexto al componente Menu
const MenuTestWrapper = () => (
    <OrderProvider>
        <Menu />
    </OrderProvider>
);

test('HU1: Debe mostrar los productos del menú cargados por la API', async () => {
  // Renderizamos dentro del Wrapper
  render(<MenuTestWrapper />); 

  //espera a que el elemento "Cafe Espresso" (el primer mock) aparezca
  await waitFor(() => {
    expect(screen.getByText(mockMenu[0].name)).toBeInTheDocument(); 
  });
  
  //verifica que se muestren la cantidad correcta de items (el mock tiene 3)
  const menuItems = screen.getAllByRole('listitem');
  expect(menuItems).toHaveLength(mockMenu.length);
});