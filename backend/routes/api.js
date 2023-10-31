/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require('express');
const router = express.Router();
const {contactList, contactDetail, contactCreate, contactDelete, contactUpdate} = require('../controllers/contactController');
const {userList, userCreate} = require('../controllers/userController');
const {loginUser} = require('../controllers/loginController');

router.get('/contacts', contactList);

router.get('/contacts/:id', contactDetail);

router.post('/contacts', contactCreate);

router.put('/contacts/:id', contactUpdate);

router.delete('/contacts/:id', contactDelete);

router.get('/users', userList);

router.post('/users', userCreate);

router.post('/login', loginUser);

module.exports = router;
