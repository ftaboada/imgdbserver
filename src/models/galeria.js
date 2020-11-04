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
  sequelize.define("galeria", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: validations.strType,
    },
  });
};
