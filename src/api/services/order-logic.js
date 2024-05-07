// Import the necessary modules
import {updateOrderStatus} from '../models/order-model.js';

// Function to start the timer for order pickup
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
      // Update the order status to indicate order completion
      console.log(`Order ${orderId} completed`);
      updateOrderStatus(orderId, 2); // Assuming 2 represents the "completed" status
    }, completionTime);
  }, pickupTime);
}

// Helper function to generate a random time within a given range
function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
const orderId = '21';
console.log(`Starting order timer for order ${orderId}`);
startOrderTimer(orderId);
