const userId = 'guest';

function updateTotal() {
  const totalDiv = document.getElementById('order-total');
  if (!totalDiv) return;

  const inputs = document.querySelectorAll('.item-quantity');
  let total = 0;
  inputs.forEach((input) => {
    const price = parseFloat(input.dataset.price);
    const qty = parseInt(input.value, 10) || 0;
    total += price * qty;
  });

  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  totalDiv.style.fontWeight = 'bold';
  totalDiv.style.fontSize = '1.2em';
  totalDiv.style.marginTop = '10px';
}

async function loadOrders() {
  const container = document.getElementById('orders');
  const status = document.getElementById('orders-status');

  if (status) status.textContent = 'Loading orders...';

  try {
    const userResponse = await fetch(`/api/users/${userId}`, { method: 'POST' });
    if (!userResponse.ok && userResponse.status !== 400) {
      throw new Error('Failed to create user');
    }

    const response = await fetch(`/api/users/${userId}/orders`);
    if (!response.ok) {
      throw new Error('Failed to load orders');
    }

    const orders = await response.json();

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
        li.style.marginBottom = '6px';

        const label = document.createElement('span');
        label.textContent = `${item.name} — $${item.price.toFixed(2)} x `;

        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.value = item.quantity;
        input.className = 'item-quantity';
        input.dataset.price = item.price;
        input.dataset.orderId = orderId;
        input.dataset.name = item.name;
        input.style.width = '50px';
        input.addEventListener('input', updateTotal);

        li.appendChild(label);
        li.appendChild(input);
        list.appendChild(li);
      });
      section.appendChild(list);
      container.appendChild(section);
    });

    if (status) status.textContent = '';
    updateTotal();
  } catch (err) {
    console.error('Load orders failed:', err);
    if (status) status.textContent = 'Unable to load orders.';
  }
}

async function confirmOrder() {
  const inputs = document.querySelectorAll('.item-quantity');
  const items = [];

  inputs.forEach((input) => {
    const qty = parseInt(input.value, 10) || 0;
    if (qty > 0) {
      items.push({
        name: input.dataset.name,
        price: parseFloat(input.dataset.price),
        quantity: qty,
      });
    }
  });

  if (items.length === 0) {
    alert('No items to confirm.');
    return;
  }

  try {
    const receiptId = `receipt-${Date.now()}`;
    const receiptResponse = await fetch(`/api/users/${userId}/receipts/${receiptId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receipt: items }),
    });

    if (!receiptResponse.ok) {
      throw new Error('Failed to save receipt');
    }

    const orderIds = new Set();
    inputs.forEach((input) => {
      orderIds.add(input.dataset.orderId);
    });

    for (const orderId of orderIds) {
      await fetch(`/api/users/${userId}/orders/${orderId}`, { method: 'DELETE' });
    }

    window.location.href = '/receipt';
  } catch (err) {
    console.error('Confirm order failed:', err);
    alert('Failed to confirm order. Please try again.');
  }
}

loadOrders();

const backButton = document.getElementById('back-to-menu');
if (backButton) {
  backButton.addEventListener('click', () => {
    window.location.href = '/menu';
  });
}

const confirmButton = document.getElementById('confirm-order');
if (confirmButton) {
  confirmButton.addEventListener('click', confirmOrder);
}
