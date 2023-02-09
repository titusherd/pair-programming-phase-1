'use strict';
const bcryptjs = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
      User.hasOne(models.Laundry)
      User.belongsToMany(models.Laundry, {
        through: "Order"
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email cannot be empty" },
        notEmpty: { msg: "Email cannot be empty" },
        isEmail: { msg: "Not a valid email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be empty" },
        notEmpty: { msg: "Password cannot be empty" },
        minimumPassLength(value) {
          if (value.length < 4) {
            throw new Error('Password atleast 4 characters')
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Role cannot be empty" },
        notEmpty: { msg: "Role cannot be empty" },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, option) {
        const salt = bcryptjs.genSaltSync(10)
        const hash = hashsync(instance.password, salt)
        instance.password = hash
      }
    }
  });

  return User;
};