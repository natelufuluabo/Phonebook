const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.userList = async function(req, res) {
  const users = await User.find({}).populate('contacts');
  return res.status(200).json(users);
};

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

  res.status(201).json(savedUser);
};
