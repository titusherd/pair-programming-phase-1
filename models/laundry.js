'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laundry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Laundry.belongsToMany(models.User, {
        through: models.Order,
        as: "Customers"
      });
      Laundry.belongsTo(models.User, {
        foreignKey: "UserId",
        as: "Manager"
      })
    }
  }
  Laundry.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Laundry',
  });
  return Laundry;
};
