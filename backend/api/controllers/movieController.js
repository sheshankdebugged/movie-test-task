const resModel = require('../lib/resModel')
const movieServices = require('../services/movie.service')
/**
 * @api {post} /backend/api/addmovie  Add Movie
 * @apiName Add movie
 * @apiGroup Movies
 * @apiBody {String} movie_title movie_title
 * @apiBody {Integer} publish_year publish_year
 * @apiBody {String} movie_link movie_link
 * @apiHeader {String} authorization Authorization.
 * @apiDescription User Service...
 * @apiSampleRequest https://test.debugged-pro.com/backend/api/addmovie
 */


module.exports.addMovie = async (req, res) => {
    try {
        const { id } = req?.userInfo;
        const { movie_title, publish_year, movie_link } = req.body;
        console.log(req.body)
        const payload = {
            movie_title: movie_title.toLowerCase(),
            publish_year: parseInt(publish_year),
            movie_link: movie_link.toLowerCase(),
            user_id: id
        }
        const addData = await movieServices().addMovie(payload);
        if (addData) {
            resModel.success = true;
            resModel.message = "Movie added successfully";
            resModel.data = addData;
            res.status(200).json(resModel);
        } else {
            resModel.success = true;
            resModel.message = "Error while Adding Item";
            resModel.data = null;
            res.status(201).json(resModel);
        }
    } catch (error) {
        resModel.success = false;
        resModel.message = error.message;
        resModel.data = null;
        res.status(500).json(resModel);
    }
}

/**
 * @api {put} /backend/api/editmovie/:movieId  Edit Movie
 * @apiName Add movie details
 * @apiGroup Movies
 * @apiBody {String} movie_title movie_title
 * @apiBody {Integer} publish_year publish_year
 * @apiBody {String} movie_link movie_link
 * @apiHeader {String} authorization Authorization.
 * @apiDescription User Service...
 * @apiSampleRequest https://test.debugged-pro.com/backend/api/editmovie/:movieId
 */

module.exports.updateMovie = async (req, res) => {
    try {
        const { id } = req?.userInfo;
        const { movieId } = req?.params;
        const { movie_title, publish_year, movie_link } = req?.body;
        const payload = {
            movie_title: movie_title.toLowerCase(),
            publish_year: publish_year,
            movie_link: movie_link.toLowerCase(),
            user_id: id
        }
        const updateMovie = await movieServices().updatedMovie(movieId, payload);
        if (updateMovie) {
            resModel.success = true;
            resModel.message = "Movie updated successfully";
            resModel.data = updateMovie?.data;
            res.status(200).json(resModel);
        } else {
            resModel.success = true;
            resModel.message = "Error while updating Item";
            resModel.data = null;
            res.status(201).json(resModel);
        }
    } catch (error) {
        resModel.success = false;
        resModel.message = error.message;
        resModel.data = null;
        res.status(500).json(resModel);
    }
}

/**
 * @api {get} /backend/api/getallmovies  Get Movies
 * @apiName get movies details
 * @apiGroup Movies
 * @apiHeader {String} authorization Authorization.
 * @apiDescription User Service...
 * @apiSampleRequest https://test.debugged-pro.com/backend/api/getallmovies
 */


module.exports.getmovies = async (req, res) => {
    try {
        const {limit,page} = req?.query;
        const offset = (page - 1) * limit;
        const getMoviesDetails = await movieServices().getMovies(limit,offset);
        if (getMoviesDetails) {
            resModel.success = true;
            resModel.message = "All Movies fetched successfully";
            resModel.data = getMoviesDetails;
            res.status(200).json(resModel);
        } else {
            resModel.success = true;
            resModel.message = "Error while fteching Movies";
            resModel.data = null;
            res.status(201).json(resModel);
        }
    } catch (error) {
        resModel.success = false;
        resModel.message = error.message;
        resModel.data = null;
        res.status(500).json(resModel);
    }
}

/**
 * @api {get} /backend/api/getmovie/:id  Get Movie by id
 * @apiName get movie by id
 * @apiGroup Movies
 * @apiHeader {String} authorization Authorization.
 * @apiDescription User Service...
 * @apiSampleRequesthttps://test.debugged-pro.com/backend/api/getmovie/:id
 */


module.exports.getmovie = async (req, res) => {
    try {
        const {id} = req.params;
        const getMoviesDetails = await movieServices().getMovie(id);
        if (getMoviesDetails) {
            resModel.success = true;
            resModel.message = "Movies fetched successfully";
            resModel.data = getMoviesDetails;
            res.status(200).json(resModel);
        } else {
            resModel.success = true;
            resModel.message = "Error while fteching Movies";
            resModel.data = null;
            res.status(201).json(resModel);
        }
    } catch (error) {
        resModel.success = false;
        resModel.message = error.message;
        resModel.data = null;
        res.status(500).json(resModel);
    }
}