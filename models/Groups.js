import { Sequelize } from "sequelize";
import sequelize from "../config/Database.js";

const { DataTypes } = Sequelize;

const Groups = sequelize.define(
  "groups",
  {
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Groups;
