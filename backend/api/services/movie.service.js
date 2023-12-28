const Models = require('../models');
const Movie = Models.movies;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const movieService = () => {

  const addMovie = async (data) => {
    return await Movie.create(data);
  };

  const deletedUser = async (id) => {
    return await users.destroy({
      where: {
        id: id,
      },
    })
  }

  const updatedMovie = async (id, payload) => {
    return await Movie.update(payload, { where: { id: id } })
  }

  const getMovies = async (limit = 10, offset) => {
    try {
      const movieCount = await Movie.count();
      let offSet;
      if(offset==NaN){
          offSet = 0
      }else{
        offSet=offset
      }
      const movies = await Movie.findAll({
        limit: limit,
        offset: offSet,
        order: [
          ['createdAt', 'DESC'] // Sort by createdAt in descending order
        ]
      });

      return {movies,movieCount};
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };
  const getMovie = async (id) => {
    return await Movie.findOne({
      where: {
        id: id
      }
    })
  }

  return {
    addMovie,
    deletedUser,
    getMovies,
    getMovie,
    updatedMovie
  };
}
module.exports = movieService;
