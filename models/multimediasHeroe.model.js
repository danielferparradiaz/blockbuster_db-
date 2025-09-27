// models/multimediasHeroe.model.js
const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection");

const MultimediasHeroe = bdmysqlNube.define("multimedias_heroe", {
  heroes_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  multimedia_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: "multimedias_heroe",
  timestamps: false
});

module.exports = MultimediasHeroe;
