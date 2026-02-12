let menuItems = [];

async function createOrder() {
  const status = document.getElementById('order-status');
  if (status) status.textContent = 'Creating order...';

  const items = [];
  menuItems.forEach((item) => {
    const input = document.getElementById(`qty-${item.id}`);
    const quantity = Number(input && input.value) || 0;
    if (quantity > 0) {
      items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity
      });
    }
  });

  if (items.length === 0) {
    if (status) status.textContent = 'Please select at least one item.';
    return;
  }

  // support guest being the only user registered before connecting to database
  const userId = 'guest';
  const orderId = `order-${Date.now()}`;

  try {
    const userResponse = await fetch(`/api/users/${userId}`, { method: 'POST' });
    if (!userResponse.ok) {
      throw new Error('Failed to create user');
    }

    const response = await fetch(`/api/users/${userId}/orders/${orderId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: items })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    if (status) status.textContent = 'Order created.';
  } catch (err) {
    console.error('Create order failed:', err);
    if (status) status.textContent = 'Unable to create order.';
  }
}

async function loadMenu() {
  const containers = {
    Appetizers: document.getElementById('appetizers'),
    Mains: document.getElementById('mains'),
    Dessert: document.getElementById('desserts'),
    Desserts: document.getElementById('desserts')
  };

  try {
    const response = await fetch('/api/menu');
    if (!response.ok) {
      throw new Error('Failed to load menu');
    }
    menuItems = await response.json();

    Object.values(containers).forEach((list) => {
      if (list) list.innerHTML = '';
    });

    menuItems.forEach((item) => {
      const list = containers[item.category];
      if (!list) return;

      const li = document.createElement('li');

      const label = document.createElement('span');
      label.textContent = `${item.name} - $${item.price.toFixed(2)}`;

      const input = document.createElement('input');
      input.type = 'number';
      input.min = '0';
      input.step = '1';
      input.value = '0';
      input.id = `qty-${item.id}`;
      input.name = input.id;

      li.appendChild(label);
      li.appendChild(input);
      list.appendChild(li);
    });
  } catch (err) {
    Object.values(containers).forEach((list) => {
      if (list) list.textContent = 'Unable to load menu.';
    });
  }
}

loadMenu();

const createOrderButton = document.getElementById('create-order');
if (createOrderButton) {
  createOrderButton.addEventListener('click', createOrder);
}

const viewOrdersButton = document.getElementById('view-orders');
if (viewOrdersButton) {
  viewOrdersButton.addEventListener('click', () => {
    window.location.href = '/orders';
  });
}

const viewReceiptButton = document.getElementById('view-receipt');
if (viewReceiptButton) {
  viewReceiptButton.addEventListener('click', () => {
    window.location.href = '/receipt';
  });
}
