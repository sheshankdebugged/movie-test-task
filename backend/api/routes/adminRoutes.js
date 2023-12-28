
const adminCntrl = require('../controllers/adminController')
const adminModel = require('../validate-models/adminModel')

//Admin Routes
module.exports = function (app, validator) {
    app.post('/backend/api/signin',validator.body(adminModel.signinuser),adminCntrl.signInAdmin);
}