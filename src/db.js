require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rapaz`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Imagen, Categoria, Galeria, Usuario, Mensaje } = sequelize.models;

// relacion producto-categoria
//Producto.belongsToMany(Categories, { through: "producto_categoria" });
//Categories.belongsToMany(Producto, { through: "producto_categoria" });
// relacion producto-review
//Producto.hasMany(Reviews);
//relacion usuario-review
//Usuario.hasMany(Reviews);
Usuario.hasMany(Mensaje);
//Reviews.belongsTo(Usuario);
// relacion carrito-usuario
//Usuario.hasMany(Carrito);
//Carrito.belongsTo(Usuario);
Categoria.hasOne(Galeria);
Galeria.belongsTo(Categoria);
//Carrito.hasMany(LineaDeOrden);
Galeria.hasMany(Imagen);
//relacion carrito-producto
//Carrito.belongsToMany(Producto, { through: LineaDeOrden });
//Producto.belongsToMany(Carrito, { through: LineaDeOrden });
//relacion imagen-producto
//Producto.hasMany(Images);
//Images.belongsTo(Producto);
//relacion usuario-datos
//Userdata.belongsToMany(Usuario, { through: "datosUsuario"});
//Usuario.hasOne(Userdata);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
