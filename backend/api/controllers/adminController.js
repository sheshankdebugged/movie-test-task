const becryptService = require('../services/bcrypt.services')
const jwtService = require('../services/jwt.services')
const resModel = require('../lib/resModel')
const userServices = require('../services/user.service')

/**
 * @api {post} /backend/api/signin Signin User
 * @apiName Signin user
 * @apiGroup Authentication
 * @apiBody {String} email User Email.
 * @apiBody {String} password Password.
 * @apiDescription User Service...
 * @apiSampleRequest https://test.debugged-pro.com/backend/api/signin
*/
module.exports.signInAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emails = email.toLowerCase()
        let userCheck = await userServices().getUserByEmail(emails);
        if (userCheck) {
            let hashPwd = userCheck.password
            let passwordHash = await becryptService.comparePassword(password, hashPwd);
            userCheck.password = null;
            if (passwordHash) {
                let accessToken = await jwtService.issueJwtToken({ id:userCheck.id,email, first_name: userCheck.first_name, role_id: userCheck.role_id });
                resModel.success = true;
                resModel.message = "User Login Successfully";
                resModel.data = { "token": accessToken, userCheck }
                res.status(200).json(resModel);
            } else {
                resModel.success = false;
                resModel.message = "Invalid Credentials";
                resModel.data = {}
                res.status(400).json(resModel);
            }
        } else {
            resModel.success = false;
            resModel.message = "Please login with admin credentials";
            resModel.data = null;
            res.status(400).json(resModel);
        }
    } catch (error) {
        resModel.success = false;
        resModel.message = error.message;
        resModel.data = null;
        res.status(500).json(resModel);

    }
}
