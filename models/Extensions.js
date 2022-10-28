import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";
import Departments from "./Departments.js";
import Positions from "./Positions.js";
import Offices from "./Offices.js";

const { DataTypes } = Sequelize;

const Extensions = sequelize.define('extensions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    employeeNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    extensionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

Extensions.belongsTo(Departments, { foreignKey: 'departmentId' });
Extensions.belongsTo(Positions, { foreignKey: 'positionId' });
Extensions.belongsTo(Offices, { foreignKey: 'officeId' });

export default Extensions;