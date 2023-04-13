const { Sequelize } = require('sequelize');
const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQ_HOST;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    logging: false,
});

const dbConnectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {sequelize, dbConnectMysql};