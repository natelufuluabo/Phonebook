/* eslint-disable max-len */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Contact = require('../models/Contact');
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

const initialContacts = [
  {
    'first_name': 'Celestin',
    'last_name': 'Lufuluabo',
    'email': 'celestin.lufuluabo@yahoo.ca',
    'city': 'Montréal',
    'province': 'Quebec',
    'groups': ['Family', 'Favorites', 'Emergency', 'Work'],
    'phone_number': '+1 (438) 878-6394',
  },
  {
    'first_name': 'Nathan',
    'last_name': 'Lufuluabo',
    'email': 'natelufuluabo@yahoo.ca',
    'city': 'Montréal',
    'province': 'Quebec',
    'groups': ['Family', 'Favorites', 'Emergency', 'Work'],
    'phone_number': '+1 (438) 995-6394',
  },
];

beforeEach(async () => {
  await User.deleteMany({});
  await Contact.deleteMany({});
});

test('only logged in user can save new contact', async () => {
  await api.post('/api/users').send(initialUsers[0]);
  const body = {
    'username': 'aircongo',
    'password': 'Congo1960!!',
  };
  const loginResponse = await api.post('/api/login').send(body);

  await api
      .post('/api/contacts')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(initialContacts[0])
      .expect(201);
});

test('contacts are successfully saved with the right owner', async () => {
  const newUser = await api.post('/api/users').send(initialUsers[0]);
  const body = {
    'username': 'aircongo',
    'password': 'Congo1960!!',
  };
  const loginResponse = await api.post('/api/login').send(body);
  const newContact = await api.post('/api/contacts').set('Authorization', `Bearer ${loginResponse.body.token}`).send(initialContacts[0]);
  expect(newContact.ownerID).toBe(newUser.id);
});

test('same user cannot save same contact twice', async () => {
  await api.post('/api/users').send(initialUsers[0]);
  const body = {
    'username': 'aircongo',
    'password': 'Congo1960!!',
  };
  const loginResponse = await api.post('/api/login').send(body);
  await api.post('/api/contacts').set('Authorization', `Bearer ${loginResponse.body.token}`).send(initialContacts[0]);

  await api
      .post('/api/contacts')
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .send(initialContacts[0])
      .expect(400);
});

test('2 different users can save the same contact', async () => {
  await api.post('/api/users').send(initialUsers[0]);
  await api.post('/api/users').send(initialUsers[1]);

  const body1 = {
    'username': 'aircongo',
    'password': 'Congo1960!!',
  };
  const loginResponse1 = await api.post('/api/login').send(body1);
  await api
      .post('/api/contacts')
      .set('Authorization', `Bearer ${loginResponse1.body.token}`)
      .send(initialContacts[0]);

  const body2 = {
    'username': 'castello',
    'password': 'Novembre2012',
  };
  const loginResponse2 = await api.post('/api/login').send(body2);
  await api
      .post('/api/contacts')
      .set('Authorization', `Bearer ${loginResponse2.body.token}`)
      .send(initialContacts[0])
      .expect(201);
});

afterAll(async () => {
  await mongoose.connection.close();
});
