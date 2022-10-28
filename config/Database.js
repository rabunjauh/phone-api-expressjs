import { Sequelize } from "sequelize";

const sequelize = new Sequelize('extension_api', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default sequelize;