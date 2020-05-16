const Sequelize = require('sequelize');
const db = require('../config/database');

//* User Role Schema
const UserRole = db.define('userRole', {
  userRoleName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.NUMBER,
  },
});

//* Register an account
const registerSchema = db.define('users', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },

  gender: {
    type: Sequelize.STRING,
  },

  city: {
    type: Sequelize.STRING,
  },

  phone: {
    type: Sequelize.INTEGER,
  },
  state: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },

  userRoleId: {type: Sequelize.STRING},
});

module.exports = {UserRole, registerSchema};
