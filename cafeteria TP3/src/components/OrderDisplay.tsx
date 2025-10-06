import React from 'react';
import { useOrder, OrderItem } from '../context/OrderContext';
import { Product } from '../types/product';


interface ServerResponse {
    success: boolean;
    orderId: string;
}

const OrderDisplay = () => {
    
    const { 
        orderItems, 
        total, 
        removeItem, 
        resetOrder, 
        sendOrder,
        isSending,
        lastOrderMessage
    } = useOrder();

    const handleSendOrder = async () => {
        const orderData = orderItems.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));

        await sendOrder(orderData); 
    };

    return (
        <div aria-label="Resumen del Pedido" className="p-4 bg-white rounded-lg shadow-xl h-full flex flex-col">
            <h2 className="text-2xl font-extrabold mb-4 text-red-600 border-b pb-2">Tu Pedido</h2>
            
            <ul className="flex-grow space-y-3 mb-4 overflow-y-auto">
                {orderItems.length === 0 ? (
                    <li className="text-gray-500 italic">El pedido está vacío.</li>
                ) : (
                    orderItems.map((item: OrderItem) => (
                        <li key={item.id} role="listitem" className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                            {/* CORRECCION Renderizar el texto sin span anidado */}
                            <span className="font-medium text-gray-700">
                                {item.name} ({item.quantity})
                            </span>
                            <div className="flex items-center space-x-3">
                                <span className="text-yellow-700 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeItem(item.id)} // Lógica HU4: Eliminar ítem
                                    className="text-red-500 hover:text-red-700 text-sm font-semibold transition duration-150"
                                    aria-label={`Eliminar ${item.name}`}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            <div className="border-t pt-4 space-y-3">
                {/* Mensaje de la HU5/HU6 */}
                {lastOrderMessage && (
                    <div className={`p-3 rounded-lg font-bold text-center ${
                        lastOrderMessage.includes('confirmado') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {lastOrderMessage}
                    </div>
                )}
                
                {/* Total a pagar (HU3) */}
                <div className="flex justify-between items-center text-xl font-extrabold">
                    <span>Total:</span>
                    <span aria-label="Total del pedido">${total.toFixed(2)}</span>
                </div>
                
                <button
                    onClick={handleSendOrder} // Lógica HU5: Enviar Pedido
                    disabled={orderItems.length === 0 || isSending}
                    className="w-full bg-red-600 text-white px-4 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition duration-150 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? 'Enviando...' : 'Enviar Pedido'}
                </button>
            </div>
        </div>
    );
};

export default OrderDisplay;