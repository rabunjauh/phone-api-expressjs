import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";
import Departments from "./Departments.js";

const { DataTypes } = Sequelize;

const Positions = sequelize.define('positions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    level: {
        type: DataTypes.SMALLINT
    }
}, 
{
    freezeTableName: true
});

Positions.belongsTo(Departments, { foreignKey: 'departmentId' });

export default Positions;