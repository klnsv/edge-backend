import { DataTypes } from "sequelize";
import { db } from "../db.js";
import constants from "../constants.js";

// Define and synchronize the 'order' model
async function getOrderModel() {
  const order = db.define("order",
    {
      order_id: { type: DataTypes.TEXT, allowNull: false },
      deliveryAddress: { type: DataTypes.TEXT, allowNull: false },
      amount_paid: { type: DataTypes.FLOAT, allowNull: false },
      mode_of_transaction: { type: DataTypes.TEXT, allowNull: false },
      tracking_id: { type: DataTypes.TEXT, allowNull: true },
      ordered_time: { type: DataTypes.DATE, allowNull: false },
      net_discount: { type: DataTypes.FLOAT, allowNull: false },
      net_tax: { type: DataTypes.FLOAT, allowNull: false },
      transaction_ids: { type: DataTypes.JSON, allowNull: false }
    },
    {
      freezeTableName: true,
      timestamps: true
    }
  );
  await order.sync({ force: constants.forceSync });
  return order;
};

export default getOrderModel;
