const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection");

const Multimedia = bdmysqlNube.define("Multimedia", {
  idmultimedia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(25)
  },
  url: {
    type: DataTypes.TEXT
  },
  tipo: {
    type: DataTypes.STRING(15)
  }
}, {
  tableName: "multimedias",
  timestamps: false
});

module.exports = Multimedia;
