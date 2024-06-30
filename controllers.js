import authRoute from './controllers/authController.js';
import catRoute from './controllers/categoriesController.js';
import eventRoute from './controllers/eventController.js';
import productRouter from './controllers/productController.js';
import wishRouter from './controllers/wishController.js';
import cartRouter from './controllers/cartController.js';
import profileRouter from './controllers/profileController.js';

const controller = {}
controller.start = (app)=>{

    app.use("/auth", authRoute);
    app.use("/products",productRouter);
    app.use("/categories", catRoute);
    app.use("/events",eventRoute);
    app.use("/wishlist",wishRouter);
    app.use("/cart", cartRouter);
    app.use("/profile", profileRouter);

}
export default controller;