import {updateOrderStatus} from '../models/order-model.js';

function startOrderTimer(orderId) {
  const pickupTime = getRandomTime(10000, 60000); // Randomize pickup time between 10s - 1m
  console.log(`Order pickup timer set for ${pickupTime / 1000} seconds`);

  setTimeout(() => {
    // Update the order status to indicate pickup by a delivery guy
    console.log(`Order ${orderId} picked up by delivery person`);
    updateOrderStatus(orderId, 1); // Assuming 1 represents the "picked up" status

    // Start the timer for order completion
    const completionTime = getRandomTime(10000, 60000);
    console.log(
      `Order completion timer set for ${completionTime / 1000} seconds`
    );
    setTimeout(() => {
      console.log(`Order ${orderId} completed`);
      updateOrderStatus(orderId, 2); // Assuming 2 represents the "completed" status
    }, completionTime);
  }, pickupTime);
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {startOrderTimer};
