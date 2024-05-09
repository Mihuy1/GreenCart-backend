import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import app from '../../app.js'; // Import your Express app instance
import {postLogin, register, getMe} from '../controllers/auth-controller';
import {
  getCustomerByName,
  getCustomerByEmail,
  addCustomer,
} from '../models/customer-model';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/customer-model');

describe('Auth Controller', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    bcrypt.compareSync.mockReturnValue(true);
    jwt.sign.mockReturnValue('fakeToken');
    getCustomerByName.mockResolvedValue(null);
    getCustomerByEmail.mockResolvedValue(null);
    addCustomer.mockResolvedValue({customer_id: 1});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('postLogin', async () => {
    getCustomerByName.mockResolvedValue({password: 'hashedPassword'});
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({name: 'test', password: 'password'});
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      customer: expect.any(Object),
      token: 'fakeToken',
    });
  });

  test('register', async () => {
    const response = await request(server)
      .post('/api/v1/auth/register')
      .send({name: 'test', email: 'test@test.com', password: 'password'});
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: 'New customer registered.',
      result: {customer_id: 1},
    });
  });
});
