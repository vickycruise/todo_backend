import { DataTypes } from "sequelize";
import sequelize from "./index.mjs";
import User from "./user.mjs";

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "todos",
    timestamps: false,
  }
);

Todo.belongsTo(User, { foreignKey: "createdBy" });
User.hasMany(Todo, { foreignKey: "createdBy" });

export default Todo;
