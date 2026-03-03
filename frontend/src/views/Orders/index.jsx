import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import '../Menu/style.css';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../../hooks/useUser';

function Orders() {
  const userId = useUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const [quantities, setQuantities] = useState({});
  const [status, setStatus] = useState('');

  const loadOrders = useCallback(async () => {
    if (!userId) return;
    setStatus('Loading orders...');
    try {
      await fetch(`http://localhost:8080/api/users/${userId}`, { method: 'POST' });
      const response = await fetch(`http://localhost:8080/api/users/${userId}/orders`);
      if (!response.ok) throw new Error('Failed to load orders');
      const data = await response.json();
      setOrders(data);
      const initialQuantities = {};
      for (const [orderId, orderItems] of Object.entries(data)) {
        initialQuantities[orderId] = {};
        for (const [itemId, item] of Object.entries(orderItems)) {
          initialQuantities[orderId][itemId] = item.quantity;
        }
      }
      setQuantities(initialQuantities);
      setStatus('');
    } catch (err) {
      console.error('Load orders failed:', err);
      setStatus('Unable to load orders.');
    }
  }, [userId]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const deleteOrder = useCallback(async (orderId) => {
    if (!confirm(`Delete order ${orderId}?`)) return;
    setStatus('Deleting order...');
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/orders/${orderId}`,
        { method: 'DELETE' }
      );
      if (!response.ok) throw new Error('Failed to delete order');
      setStatus('Order deleted.');
      loadOrders();
    } catch (err) {
      console.error('Delete order failed:', err);
      setStatus('Failed to delete order.');
    }
  }, [userId, loadOrders]);

  const deleteItem = useCallback(async (orderId, itemId) => {
    setStatus('Removing item...');
    try {
      const orderItems = orders[orderId];
      const updatedItems = Object.fromEntries(
        Object.entries(orderItems).filter(([id]) => id !== itemId)
      );

      if (Object.keys(updatedItems).length === 0) {
        await fetch(`http://localhost:8080/api/users/${userId}/orders/${orderId}`, {
          method: 'DELETE',
        });
      } else {
        await fetch(`http://localhost:8080/api/users/${userId}/orders/${orderId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: updatedItems }),
        });
      }

      setStatus('Item removed.');
      loadOrders();
    } catch (err) {
      console.error('Delete item failed:', err);
      setStatus('Failed to remove item.');
    }
  }, [orders, userId, loadOrders]);

  const updateQuantity = useCallback((orderId, itemId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [itemId]: value,
      },
    }));
  }, []);

  const confirmOrder = useCallback(async () => {
    const items = [];
    for (const [orderId, orderItems] of Object.entries(orders)) {
      for (const [itemId, item] of Object.entries(orderItems)) {
        const qty = parseInt(quantities[orderId]?.[itemId], 10) || 0;
        if (qty > 0) {
          items.push({ name: item.name, price: item.price, quantity: qty });
        }
      }
    }

    if (items.length === 0) {
      setStatus('No items to confirm.');
      return;
    }

    try {
      const receiptId = `receipt-${Date.now()}`;
      const receiptResponse = await fetch(
        `http://localhost:8080/api/users/${userId}/receipts/${receiptId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ receipt: items }),
        }
      );
      if (!receiptResponse.ok) throw new Error('Failed to save receipt');

      for (const orderId of Object.keys(orders)) {
        await fetch(
          `http://localhost:8080/api/users/${userId}/orders/${orderId}`,
          { method: 'DELETE' }
        );
      }

      navigate('/receipt');
    } catch (err) {
      console.error('Confirm order failed:', err);
      setStatus('Failed to confirm order.');
    }
  }, [orders, quantities, userId, navigate]);

  const total = Object.entries(orders).reduce((sum, [orderId, orderItems]) => {
    return sum + Object.entries(orderItems).reduce((orderSum, [itemId, item]) => {
      const qty = parseInt(quantities[orderId]?.[itemId], 10) || 0;
      return orderSum + item.price * qty;
    }, 0);
  }, 0);

  const hasOrders = Object.keys(orders).length > 0;

  return (
    <>
      <h1>The Node Restaurant</h1>
      {Object.entries(orders).map(([orderId, orderItems]) => (
        <section key={orderId}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ margin: 0 }}>{orderId}</h3>
            <button
              onClick={() => deleteOrder(orderId)}
              style={{ backgroundColor: '#dc3545' }}
            >
              DELETE ORDER
            </button>
          </div>
          <ul>
            {Object.entries(orderItems).map(([itemId, item]) => {
              const qty = parseInt(quantities[orderId]?.[itemId], 10) || 0;
              return (
              <li key={itemId} className="menu-item">
                <span className="item-info">{item.name} &mdash; ${item.price.toFixed(2)}</span>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(orderId, itemId, Math.max(0, qty - 1))}
                  >
                    &minus;
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(orderId, itemId, qty + 1)}
                  >
                    +
                  </button>
                  <button
                    className="qty-btn-delete"
                    onClick={() => deleteItem(orderId, itemId)}
                  >
                    &times;
                  </button>
                </div>
              </li>
              );
            })}
          </ul>
        </section>
      ))}
      {!hasOrders && !status && <p>No orders yet.</p>}
      {hasOrders && (
        <div id="order-total">Total: ${total.toFixed(2)}</div>
      )}
      <div>
        <Button onClick={() => navigate('/menu')} text={'BACK TO MENU'} />
        <Button onClick={confirmOrder} text={'CONFIRM ORDER'} />
        <Button onClick={() => navigate('/receipt')} text={'RECEIPT'} />
      </div>
      {status && <div id="orders-status">{status}</div>}
    </>
  );
}

export default Orders;
