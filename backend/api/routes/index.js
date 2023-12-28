

module.exports = function (app,validator) {

 
    require('./adminRoutes')(app,validator)
    require('./movieRoutes')(app,validator)

}