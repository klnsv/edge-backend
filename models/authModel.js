import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'auth' model
async function getAuthModel() {
  const auth = db.define("auth",
    {
      emailId: { type: DataTypes.TEXT, allowNull: false },
      password: { type: DataTypes.TEXT, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await auth.sync({ force: constants.forceSync });
  return auth;
};

export default getAuthModel;
