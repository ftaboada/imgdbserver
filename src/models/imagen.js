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
    intType: {
      isNumeric: true,
    },
  };
  sequelize.define("imagen", {
    src: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    thumbsrc: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: validations.allowNull,
      validate: validations.intType,
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: validations.allowNull,
      validate: validations.intType,
    },
    vertical: {
      type: DataTypes.BOOLEAN,
      allowNull: validations.allowNull,
    },
  });
};
