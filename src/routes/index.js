const express = require('express');
const routerMovie = require('./movie.routes');
const routerActor = require('./actor.routes');
const routerDirector = require('./director.routes');
const routerGenre = require('./genre.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/movies', routerMovie);
router.use('/actors', routerActor);
router.use('/directors', routerDirector);
router.use('/genres', routerGenre);


module.exports = router;