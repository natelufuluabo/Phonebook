/* eslint-disable max-len */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/User');

const api = supertest(app);

const initialUsers = [
  {
    'username': 'aircongo',
    'name': 'Nathan Lufuluabo',
    'password': 'Congo1960!!',
  },
  {
    'username': 'casello',
    'name': 'Celestin Lufuluabo',
    'password': 'Novembre2012',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  for (const user of initialUsers) {
    const contactObject = new User(user);
    await contactObject.save();
  }
});

test('users are returned as json', async () => {
  await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
});

test('user can be saved in the database', async () => {
  const newUser = {
    'username': 'pico_pico',
    'name': 'Huguesse Assande',
    'password': 'huguesse1',
  };

  await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/users');
  expect(response.body).toHaveLength(3);
});

test('database cannot contain 2 users with the same username', async () => {
  const newUser = {
    'username': 'aircongo',
    'name': 'Nathan Lufuluabo',
    'password': 'Congo1960!!',
  };

  await api
      .post('/api/users')
      .send(newUser)
      .expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});
