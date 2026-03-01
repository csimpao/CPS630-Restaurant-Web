import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Section from './Section';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const DEFAULT_RESPONSE = {
  Appetizers: [],
  Mains: [],
  Dessert: [], // notably different front desserts as pictured below...
};

function Order() {
  const navigate = useNavigate();
  const [dishes, setDishes] = useState(DEFAULT_RESPONSE);
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    async function loadMenu() {
      const response = await fetch('http://localhost:8080/api/menu');
      if (!response.ok) {
        throw new Error('Failed to load menu');
      }
      const menuItems = await response.json();

      const newDishes = menuItems.reduce((acc, curr) => {
        const category = curr.category;
        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(curr);
        return acc;
      }, {});
      setDishes(newDishes);
    }

    loadMenu();
  }, []);

  const onChange = useCallback(
    (dish, quantity) => {
      setOrder((previousOrder) => {
        return {
          ...previousOrder,
          [dish.id]: {
            id: dish.id,
            name: dish.name,
            price: dish.price,
            quantity: quantity,
          },
        };
      });
    },
    [setOrder]
  );

  const createOrder = useCallback(async () => {
    const userId = 'guest';
    const orderId = `order-${Date.now()}`;

    try {
      const userResponse = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: 'POST',
        }
      );
      if (!userResponse.ok) {
        throw new Error('Failed to create user');
      }

      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/orders/${orderId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      setOrderStatus('Order created.');
    } catch (err) {
      console.error('Create order failed:', err);
      setOrderStatus('Unable to create order.');
    }
  }, [order]);

  return (
    <>
      <h1>The Node Restaurant</h1>
      <div>
        <Section
          title={'Appetizers'}
          items={dishes['Appetizers']}
          onChange={onChange}
          order={order}
        />
        <Section
          title={'Mains'}
          items={dishes['Mains']}
          onChange={onChange}
          order={order}
        />
        <Section
          title={'Desserts'}
          items={dishes['Dessert']}
          onChange={onChange}
          order={order}
        />
      </div>
      <div>
        <Button onClick={() => createOrder()} text={'CREATE ORDER'} />
        <Button onClick={() => navigate('/orders')} text={'VIEW ORDERS'} />
        <Button onClick={() => navigate('/receipt')} text={'RECEIPT'} />
      </div>
      {orderStatus && <div id="order-status">{orderStatus}</div>}
    </>
  );
}

export default Order;
