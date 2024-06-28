import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";


// Define and synchronize the 'product' model
async function getProductModel() {
  const product = db.define("product",
    {
      name: { type: DataTypes.TEXT, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      images: { type: DataTypes.JSON, allowNull: false },
      parameters: { type: DataTypes.JSON, allowNull: false },
      extras: { type: DataTypes.JSON, allowNull: false },
      sale_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'events', 
          key: 'id'
        }
      },
      category_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'categories', 
          key: 'id'
        }
      }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await product.sync({ force: constants.forceSync });
  return product;
};

export default getProductModel;
