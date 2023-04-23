const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const {
  movieValidator, movieIdValidator,
} = require('../validators/validators');

router.get('/movies', getMovies);
router.post('/movies', movieValidator, createMovie);
router.delete('/movies/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
