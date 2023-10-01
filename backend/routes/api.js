const express = require('express');
const router = express.Router();

let data = [
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@example.com",
        "city": "Halifax",
        "province": "Nova Scotia",
        "groups": [
        "Work",
        "Favorites",
        "Emergency"
        ],
        "phone_number": "+1 (416) 565-1234"
    },
    {
        "id": 2,
        "first_name": "Emily",
        "last_name": "Johnson",
        "email": "emily.johnson@example.com",
        "city": "Vancouver",
        "province": "British Columbia",
        "groups": [
        "Friends",
        "Favorites"
        ],
        "phone_number": "+1 (604) 555-5678"
    },
    {
        "id": 3,
        "first_name": "David",
        "last_name": "Lee",
        "email": "david.lee@example.com",
        "city": "Montreal",
        "province": "Quebec",
        "groups": [
        "Family"
        ],
        "phone_number": "+1 (514) 555-9876"
    },
    {
        "id": 4,
        "first_name": "Sarah",
        "last_name": "Wong",
        "email": "sarah.wong@example.com",
        "city": "Calgary",
        "province": "Alberta",
        "groups": [
        "Friends",
        "Work"
        ],
        "phone_number": "+1 (403) 555-4321"
    },
    {
        "id": 5,
        "first_name": "Michael",
        "last_name": "Chen",
        "email": "michael.chen@example.com",
        "city": "Ottawa",
        "province": "Ontario",
        "groups": [
        "Emergency"
        ],
        "phone_number": "+1 (613) 555-8765"
    },
    {
        "id": 6,
        "first_name": "Linda",
        "last_name": "Davis",
        "email": "linda.davis@example.com",
        "city": "Edmonton",
        "province": "Alberta",
        "groups": [
        "Friends",
        "Favorites"
        ],
        "phone_number": "+1 (780) 555-2345"
    },
    {
        "id": 7,
        "first_name": "James",
        "last_name": "Anderson",
        "email": "james.anderson@example.com",
        "city": "Winnipeg",
        "province": "Manitoba",
        "groups": [
        "Family",
        "Favorites"
        ],
        "phone_number": "+1 (204) 555-6789"
    },
    {
        "id": 8,
        "first_name": "Michelle",
        "last_name": "Garcia",
        "email": "michelle.garcia@example.com",
        "city": "Quebec City",
        "province": "Quebec",
        "groups": [
        "Work"
        ],
        "phone_number": "+1 (418) 555-3456"
    },
    {
        "id": 9,
        "first_name": "Daniel",
        "last_name": "Martinez",
        "email": "daniel.martinez@example.com",
        "city": "Halifax",
        "province": "Nova Scotia",
        "groups": [
        "Family"
        ],
        "phone_number": "+1 (902) 555-7890"
    },
    {
        "id": 10,
        "first_name": "Amanda",
        "last_name": "Wilson",
        "email": "amanda.wilson@example.com",
        "city": "Victoria",
        "province": "British Columbia",
        "groups": [
        "Friends",
        "Favorites"
        ],
        "phone_number": "+1 (250) 555-1234"
    },
    {
        "id": 11,
        "first_name": "Robert",
        "last_name": "Taylor",
        "email": "robert.taylor@example.com",
        "city": "Saskatoon",
        "province": "Saskatchewan",
        "groups": [
        "Work"
        ],
        "phone_number": "+1 (306) 555-5678"
    },
    {
        "id": 12,
        "first_name": "Jennifer",
        "last_name": "Moore",
        "email": "jennifer.moore@example.com",
        "city": "Regina",
        "province": "Saskatchewan",
        "groups": [
        "Friends",
        "Emergency"
        ],
        "phone_number": "+1 (306) 555-9876"
    },
    {
        "id": 13,
        "first_name": "William",
        "last_name": "Brown",
        "email": "william.brown@example.com",
        "city": "London",
        "province": "Ontario",
        "groups": [
        "Family"
        ],
        "phone_number": "+1 (519) 555-4321"
    },
    {
        "id": 14,
        "first_name": "Elizabeth",
        "last_name": "Harris",
        "email": "elizabeth.harris@example.com",
        "city": "Hamilton",
        "province": "Ontario",
        "groups": [
        "Favorites"
        ],
        "phone_number": "+1 (905) 555-8765"
    },
    {
        "id": 15,
        "first_name": "Richard",
        "last_name": "Clark",
        "email": "richard.clark@example.com",
        "city": "Windsor",
        "province": "Ontario",
        "groups": [
        "Family"
        ],
        "phone_number": "+1 (519) 555-2345"
    },
    {
        "id": 16,
        "first_name": "Karen",
        "last_name": "Young",
        "email": "karen.young@example.com",
        "city": "Calgary",
        "province": "Alberta",
        "groups": [
        "Friends"
        ],
        "phone_number": "+1 (403) 555-6789"
    },
    {
        "id": 17,
        "first_name": "Thomas",
        "last_name": "Lewis",
        "email": "thomas.lewis@example.com",
        "city": "Ottawa",
        "province": "Ontario",
        "groups": [
        "Work"
        ],
        "phone_number": "+1 (613) 555-3456"
    },
    {
        "id": 18,
        "first_name": "Patricia",
        "last_name": "Martin",
        "email": "patricia.martin@example.com",
        "city": "Montreal",
        "province": "Quebec",
        "groups": [
        "Family",
        "Favorites"
        ],
        "phone_number": "+1 (514) 555-7890"
    },
    {
        "id": 19,
        "first_name": "Charles",
        "last_name": "Young",
        "email": "charles.young@example.com",
        "city": "Vancouver",
        "province": "British Columbia",
        "groups": [
        "Friends"
        ],
        "phone_number": "+1 (604) 555-1234"
    },
    {
        "id": 20,
        "first_name": "Sandra",
        "last_name": "Hall",
        "email": "sandra.hall@example.com",
        "city": "Toronto",
        "province": "Ontario",
        "groups": [
        "Work"
        ],
        "phone_number": "+1 (416) 555-5678"
    },
    {
        "id": 21,
        "first_name": "Mark",
        "last_name": "Garcia",
        "email": "mark.garcia@example.com",
        "city": "Calgary",
        "province": "Alberta",
        "groups": [
        "Emergency"
        ],
        "phone_number": "+1 (403) 555-9876"
    },
    {
        "first_name": "Nathan ",
        "last_name": "Lufuluabo",
        "email": "natelufuluabo@yahoo.ca",
        "city": "Montreal",
        "province": "Quebec",
        "groups": [
        "Family",
        "Friends"
        ],
        "phone_number": "5149956394",
        "id": 22
    },
    {
        "first_name": "Celestin",
        "last_name": "Lufuluabo",
        "email": "natelufuluabo@gmail.com",
        "city": "Montréal",
        "province": "Quebec",
        "groups": [],
        "phone_number": "5148046394",
        "id": 23
    }
]

router.get('/contacts', function(req, res, next) {
  res.json(data);
});

router.get('/contacts/:id', function(req, res, next) {
  const id = Number(req.params.id);
  const person = data.find(person => person.id === id);
  if (person) return res.status(200).json(person);
  return res.status(404).send("Error 404: Not Found");
});

router.delete('/contacts/:id', function(req, res, next) {
  const id = Number(req.params.id);
  data = data.filter(person => person.id !== id);
  res.json(data);
});

router.post('/contacts', function(req, res, next) {
  const body = req.body;
  if (!body.email || !body.phone_number) {
    return res.status(400).json({
      error: "Email and/or phone number is required"
    });
  }
  if (data.find(person => person.phone_number === body.phone_number)) {
    return res.status(400).json({
      error: "Phone number must be unique"
    });
  }
  const newData = { "id": Math.floor(Math.random() * 100) + 1, ...body }
  data.push(newData);
  res.json(newData);
});

router.put('/contacts/:id', function(req, res, next) {
    const id = Number(req.params.id);
    const body = req.body;
    data = data.map((contact) => contact.id !== id ? contact : body);
    res.json(body);
});

module.exports = router;