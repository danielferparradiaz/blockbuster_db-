const { DataTypes } = require("sequelize");
const bdmysqlNube = require("../database/mySqlConnection"); // ✅ ya no uses { bdmysqlNube }

const Heroe = bdmysqlNube.define("Heroe", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  aparicion: {
    type: DataTypes.DATE
  },
  casa: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  createdAt: false,
  updatedAt: false
});

module.exports = Heroe;
