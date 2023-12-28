const Models = require('../models');
const users = Models.users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const userService = () => {


  const getUserByEmail = async (email) => {
    return await users.findOne({ where: { email: email } })
  };

  const addUser = async (data) => {
    return await users.create(data);
  };

  const deletedUser = async (id) => {
    return await users.destroy({
      where: {
        id: id,
      },
    })
  }

  const updatedUser = async (id)=>{
   return await users.findOne({where:{id:id}})
  }

  const allUsers = async (data) => {
    return await users.findAll()
  }

  const getuserbyid = async(id)=>{
    return await users.findOne({
      where:{
        id:id
      }
    })
  }

  return {
    getUserByEmail,
    addUser,
    deletedUser,
    allUsers,
    getuserbyid,
    updatedUser
  };
}
module.exports = userService;
