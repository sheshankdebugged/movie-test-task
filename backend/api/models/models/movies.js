
module.exports = function (sequelize, DataTypes) {
    const movies = sequelize.define('movies', {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [1, 100], // Adjust the range as needed
        }
      },
      movie_title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [1, 50], // Adjust the range as needed
        }
      },
      publish_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        validate: {
          len: [1, 50], // Adjust the range as needed
        }
      },
      movie_link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {
          len: [1, 500], // Adjust the range as needed
        }
      }
     
    }, {
      tableName: 'movies',
    });
  
    movies.prototype.toJSON = function () {
      const values = Object.assign({}, this.get());
      // delete values.password;
      return values;
    };
    return movies;
  };
  