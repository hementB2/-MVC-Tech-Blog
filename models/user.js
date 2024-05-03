console.log("Sequelize version:", require('sequelize').version);
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcryptjs = require('bcryptjs');

class User extends Model {
  // Method to compare entered password with the hashed password
  checkPassword(loginPw) {
    return bcryptjs.compareSync(loginPw, this.password);
  }
}

// Initialize the User model
User.init(
  {
    // Define the model attributes
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    // Define hooks to hash the password before creating and updating a user
    hooks: {
      async beforeCreate(newUser) {
        newUser.password = await bcryptjs.hash(newUser.password, 10);
        return newUser;
      },
      async beforeUpdate(updatedUser) {
        updatedUser.password = await bcryptjs.hash(updatedUser.password, 10);
        return updatedUser;
      },
    },
    // Set up Sequelize connection and configuration
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
