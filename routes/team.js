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
      teams: result,
      message: req.flash('message')
    };
    res.render('team/index', data);
  });
});

router.post('/', function (req, res, next) {
  if (!req.body.name) {
    req.flash('message', 'Please provide a team name');
    res.redirect('/team');
    return;
  }

  const newTeam = new Team({
    name: req.body.name,
    owner: req.user._id
  });

  newTeam.save((err) => {
    if (err) {
      next(err);
    }

    res.redirect('/team/' + newTeam._id + '/edit');
  });
});

module.exports = router;
