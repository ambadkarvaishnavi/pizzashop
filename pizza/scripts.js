document.getElementById('pizza-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pizza = {
      id: new Date().getTime(),
      type: formData.get('type'),
      size: formData.get('size'),
      base: formData.get('base'),
      stage: 'placed',
      timeSpent: {
        placed: 0,
        making: 0,
        ready: 0,
      },
      remainingTime: pizzaTimes[formData.get('size')],
    };
    addOrder(pizza);
    e.target.reset();
  });
  
  const orders = document.getElementById('orders');
  const pizzaTimes = {
    small: 180000,
    medium: 240000,
    large: 300000,
  };
  
  function addOrder(pizza) {
    if (document.querySelectorAll('.order').length < 10) {
      const order = createOrder(pizza);
      orders.appendChild(order);
      updateOrders();
    } else {
      alert('Not taking any order for now');
    }
  }
  
  function createOrder(pizza) {
    const order = document.createElement('div');
    order.className = 'order';
    order.innerHTML = `
    <div class="order-header">
    <span class="order-id">Order ID: ${pizza.id}</span>
    <span class="stage ${pizza.stage.toLowerCase()}">${pizza.stage}</span>
  </div>
  <p>Type: ${pizza.type}</p>
  <p>Size: ${pizza.size}</p>
  <p>Base: ${pizza.base}</p>
  <div class="time-spent">
    <p>Time Spent (Placed): ${pizza.timeSpent.placed} ms</p>
    <p>Time Spent (Making): ${pizza.timeSpent.making} ms</p>
    <p>Time Spent (Ready): ${pizza.timeSpent.ready} ms</p>
  </div>
  <p>Remaining Time: ${pizza.remainingTime} ms</p>
  <div class="actions">
    <button class="cancel" onclick="cancelOrder(${pizza.id})">Cancel</button>
  </div>
`;
return order;
}

function updateOrders() {
// Add any additional logic for updating orders if needed
}

function cancelOrder(orderId) {
const orderElement = document.querySelector(`.order-id:contains('${orderId}')`);
if (orderElement) {
  orderElement.closest('.order').remove();
  // Update any additional logic or data after order cancellation
  alert(`Order ${orderId} has been canceled.`);
}
}

// Add any other functions or event handlers as needed