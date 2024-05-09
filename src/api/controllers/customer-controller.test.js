import request from 'supertest';
import app from '../../app.js'; // Import your Express app instance
import {
  listAllcustomers,
  findCustomerById,
  modifyCustomer,
  removeCustomer,
  addCustomer,
} from '../models/customer-model.js';

// Mock the functions from customer-model.js
jest.mock('../models/customer-model.js');

describe('Customer Controller', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /customers', () => {
    it('should respond with a list of all customers', async () => {
      // Mock the data returned by listAllcustomers function
      const mockCustomers = [{name: 'John', email: 'john@example.com'}];
      listAllcustomers.mockResolvedValue(mockCustomers);

      const response = await request(server).get('/api/v1/customers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomers);
    });
  });

  describe('GET /customers/:id', () => {
    it('should respond with the customer data for the provided ID', async () => {
      const mockCustomer = {name: 'John', email: 'john@example.com'};
      findCustomerById.mockResolvedValue(mockCustomer);

      const response = await request(server).get('/api/v1/customers/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCustomer);
    });
  });

  describe('POST /customers', () => {
    it('should add a new customer and respond with status 201', async () => {
      const newCustomer = {
        name: 'Alice',
        email: 'alice@example.com',
        password: 'password',
      };
      const mockResult = {customer_id: 1};
      addCustomer.mockResolvedValue(mockResult);

      const response = await request(server)
        .post('/api/v1/customers')
        .send(newCustomer);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: 'New customer added.',
        result: mockResult,
      });
    });
  });
});
