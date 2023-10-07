/* eslint-disable max-len */
const Contact = require('../models/Contact');

exports.contactList = async function(req, res) {
  const contacts = await Contact.find();
  return res.json(contacts);
};

exports.contactDetail = async function(req, res, next) {
  const contact = await Contact.findById(req.params.id);
  if (contact) return res.json(contact);
  return response.status(404).end();
};

exports.contactCreate = async function(req, res) {
  const contact = await Contact.findOne({
    $or: [
      {phone_number: req.body.phone_number},
      {email: req.body.email},
    ],
  });
  if (contact) {
    return res.status(400).json({
      error: 'Phone number and/or email already exists',
    });
  }
  const newContact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    city: req.body.city,
    province: req.body.province,
    groups: req.body.groups,
    phone_number: req.body.phone_number,
  });

  const newSavedContact = await newContact.save();

  return res.status(201).json(newSavedContact);
};

exports.contactDelete = async function(req, res) {
  await Contact.findByIdAndRemove(req.params.id);
  return res.status(200).json({message: 'Contact deleted successfully.'});
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
