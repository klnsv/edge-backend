import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'user' model
async function getAuthModel() {
  const user = db.define("user",
    {
      userName: { type: DataTypes.TEXT, allowNull: false },
      displayName: { type: DataTypes.TEXT, allowNull: false },
      emailId: { type: DataTypes.TEXT, allowNull: false },
      phoneNumber: { type: DataTypes.TEXT, allowNull: false },
      deliveryAddress: { type: DataTypes.JSON, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await user.sync({ force: constants.forceSync });
  return user;
};

export default getAuthModel;
