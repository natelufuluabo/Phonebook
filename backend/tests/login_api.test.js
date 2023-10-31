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
    'username': 'castello',
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

test('user can login successfully with the right credentials', async () => {
  const body = {
    'username': 'aircongo',
    'password': 'Congo1960!!',
  };
  await api
      .post('/api/login')
      .send(body)
      .expect(200);
});

test('user cannot login successfully with the wrong credentials', async () => {
  const body = {
    'username': 'aircongo',
    'password': 'Congo196!!',
  };
  await api
      .post('/api/login')
      .send(body)
      .expect(401);
});

afterAll(async () => {
  await mongoose.connection.close();
});
