import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

// Function to add a product
const addProduct = async (productData) => {
  try {
    const form = new FormData();
    form.append('name', productData.name);
    form.append('description', productData.description);
    form.append('price', productData.price);
    form.append('categoryId', productData.categoryId); // Assuming you have category IDs

    // Constructing file path for the image
    const imagePath = `./images/${productData.file.toLowerCase()}`;

    console.log(`Checking image file path: ${imagePath}`);

    // Check if the image file exists
    if (fs.existsSync(imagePath)) {
      form.append('file', fs.createReadStream(imagePath));
    } else {
      console.log(`Image file not found for product: ${productData.name}`);
      return;
    }

    // Send POST request to the API endpoint
    const response = await axios.post(
      'http://localhost:3000/api/v1/products',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: 'Bearer <your_token>',
        },
      }
    );

    console.log(`Product added successfully: ${response.data}`);
  } catch (error) {
    console.error(`Error adding product: ${error.message}`);
  }
};

const meats = [
  {
    name: 'Jauheliha',
    description: 'Ground beef',
    price: 5.99,
    categoryId: 1, // Use categoryId instead of category
    file: 'jauheliha.png',
  },
  {
    name: 'Kana',
    description: 'Chicken',
    price: 7.99,
    categoryId: 1, // Use categoryId instead of category
    file: 'kana.jpg', // Use file instead of picture
  },
  {
    name: 'Kala',
    description: 'Fish',
    price: 15.3,
    categoryId: 1, // Use categoryId instead of category
    file: 'kala.png', // Use file instead of picture
  },
];

// Define your categories with IDs
const categories = {
  meats: 1,
  frozenFoods: 2,
  hotDrinks: 3,
  fruits: 4,
  vegetables: 5,
  cheeses: 6,
  dairyProducts: 7,
  sweetProducts: 8,
  saltyProducts: 9,
};

// Array of all products
const allProducts = [...meats];

// Loop through each product and add them
allProducts.forEach((product) => {
  // Determine the category ID for the product
  const category = Object.keys(categories).find((key) =>
    eval(key).some((item) => item.name === product.name)
  );
  if (category) {
    product.categoryId = categories[category];
    addProduct(product);
  } else {
    console.log(`Category not found for product: ${product.name}`);
  }
});
