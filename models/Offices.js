import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";

const { DataTypes } = Sequelize;

const Offices = sequelize.define('offices', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default Offices;