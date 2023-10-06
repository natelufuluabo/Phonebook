/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const {contactList, contactDetail, contactCreate, contactDelete, contactUpdate} = require('../controllers/contactController');

router.get('/contacts', contactList);

router.get('/contacts/:id', contactDetail);

router.post('/contacts', contactCreate);

router.put('/contacts/:id', contactUpdate);

router.delete('/contacts/:id', contactDelete);

module.exports = router;
