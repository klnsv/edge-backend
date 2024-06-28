import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'events' model
async function getEventsModel() {
  const events = db.define("events",
    {
      name: { type: DataTypes.TEXT, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      images: { type: DataTypes.JSON, allowNull: false },
      product_ids: { type: DataTypes.JSON, allowNull: false },
      extras: { type: DataTypes.JSON, allowNull: true } //i edited allowNull to true
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await events.sync({ force: constants.forceSync });
  return events;
};

export default getEventsModel;
