const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("temperaments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique:true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })
}