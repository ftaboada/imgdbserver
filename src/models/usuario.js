const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const validations = {
    allowNull: false,
    strType: {
      isString(value) {
        if (typeof value !== "string")
          throw new Error("Error: debe ser una String");
      },
    },
  };
  sequelize.define("usuario", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
  });
};
