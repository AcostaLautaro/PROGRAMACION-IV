import React, { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { Product } from '../types/product';

// --- Tipos ---
export type OrderItem = Product & {
    quantity: number;
};

interface OrderData {
    id: string;
    quantity: number;
}

interface OrderContextType {
    orderItems: OrderItem[];
    total: number;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    resetOrder: () => void;
    // HU5
    sendOrder: (orderData: OrderData[]) => Promise<void>;
    isSending: boolean;
    lastOrderMessage: string | null;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// --- Hook y Provider ---
export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrder debe ser usado dentro de un OrderProvider');
    }
    return context;
};

interface OrderProviderProps {
    children: ReactNode;
}

// Este es el único lugar donde debe aparecer 'export const OrderProvider'
export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    // HU5: Estado de envío
    const [isSending, setIsSending] = useState(false);
    const [lastOrderMessage, setLastOrderMessage] = useState<string | null>(null);

    // Lógica para calcular el total (HU3)
    const total = useMemo(() => {
        return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [orderItems]);

    // Lógica para agregar un ítem (HU2)
    const addItem = useCallback((product: Product) => {
        setLastOrderMessage(null); // Limpiar mensaje al modificar
        setOrderItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Si ya existe, incrementa la cantidad
                return prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existe, añade el nuevo ítem con cantidad 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    }, []);

    // Lógica de remover (HU4)
    const removeItem = useCallback((productId: string) => {
        setLastOrderMessage(null); // Limpiar mensaje al modificar
        setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    // Lógica para resetear (Necesaria para HU5)
    const resetOrder = useCallback(() => {
        setOrderItems([]);
    }, []);

    // Lógica para enviar el pedido (HU5)
    const sendOrder = useCallback(async (orderData: OrderData[]) => {
        if (orderData.length === 0) return;
        
        setIsSending(true);
        setLastOrderMessage(null);

        try {
            // Esta llamada será interceptada por MSW
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error('El servidor respondió con un error.');
            }

            // Éxito: limpiar pedido y mostrar mensaje
            resetOrder();
            setLastOrderMessage('Pedido confirmado con éxito!');

        } catch (error) {
            // Error: mostrar mensaje de error (HU6)
            setLastOrderMessage('Error al enviar el pedido. Intente de nuevo.');
        } finally {
            setIsSending(false);
        }
    }, [resetOrder]);


    const value = useMemo(() => ({
        orderItems,
        total,
        addItem,
        removeItem,
        resetOrder,
        sendOrder,
        isSending,
        lastOrderMessage
    }), [orderItems, total, addItem, removeItem, resetOrder, sendOrder, isSending, lastOrderMessage]);

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};