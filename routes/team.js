'use strict';

const express = require('express');

const Team = require('../models/team').Team;

const router = express.Router();

router.get('/', function (req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
    return;
  }
  Team.find({owner: req.user._id}, (err, result) => {
    if (err) {
      next(err);
      return;
    }
    const data = {
      teams: result
    };
    res.render('team/index', data);
  });
});

module.exports = router;
