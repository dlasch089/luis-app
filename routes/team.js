'use strict';

const express = require('express');

const Team = require('../models/team').Team;
const User = require('../models/user').User;

const router = express.Router();

router.use((req, res, next) => {
  if (req.path.match(/share$/)) {
    next();
    return;
  }
  if (!req.user) {
    res.redirect('/auth/login');
    return;
  }
  next();
});

// -- team(s) homepage

router.get('/', function (req, res, next) {
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

// -- team edit

router.get('/:teamId/edit', function (req, res, next) {
  Team.findOne({_id: req.params.teamId}, (err, team) => {
    if (err) {
      next(err);
      return;
    }

    if (!req.user._id.equals(team.owner)) {
      res.redirect('/team');
      return;
    }

    User.find({_id: { $in: team.members }}, (err, members) => {
      if (err) {
        next(err);
        return;
      }
      const data = {
        team: team,
        members: members,
        message: req.flash('message')
      };
      res.render('team/edit', data);
    });
  });
});

// -- team members

router.post('/:teamId/member', function (req, res, next) {
  if (!req.body.username) {
    req.flash('message', 'Please provide the username');
    res.redirect('/team/' + req.params.teamId + '/edit');
    return;
  }

  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      next(err);
      return;
    }

    // @todo maybe we want to just add the existing user as a member of this team
    if (user) {
      req.flash('message', 'Username is taken');
      res.redirect('/team/' + req.params.teamId + '/edit');
      return;
    }

    const newUser = new User({
      username: req.body.username
    });

    newUser.save((err) => {
      if (err) {
        next(err);
        return;
      }

      const updates = {
        $push: {members: newUser._id}
      };
      Team.update({_id: req.params.teamId}, updates, (err) => {
        if (err) {
          next(err);
          return;
        }

        res.redirect('/team/' + req.params.teamId + '/edit');
      });
    });
  });

  // update the team (push member into the array)

  // redirect to team page
});

module.exports = router;
