const db = require('../services/db');

function getMultiple(page = 1) {
  const offset = (page - 1) * 10;
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [offset, 10]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function validateCreate(user) {
  let messages = [];

  console.log(user);

  if (!user) {
    messages.push('No object is provided');
  }

  if (!user.name) {
    messages.push('Name is empty');
  }

  if (!user.password) {
    messages.push('Password is empty');
  }

  if (!user.email) {
    messages.push('Email is empty');
  }
  
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  }
}

function create(userObj) {
  validateCreate(userObj);
  const {name, email, password} = userObj;
  const result = db.run('INSERT INTO user (name, email, password) VALUES (@name, @email, @password)', {name, email, password});
  
  let message = 'Error in creating user';
  if (result.changes) {
    message = 'User created successfully';
  }

  return {message};
}

function login(userObj) {
    const {email, password} = userObj;
    const data = db.query(`SELECT * FROM user WHERE user.email==? and user.password==?`, [email, password]);
    let message = 'Error in search user';
    if (data) {
      message = 'User is found successfully';
    }
  
    return {message, data};
  }

module.exports = {
  getMultiple,
  create,
  login
}