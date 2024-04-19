# GreenCart-backend

## API Usage Guide

### Customers

- **GET** `/customers`: Retrieves a list of all customers. Use the [`getCustomers`](src/api/controllers/customer-controller.js) function.
- **GET** `/customers/:id`: Retrieves a specific customer by ID. Use the [`getCustomerById`](src/api/controllers/customer-controller.js) function.
- **POST** `/customers`: Adds a new customer. This route is protected and requires admin access. Use the [`postCustomer`](src/api/controllers/customer-controller.js) function.
- **PUT** `/customers/:id`: Updates a specific customer by ID. This route is protected and requires admin access. Use the [`putCustomer`](src/api/controllers/customer-controller.js) function.
- **DELETE** `/customers/:id`: Deletes a specific customer by ID. This route is protected and requires admin access. Use the [`deleteCustomer`](src/api/controllers/customer-controller.js) function.

### Authentication

- **POST** `/auth/login`: Logs in a user. Use the [`login`](src/api/controllers/auth-controller.js) function.
- **POST** `/auth/register`: Registers a new user. Use the [`register`](src/api/controllers/auth-controller.js) function.
- **GET** `/auth/me`: Retrieves the currently logged in user. Use the [`getMe`](src/api/controllers/auth-controller.js) function.

### Products

- **GET** `/products`: Retrieves a list of all products. Use the [`getProduct`](src/api/controllers/product-controller.js) function.
- **GET** `/products/:id`: Retrieves a specific product by ID. Use the [`getProductById`](src/api/controllers/product-controller.js) function.
- **POST** `/products`: Adds a new product. Use the [`postProduct`](src/api/controllers/product-controller.js) function.
- **PUT** `/products/:id`: Updates a specific product by ID. Use the [`putProduct`](src/api/controllers/product-controller.js) function.
- **DELETE** `/products/:id`: Deletes a specific product by ID. Use the [`deleteProduct`](src/api/controllers/product-controller.js) function.

### Categories

- **GET** `/categories`: Retrieves a list of all categories. Use the [`getCategory`](src/api/controllers/category-controller.js) function.
- **GET** `/categories/:id`: Retrieves a specific category by ID. Use the [`getCategoryById`](src/api/controllers/category-controller.js) function.
- **POST** `/categories`: Adds a new category. This route is protected and requires admin access. Use the [`postCategory`](src/api/controllers/category-controller.js) function.
- **PUT** `/categories/:id`: Updates a specific category by ID. This route is protected and requires admin access. Use the [`putCategory`](src/api/controllers/category-controller.js) function.
- **DELETE** `/categories/:id`: Deletes a specific category by ID. This route is protected and requires admin access. Use the [`deleteCategory`](src/api/controllers/category-controller.js) function.

### Shopping Cart

- **GET** `/shoppingcarts`: Retrieves a list of all shopping carts. Use the [`getShoppingCart`](src/api/controllers/shoppingCart-controller.js) function.
- **GET** `/shoppingcarts/:id`: Retrieves a specific shopping cart by ID. Use the [`getShoppingCartById`](src/api/controllers/shoppingCart-controller.js) function.
- **POST** `/shoppingcarts`: Adds a new shopping cart. Use the [`postShoppingCart`](src/api/controllers/shoppingCart-controller.js) function.
- **PUT** `/shoppingcarts/:id`: Updates a specific shopping cart by ID. Use the [`putShoppingCart`](src/api/controllers/shoppingCart-controller.js) function.
- **DELETE** `/shoppingcarts/:id`: Deletes a specific shopping cart by ID. Use the [`deleteShoppingCart`](src/api/controllers/shoppingCart-controller.js) function.

### Reviews

- **GET** `/reviews`: Retrieves a list of all reviews. Use the [`getReview`](src/api/controllers/review-controller.js) function.
- **GET** `/reviews/:id`: Retrieves a specific review by ID. Use the [`getReviewById`](src/api/controllers/review-controller.js) function.
- **POST** `/reviews`: Adds a new review. Use the [`postReview`](src/api/controllers/review-controller.js) function.
- **PUT** `/reviews/:id`: Updates a specific review by ID. Use the [`putReview`](src/api/controllers/review-controller.js) function.
- **DELETE** `/reviews/:id`: Deletes a specific review by ID. Use the [`deleteReview`](src/api/controllers/review-controller.js) function.

Remember to replace `:id` with the actual ID of the resource you want to access.
