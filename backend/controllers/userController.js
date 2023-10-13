const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.userCreate = async function(req, res) {
  const {username, name, password} = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
};
