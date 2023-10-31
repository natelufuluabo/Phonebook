/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const {SECRET} = require('../utils/config');
const Contact = require('../models/Contact');
const User = require('../models/User');

exports.contactList = async function(req, res) {
  const contacts = await Contact.find({});
  return res.json(contacts);
};

exports.contactDetail = async function(req, res, next) {
  const contact = await Contact.findById(req.params.id);
  if (contact) return res.json(contact);
  return response.status(404).end();
};

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

exports.contactCreate = async function(req, res) {
  const body = req.body;
  const decodedToken = jwt.verify(getTokenFrom(req), SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'});
  }
  const user = await User.findById(decodedToken.id).populate('contacts', {email: 1, phone_number: 1});
  const contactExists = user.contacts.find((contact) => contact.email === body.email || contact.phone_number === body.phone_number);
  if (contactExists) {
    return res.status(400).json({message: 'Contact exists already'});
  }
  const newContact = new Contact({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    city: body.city,
    province: body.province,
    groups: body.groups,
    phone_number: body.phone_number,
    ownerID: user.id,
  });

  const newSavedContact = await newContact.save();

  user.contacts = user.contacts.concat(newSavedContact._id);
  await user.save();

  return res.status(201).json(newSavedContact);
};

exports.contactDelete = async function(req, res) {
  await Contact.findByIdAndRemove(req.params.id);
  return res.status(204).json({message: 'Contact deleted successfully.'});
};

exports.contactUpdate = async function(req, res, next) {
  const contact = {
    _id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    city: req.body.city,
    province: req.body.province,
    groups: req.body.groups,
    phone_number: req.body.phone_number,
  };
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, contact, {new: true});
  if (!updatedContact) {
    return res.status(404).json({error: 'Contact not found.'});
  }
  return res.status(200).json(updatedContact);
};
