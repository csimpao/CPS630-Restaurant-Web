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

  if (inputs.length === 0 || total === 0) {
    totalDiv.style.display = 'none';
  } else {
    totalDiv.style.display = 'block';
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.fontSize = '1.2em';
    totalDiv.style.marginTop = '10px';
  }
}
//delete order item functioanlity
async function deleteItem(orderId, itemName) {
  const status = document.getElementById('orders-status');
  if (status) status.textContent = 'Removing item...';

  try {
    const response = await fetch(`/api/users/${userId}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');

    const orders = await response.json();
    const items = orders[orderId];

    if (!items) throw new Error('Order not found');

    const itemsArray = Array.isArray(items) ? items : [items];
    const updatedItems = itemsArray.filter((item) => item.name !== itemName);

    await fetch(`/api/users/${userId}/orders/${orderId}`, { method: 'DELETE' });

    if (updatedItems.length > 0) {
      await fetch(`/api/users/${userId}/orders/${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: updatedItems }),
      });
    }

    if (status) status.textContent = 'Item removed!';
    setTimeout(() => loadOrders(), 300);
  } catch (err) {
    console.error('Delete item failed:', err);
    if (status) status.textContent = 'Failed to remove item.';
  }
}
//delete order functaiotnlity
async function deleteOrder(orderId) {
  const status = document.getElementById('orders-status');

  if (!confirm(`Are you sure you want to delete Order ${orderId}?`)) {
    return;
  }

  if (status) status.textContent = 'Deleting order...';

  try {
    const response = await fetch(`/api/users/${userId}/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete order');
    }

    if (status) status.textContent = 'Order deleted successfully!';

    setTimeout(() => loadOrders(), 500);
  } catch (err) {
    console.error('Delete order failed:', err);
    if (status) status.textContent = 'Failed to delete order.';
  }
}

async function loadOrders() {
  const container = document.getElementById('orders');
  const status = document.getElementById('orders-status');

  if (status) status.textContent = 'Loading orders...';

  try {
    const userResponse = await fetch(`/api/users/${userId}`, {
      method: 'POST',
    });
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
      const totalDiv = document.getElementById('order-total');
      if (totalDiv) totalDiv.style.display = 'none';
      return;
    }
    //adds a delete button for each item
    entries.forEach(([orderId, itemData]) => {
      const items = Array.isArray(itemData) ? itemData : [itemData];

      const section = document.createElement('section');

      const headerDiv = document.createElement('div');
      headerDiv.style.display = 'flex';
      headerDiv.style.justifyContent = 'space-between';
      headerDiv.style.alignItems = 'center';
      headerDiv.style.marginBottom = '10px';

      const title = document.createElement('h3');
      title.textContent = `Order ${orderId}`;
      title.style.margin = '0';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete Order';
      deleteBtn.className = 'delete-order-btn';
      deleteBtn.dataset.orderId = orderId;
      deleteBtn.style.backgroundColor = '#dc3545';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = 'none';
      deleteBtn.style.padding = '5px 10px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.borderRadius = '4px';
      deleteBtn.addEventListener('click', () => deleteOrder(orderId));

      headerDiv.appendChild(title);
      headerDiv.appendChild(deleteBtn);
      section.appendChild(headerDiv);

      const list = document.createElement('ul');
      items.forEach((item) => {
        const li = document.createElement('li');
        li.style.marginBottom = '6px';
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';

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

        const deleteItemBtn = document.createElement('button');
        deleteItemBtn.textContent = 'X';
        deleteItemBtn.className = 'delete-item-btn';
        deleteItemBtn.style.backgroundColor = '#dc3545';
        deleteItemBtn.style.color = 'white';
        deleteItemBtn.style.border = 'none';
        deleteItemBtn.style.width = '20px';
        deleteItemBtn.style.height = '20px';
        deleteItemBtn.style.borderRadius = '3px';
        deleteItemBtn.style.cursor = 'pointer';
        deleteItemBtn.style.fontSize = '12px';
        deleteItemBtn.style.lineHeight = '1';
        deleteItemBtn.style.padding = '0';
        deleteItemBtn.style.display = 'flex';
        deleteItemBtn.style.alignItems = 'center';
        deleteItemBtn.style.justifyContent = 'center';
        deleteItemBtn.addEventListener('click', () =>
          deleteItem(orderId, item.name)
        );

        li.appendChild(label);
        li.appendChild(input);
        li.appendChild(deleteItemBtn);
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
    const receiptResponse = await fetch(
      `/api/users/${userId}/receipts/${receiptId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receipt: items }),
      }
    );

    if (!receiptResponse.ok) {
      throw new Error('Failed to save receipt');
    }

    const orderIds = new Set();
    inputs.forEach((input) => {
      orderIds.add(input.dataset.orderId);
    });

    for (const orderId of orderIds) {
      await fetch(`/api/users/${userId}/orders/${orderId}`, {
        method: 'DELETE',
      });
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
