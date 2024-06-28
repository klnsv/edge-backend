import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'orderDetails' model
async function getOrderDetailsModel() {
  const orderDetails = db.define("productTransaction",
    {
      order_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'order',
          key: 'id'
        }
      },
      product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'product', 
          key: 'id'
        }
      },
      original_price: { type: DataTypes.FLOAT, allowNull: false },
      discount: { type: DataTypes.FLOAT, allowNull: false },
      final_price: { type: DataTypes.FLOAT, allowNull: false },
      tax: { type: DataTypes.FLOAT, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await orderDetails.sync({ force: constants.forceSync });
  return orderDetails;
};

export default getOrderDetailsModel;
