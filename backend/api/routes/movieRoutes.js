var movieCntrl = require('../controllers/movieController')
var auth = require('../middleware/auth')
module.exports = function(app,validator){
    app.post('/backend/api/addmovie',auth,movieCntrl.addMovie);
    app.put('/backend/api/editmovie/:movieId',auth,movieCntrl.updateMovie);
    app.get('/backend/api/getallmovies',auth,movieCntrl.getmovies);
    app.get('/backend/api/getmovie/:id',auth,movieCntrl.getmovie);
}
