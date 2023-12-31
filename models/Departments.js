import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";
import Groups from "./Groups.js";

const { DataTypes } = Sequelize;

const Departments = sequelize.define(
  "departments",
  {
    departmentId: {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.SMALLINT,
    },
  },
  {
    freezeTableName: true,
  }
);

Departments.belongsTo(Groups, {
  foreignKey: "groupId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true,
});

export default Departments;
