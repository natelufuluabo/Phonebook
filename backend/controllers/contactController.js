const Contact = require('../models/Contact');

exports.contact_list = function(req, res) {
    Contact.find()
        .exec(function(err, list_contacts) {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while fetching contacts list.' });
            }

            return res.json(list_contacts);
        });
}

exports.contact_detail = function(req, res) {
    Contact.findById(req.params.id)
        .exec(function(err, detail_contact) {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while fetching contact detail.' });
            }

            return res.json(detail_contact);
        });
}

exports.contact_create = function(req, res) {
    Contact.findOne({
        $or: [
            { phone_number: req.body.phone_number },
            { email: req.body.email }
        ]
    })
        .exec(function (err, contact) {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while fetching the contact.' });
            }
            
            if (contact) {
                return res.status(400).json({
                    error: "Phone number and/or email already exists"
                });
            }
            const newContact = new Contact({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                city: req.body.city,
                province: req.body.province,
                groups: req.body.groups,
                phone_number: req.body.phone_number
            });
            newContact.save()
                .then(result => {
                    return res.json(result)
                })
                .catch(error => {
                    return res.status(500).json({ error: 'An error occurred while saving contact detail.' });
                });
        });
}   

exports.contact_delete = function(req, res) {
    Contact.findByIdAndRemove(req.params.id)
        .exec(function(err, deletedContact) {
            if (err) {
                return res.status(500).json({ error: 'An error occurred while deleting the contact.' });
            }

            if (!deletedContact) {
                return res.status(404).json({ error: 'Contact not found.' });
            }

            res.status(200).json({ message: 'Contact deleted successfully.' });
        });

}

exports.contact_update = function(req, res) {
    const contact = new Contact({
        _id: req.params.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        city: req.body.city,
        province: req.body.province,
        groups: req.body.groups,
        phone_number: req.body.phone_number
    });

    Contact.findByIdAndUpdate(req.params.id, contact, { new: true }, (err, contactUpdated) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating the contact.' });
        }

        if (!contactUpdated) {
            return res.status(404).json({ error: 'Contact not found.' });
        }
        
        return res.status(200).json(contactUpdated);
    });
}