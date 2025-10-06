import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, describe } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';


import { OrderProvider } from '../context/OrderContext'; 
import Menu from '../components/Menu';
import OrderDisplay from '../components/OrderDisplay';
import { mockMenu } from '../mocks/handlers';


const AppWrapper = () => (
    <OrderProvider>
        <div className="flex p-8 max-w-4xl mx-auto space-x-8">
            <Menu />
            <OrderDisplay />
        </div>
    </OrderProvider>
);

// Definiciones de productos
const Muffin = mockMenu.find(p => p.name === 'Muffin')!;
const Cafe = mockMenu.find(p => p.name === 'Café Espresso')!;

describe('Flujo Completo de Pedido (HU2, HU3, HU4, HU5, HU6)', () => {

    test('HU5: Debe enviar el pedido y resetear la interfaz al confirmar', async () => {
        render(<AppWrapper />);
        const user = userEvent.setup();
        
        
        await waitFor(() => {
            expect(screen.getByText(Muffin.name)).toBeInTheDocument();
        });
        const muffinButton = screen.getByRole('button', { name: `Agregar ${Muffin.name} al pedido` });
        await user.click(muffinButton);
        await user.click(muffinButton); // Muffin (x2)
        
        const sendButton = screen.getByRole('button', { name: 'Enviar Pedido' });

        
        await user.click(sendButton);
        
        
        await waitFor(() => {
             expect(screen.getByRole('button', { name: 'Enviando...' })).toBeInTheDocument();
        });
        
        
        await waitFor(() => {
            expect(screen.getByText('Pedido confirmado con éxito!')).toBeInTheDocument();
        });
        
      
        expect(screen.getByText('El pedido está vacío.')).toBeInTheDocument();
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('0.00');
    });

    test('HU6: Debe mostrar mensaje de error si el envío del pedido falla (Error 500)', async () => {
        
        server.use(
            http.post('/api/orders', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );
        
        render(<AppWrapper />);
        const user = userEvent.setup();

        
        await waitFor(() => {
            expect(screen.getByText(Cafe.name)).toBeInTheDocument();
        });
        const cafeButton = screen.getByRole('button', { name: `Agregar ${Cafe.name} al pedido` });
        await user.click(cafeButton);
        
        const sendButton = screen.getByRole('button', { name: 'Enviar Pedido' });

        
        await user.click(sendButton);
        
      
        await waitFor(() => {
            expect(screen.getByText('Error al enviar el pedido. Intente de nuevo.')).toBeInTheDocument();
        });
        
        
        expect(screen.queryByText('El pedido está vacío.')).not.toBeInTheDocument();
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('2.50');
    });

    test('HU2, HU3 & HU4: Debe agregar, calcular total, y permitir la eliminación de ítems', async () => {
        render(<AppWrapper />);
        const user = userEvent.setup();
        
        
        await waitFor(() => {
            expect(screen.getByText(Muffin.name)).toBeInTheDocument();
        });
        
    
        const orderArea = screen.getByLabelText('Resumen del Pedido'); 
        
        const muffinButton = screen.getByRole('button', { name: `Agregar ${Muffin.name} al pedido` });
        const cafeButton = screen.getByRole('button', { name: `Agregar ${Cafe.name} al pedido` });

        
        await user.click(muffinButton);
        await waitFor(() => {
            expect(orderArea).toHaveTextContent('Muffin (1)');
        });
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('4.00');
        
        
        await user.click(cafeButton);
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('6.50');
        await waitFor(() => {
            expect(orderArea).toHaveTextContent('Café Espresso (1)');
        });
        
        
        await user.click(muffinButton);
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('10.50');
        await waitFor(() => {
            expect(orderArea).toHaveTextContent('Muffin (2)');
        });
        
        
        
        
        const eliminarCafeButton = screen.getByRole('button', { name: `Eliminar ${Cafe.name}` });
        await user.click(eliminarCafeButton);
        
       
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('8.00');
        
        
        await waitFor(() => {
            
            const cafeMenuItem = screen.queryByText('Café Espresso', { selector: '.font-medium.text-lg.text-gray-700' });
            
            
            expect(orderArea).not.toHaveTextContent('Café Espresso');
        });


        
        const eliminarMuffinButton = screen.getByRole('button', { name: `Eliminar ${Muffin.name}` });
        await user.click(eliminarMuffinButton);
        
        //verificar que el pedido esta vacio y el total es 0
        await waitFor(() => {
            expect(screen.getByText('El pedido está vacío.')).toBeInTheDocument();
        });
        expect(screen.getByLabelText('Total del pedido')).toHaveTextContent('0.00');
    });
});