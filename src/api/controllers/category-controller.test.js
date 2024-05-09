import request from 'supertest';
import app from '../../app.js'; // Import your Express app instance
import {
  listAllCategories,
  findCategoryById,
  addCategory,
  modifyCategory,
  removeCategory,
} from '../models/category-model.js';

import jwt from 'jsonwebtoken';

// Mock the functions from category-model.js
jest.mock('../models/category-model.js');

// Function to verify JWT tokens
async function jwtVerify(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

describe('Category Controller', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Mock JWT tokens for testing purposes
  const mockToken = jwt.sign({id: 'user_id', role: 'admin'}, 'mock_secret');
  console.log('mockToken', mockToken);

  test('getCategory', async () => {
    // Mocking JWT token verification
    const decodedToken = await jwtVerify(mockToken, 'mock_secret');
    const mockCategories = [{name: 'Category1'}, {name: 'Category2'}];
    listAllCategories.mockResolvedValue(mockCategories);
    const response = await request(server)
      .get('/api/v1/categories')
      .set('Authorization', `Bearer ${mockToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
  });

  test('getCategoryById', async () => {
    // Mocking JWT token verification
    const decodedToken = await jwtVerify(mockToken, 'mock_secret');
    const mockCategory = {name: 'Category1'};
    findCategoryById.mockResolvedValue(mockCategory);
    const response = await request(server)
      .get('/api/v1/categories/1')
      .set('Authorization', `Bearer ${mockToken}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });
});
