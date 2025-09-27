const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection");

const Heroe = bdmysqlNube.define("Heroe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // 👈 agregado porque tu DDL tiene AUTO_INCREMENT
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true // 👈 tu DDL tiene UNIQUE en nombre
  },
  bio: {
    type: DataTypes.TEXT
  },
  img: {
    type: DataTypes.STRING(250)
  },
  aparicion: {
    type: DataTypes.DATE
  },
  casa: {
    type: DataTypes.STRING(20)
  }
}, {
  tableName: "heroes", // 👈 nombre real de la tabla
  timestamps: false    // 👈 evita createdAt / updatedAt
});

module.exports = Heroe;
