
module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 50], // Adjust the range as needed
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 50], // Adjust the range as needed
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 100], // Adjust the range as needed
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        len: [1, 50], // Adjust the range as needed
      }
    }
   
  }, {
    tableName: 'users',
  });

  users.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    // delete values.password;
    return values;
  };
  return users;
};
