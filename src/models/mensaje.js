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
  sequelize.define("mensaje", {
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: validations.allowNull,
      validate: validations.intType,
    },
    texto: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    sobre: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
    },
  });
};
