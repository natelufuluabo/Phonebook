/* eslint-disable max-len */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Contact = require('../models/Contact');

const api = supertest(app);

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
  await Contact.deleteMany({});
  for (const contact of initialContacts) {
    const contactObject = new Contact(contact);
    await contactObject.save();
  }
});

test('contacts are returned as json', async () => {
  await api
      .get('/api/contacts')
      .expect(200)
      .expect('Content-Type', /application\/json/);
});

test('all contacts are returned', async () => {
  const response = await api.get('/api/contacts');

  expect(response.body).toHaveLength(initialContacts.length);
});

test('contact can be added successfully', async () => {
  const newContact = {
    'first_name': 'Huguesse',
    'last_name': 'Assande',
    'email': 'assandehuguesse@gmail.com',
    'city': 'Montréal',
    'province': 'Quebec',
    'groups': ['Family', 'Favorites', 'Emergency'],
    'phone_number': '+1 (438) 868-8442',
  };

  await api
      .post('/api/contacts')
      .send(newContact)
      .expect(201)
      .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/contacts');

  const phoneNumbers = response.body.map((contact) => contact.phone_number);

  expect(response.body).toHaveLength(initialContacts.length + 1);
  expect(phoneNumbers).toContain('+1 (438) 868-8442');
});

test('specific contact is returned', async () => {
  const response = await api.get('/api/contacts');
  const data = response.body[0];

  const result = await api
      .get(`/api/contacts/${data.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

  expect(result.body).toEqual(data);
});

test('invalid id returns no contact', async () => {
  await api
      .get('/api/notes/111111adfrq2123')
      .expect(404);
});

test('delete contact', async () => {
  const response = await api.get('/api/contacts');
  const data = response.body[0];

  await api
      .delete(`/api/contacts/${data.id}`)
      .expect(204);

  const result = await api.get('/api/contacts');
  expect(result.body).toHaveLength(response.body.length - 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
