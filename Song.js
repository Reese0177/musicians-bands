const {Sequelize, sequelize, DataTypes, Model} = require('./db');

// TODO - define the Musician model
class Song extends Model {};
Song.init({title: DataTypes.STRING, year: DataTypes.NUMBER}, {sequelize})

module.exports = {
Song};