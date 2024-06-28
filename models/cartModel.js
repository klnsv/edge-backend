import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'cart' model
async function getCartModel() {
  const cart = db.define("cart",
    {
      user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: 'user', 
          key: 'id'
        }
      },
      product_ids: { type: DataTypes.JSON, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await cart.sync({ force: constants.forceSync });
  return cart;
};

export default getCartModel;
