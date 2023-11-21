import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";
import Groups from "./Groups.js";

const { DataTypes } = Sequelize;

const Positions = sequelize.define(
  "positions",
  {
    positionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

Positions.belongsTo(Groups, { foreignKey: "departmentId" });

export default DepartmentOrder;
