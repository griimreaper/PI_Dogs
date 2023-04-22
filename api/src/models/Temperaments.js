const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("temperaments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.INTEGER
        }
    })
}