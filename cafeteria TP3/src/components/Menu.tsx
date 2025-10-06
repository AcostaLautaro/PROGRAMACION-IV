import React, { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { useOrder } from '../context/OrderContext';

const Menu = () => {
  const { addItem } = useOrder(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    
    fetch('/api/menu') 
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //manejo de estados:
  if (loading) return <div className="p-6 text-center text-lg">Cargando menú...</div>;
  if (error || products.length === 0) return <div className="p-6 text-center text-red-600 font-bold">Error al cargar menú</div>;

  return (
    <div aria-label="Menú de Cafetería" className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-extrabold mb-4 text-gray-800 border-b pb-2">Productos Disponibles</h2>
      <ul className="space-y-4">
        {products.map(product => (
          //el test está esperando el 'role="listitem"' y el nombre del producto
          <li key={product.id} role="listitem" className="flex justify-between items-center p-3 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-200"> 
            <span className="font-medium text-lg text-gray-700">{product.name}</span>
            <div className="flex items-center space-x-4">
              <span className="text-green-600 font-bold text-xl">${product.price.toFixed(2)}</span>
              <button 
                onClick={() => addItem(product)} // Lógica HU2: Agregar ítem
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 shadow-md"
                aria-label={`Agregar ${product.name} al pedido`}
              >
                Agregar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;