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
  const userObject = new User(initialUsers[0]);
  await userObject.save();
});

test('contacts are successfully saved with the right owner', async () => {
  let userResponse = await api.get('/api/users');
  let user = userResponse.body[0];
  for (const contact of initialContacts) {
    const contactObject = new Contact({...contact, ownerID: user.id});
    const newContact = await contactObject.save();
    await User.updateOne({_id: user.id}, {$push: {contacts: newContact._id}});
  }
  userResponse = await api.get('/api/users');
  user = userResponse.body[0];
  expect(user.contacts).toHaveLength(2);
});

test('same user cannot save same contact twice', async () => {
  const userResponse = await api.get('/api/users');
  const user = userResponse.body[0];
  const contact1a = initialContacts[0];
  const contactObject = new Contact({...contact1a, ownerID: user.id});
  const newContact = await contactObject.save();
  await User.updateOne({_id: user.id}, {$push: {contacts: newContact._id}});

  const contact1b = {...contact1a, userId: user.id};
  await api
      .post('/api/contacts')
      .send(contact1b)
      .expect(400);
});

test('2 different users can save the same contact', async () => {
  const userObject = new User(initialUsers[1]);
  await userObject.save();
  const userResponse = await api.get('/api/users');
  const user1 = userResponse.body[0];
  const user2 = userResponse.body[1];
  const contact = initialContacts[0];
  const contactObject = new Contact({...contact, ownerID: user1.id});
  const newContact = await contactObject.save();
  await User.updateOne({_id: user1.id}, {$push: {contacts: newContact._id}});

  const contact1b = {...contact, userId: user2.id};
  await api
      .post('/api/contacts')
      .send(contact1b)
      .expect(201);
});

afterAll(async () => {
  await mongoose.connection.close();
});
