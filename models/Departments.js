import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";
import Groups from "./Groups.js";

const { DataTypes } = Sequelize;

const Departments = sequelize.define('departments', {
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
    order: {
        type: DataTypes.SMALLINT
    }
}, 
{
    freezeTableName: true
});

Departments.belongsTo(Groups, { foreignKey: 'groupId' });

export default Departments;