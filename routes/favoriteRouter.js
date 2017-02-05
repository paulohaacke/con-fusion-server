var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Favorites.findOne({ postedBy: req.decoded._id })
            .populate('postedBy')
            .populate('dishes')
            .exec(function(err, favorites) {
                if (err) return next(err);
                res.json(favorites)
            })
    })
    .post(Verify.verifyOrdinaryUser, function(req, res, next) {
        Favorites.findOneAndUpdate({
            postedBy: req.decoded._id
        }, {
            $addToSet: { dishes: req.body._id }
        }, {
            upsert: true,
            new: true
        }, function(err, favorites) {
            if (err) return next(err);
            res.json(favorites);
        });
    })
    .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
        Favorites.findOneAndRemove({
            postedBy: req.decoded._id
        }, function(err, favorites) {
            if (err) return next(err);
            res.json(favorites);
        });
    })

favoriteRouter.route('/:dishObjectId')
    .delete(Verify.verifyOrdinaryUser, function(req, res, next) {
        Favorites.findOneAndUpdate({
            postedBy: req.decoded._id
        }, {
            $pull: { dishes: req.params.dishObjectId }
        }, {
            new: true
        }, function(err, favorites) {
            if (err) return next(err);
            res.json(favorites);
        });
    })

module.exports = favoriteRouter;