
//this file is meant to be destroyed before completion incase it hasn't been destroyed, dw you can delete it :)

const userOrders = [
    {
      id: 1,
      user_id: 2,
      product_ids: [
        {
          quantity: 1,
          product_id: 1
        }
      ],
      createdAt: "2024-06-30T10:49:43.000Z",
      updatedAt: "2024-06-30T10:49:43.000Z"
    },
    {
      id: 1,
      user_id: 2,
      product_ids: [
        {
          quantity: 2,
          product_id: 2
        }
      ],
      createdAt: "2024-06-30T10:49:43.000Z",
      updatedAt: "2024-06-30T10:49:43.000Z"
    }
  ];
  
  // Extract product_ids into a separate array
  const productIdsArray = userOrders.map(order => order.product_ids[0].product_id);
  
  console.log(productIdsArray);