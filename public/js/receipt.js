async function loadReceipt() {
  const container = document.getElementById('receipt');
  const status = document.getElementById('receipt-status');

  // support guest being the only user registered before connecting to database
  const userId = 'guest';

  if (status) status.textContent = 'Loading receipt...';

  try {
    const userResponse = await fetch(`/api/users/${userId}`, {
      method: 'POST',
    });
    if (!userResponse.ok) {
      throw new Error('Failed to create user');
    }

    const response = await fetch(`/api/users/${userId}/receipts`);
    if (!response.ok) {
      throw new Error('Failed to load orders');
    }

    const orders = await response.json();
    const entries = Object.entries(orders);

    if (!container) return;
    container.innerHTML = '';

    if (entries.length === 0) {
      if (status) status.textContent = 'No orders to show.';
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';

    let grandTotal = 0;

    entries.forEach(([orderId, items]) => {
      const section = document.createElement('section');
      const title = document.createElement('h3');
      title.textContent = `Order ${orderId}`;
      section.appendChild(title);

      const list = document.createElement('ul');
      let orderTotal = 0;

      items.forEach((item) => {
        const lineTotal = item.price * item.quantity;
        orderTotal += lineTotal;
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} — $${lineTotal.toFixed(2)}`;
        list.appendChild(li);
      });

      grandTotal += orderTotal;

      const subtotal = document.createElement('li');
      subtotal.textContent = `Subtotal: $${orderTotal.toFixed(2)}`;
      subtotal.style.fontWeight = 'bold';
      subtotal.style.marginTop = '4px';
      list.appendChild(subtotal);

      section.appendChild(list);
      container.appendChild(section);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'receipt-total';
    totalDiv.textContent = `Grand Total: $${grandTotal.toFixed(2)}`;
    container.appendChild(totalDiv);

    if (status) status.textContent = '';
  } catch (err) {
    console.error('Load receipt failed:', err);
    if (status) status.textContent = 'Unable to load receipt.';
  }
}

loadReceipt();

const backButton = document.getElementById('back-to-menu');
if (backButton) {
  backButton.addEventListener('click', () => {
    window.location.href = '/menu';
  });
}

const viewOrdersButton = document.getElementById('view-orders');
if (viewOrdersButton) {
  viewOrdersButton.addEventListener('click', () => {
    window.location.href = '/orders';
  });
}
