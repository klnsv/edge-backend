import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'categories' model
async function getCategoriesModel() {
  const categories = db.define("categories",
    {
      name: { type: DataTypes.TEXT, allowNull: false },
      product_ids: { type: DataTypes.JSON, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      images: { type: DataTypes.JSON, allowNull: false },
      extras: { type: DataTypes.JSON, allowNull: true } //changed allowNull to true, originally it was false
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await categories.sync({ force: constants.forceSync });
  return categories;
};

export default getCategoriesModel;
