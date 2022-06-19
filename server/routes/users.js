const express = require('express');
const router = express.Router();
const users_service = require('../services/users');


router.get('/', function(req, res, next) {
  try {
    res.json(users_service.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});


router.post('/', function(req, res, next) {
  try {
    res.json(users_service.create(req.body));
  } catch(err) {
    console.error(`Error while adding user `, err.message);
    next(err);
  }
});

router.post('/login', function(req, res, next) {
  try {
    res.json(users_service.login(req.body));
  } catch(err) {
    console.error(`Error while adding user `, err.message);
    next(err);
  }
});

module.exports = router;