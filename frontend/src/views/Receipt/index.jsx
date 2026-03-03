import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import '../Menu/style.css';
import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../../hooks/useUser';

function Receipt() {
  const userId = useUser();
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState({});
  const [status, setStatus] = useState('');

  const loadReceipts = useCallback(async () => {
    if (!userId) return;
    setStatus('Loading receipts...');
    try {
      await fetch(`http://localhost:8080/api/users/${userId}`, { method: 'POST' });
      const response = await fetch(`http://localhost:8080/api/users/${userId}/receipts`);
      if (!response.ok) throw new Error('Failed to load receipts');
      const data = await response.json();
      setReceipts(data);
      setStatus('');
    } catch (err) {
      console.error('Load receipts failed:', err);
      setStatus('Unable to load receipts.');
    }
  }, [userId]);

  useEffect(() => {
    loadReceipts();
  }, [loadReceipts]);

  const grandTotal = Object.values(receipts)
    .flat()
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const hasReceipts = Object.keys(receipts).length > 0;

  return (
    <>
      <h1>The Node Restaurant</h1>
      {Object.entries(receipts).map(([receiptId, items]) => {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return (
          <section key={receiptId}>
            <h3>{receiptId}</h3>
            <ul>
              {items.map((item, idx) => (
                <li key={idx}>
                  {item.name} &times; {item.quantity} &mdash; ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
              <li style={{ fontWeight: 'bold', marginTop: '4px' }}>
                Subtotal: ${subtotal.toFixed(2)}
              </li>
            </ul>
          </section>
        );
      })}
      {!hasReceipts && !status && <p>No receipts yet.</p>}
      {hasReceipts && (
        <div id="order-total">Grand Total: ${grandTotal.toFixed(2)}</div>
      )}
      <div>
        <Button onClick={() => navigate('/menu')} text={'BACK TO MENU'} />
      </div>
      {status && <div id="orders-status">{status}</div>}
    </>
  );
}

export default Receipt;
