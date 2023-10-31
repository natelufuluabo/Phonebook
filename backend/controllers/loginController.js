const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const {SECRET} = require('../utils/config');

exports.loginUser = async function(request, response) {
  const {username, password} = request.body;

  const user = await User.findOne({username});

  const passwordCorrect = user === null ?
    false :
  await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, SECRET, {expiresIn: 60*60});

  response
      .status(200)
      .json({token, username: user.username, name: user.name});
};
