const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const {
  movieValidator, movieIdValidator,
} = require('../validators/validators');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
