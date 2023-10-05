const express = require('express');
const router = express.Router();
const { contact_list, contact_detail, contact_create, contact_delete, contact_update } = require('../controllers/contactController')

router.get('/contacts', contact_list);

router.get('/contacts/:id', contact_detail);

router.post('/contacts', contact_create);

router.put('/contacts/:id', contact_update);

router.delete('/contacts/:id', contact_delete);

module.exports = router;