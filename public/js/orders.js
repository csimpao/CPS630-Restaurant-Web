async function loadOrders() {
  const container = document.getElementById('orders');
  const status = document.getElementById('orders-status');

  // hardcoded user id
  const userId = 'guest';

  if (status) status.textContent = 'Loading orders...';

  try {
    const userResponse = await fetch(`/api/users/${userId}`, { method: 'POST' });
    console.log('Create user response:', userResponse.status);
    if (!userResponse.ok && userResponse.status !== 400) {
      throw new Error('Failed to create user');
    }

    const response = await fetch(`/api/users/${userId}/orders`);
    if (!response.ok) {
      console.log('Get orders error:', response.status);
      throw new Error('Failed to load orders');
    }

    const orders = await response.json();
    console.log('Get orders response:', response.status, orders);

    if (!container) return;
    container.innerHTML = '';

    const entries = Object.entries(orders);
    if (entries.length === 0) {
      if (status) status.textContent = 'No orders yet.';
      return;
    }

    entries.forEach(([orderId, items]) => {
      const section = document.createElement('section');
      const title = document.createElement('h3');
      title.textContent = `Order ${orderId}`;
      section.appendChild(title);

      const list = document.createElement('ul');
      items.forEach((item) => {
        const li = document.createElement('li');
        const lineTotal = (item.price * item.quantity).toFixed(2);
        li.textContent = `${item.name} x ${item.quantity} - $${lineTotal}`;
        list.appendChild(li);
      });
      section.appendChild(list);
      container.appendChild(section);
    });

    if (status) status.textContent = '';
  } catch (err) {
    console.error('Load orders failed:', err);
    if (status) status.textContent = 'Unable to load orders.';
  }
}

loadOrders();

const backButton = document.getElementById('back-to-menu');
if (backButton) {
  backButton.addEventListener('click', () => {
    window.location.href = '/menu';
  });
}
