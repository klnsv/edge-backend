import express from "express";
import {db} from "./db.js";
import morgan from "morgan";
import constants from "./constants.js";
import controller from "./controllers.js";
import bodyParser from "body-parser";
import getProductModel from './models/productsModel.js';
import getEventsModel from './models/eventsModel.js';
import getCategoriesModel from './models/categoriesModel.js';
import productController  from './controllers/productController.js';
import eventController from "./controllers/eventController.js";
import categoriesController from "./controllers/categoriesController.js";
const server = constants.server;
const app = express();
const Router = express.Router();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));


app.get("/", async (req, res) => {
    return res.status(200).send({ status: "success", message: "EMBLOCK EDGE BACKEND. FREE E-COMMERCE FOR SMALL BUSINESSES" })
});

//related to products api
app.get('/Products', productController.getProduct);
app.post('/Products/:id', productController.postProdById);
app.get('/Products/:id',productController.getProdById);
app.put('/Products/:id', productController.updateProducts);
app.delete('/Products/:id', productController.deleteProducts);

//related to events api
app.get('/events', eventController.getEvents);
app.get('/events/:id', eventController.getEventsById);
app.post('/events', eventController.postEvents);
app.put('/events/:id',eventController.updateEvents);
app.delete('/events/:id',eventController.deleteEvents);

//related to category API
app.get('/categories', categoriesController.getCategories);
app.get('/categories/:id', categoriesController.getCatgoryById);
app.post('/categories', categoriesController.postCategory);
app.put('/categories/:id', categoriesController.updateCategory);
app.delete('/categories/:id', categoriesController.deleteCategory);

controller.start(app);
// start/test database connection
db.authenticate()
    .then(() => {
        console.log("DB Connected...");
        getCategoriesModel();
        getEventsModel();
        getProductModel();

    })
    .catch((err) => {
        console.log(err);
    });

app.listen(server.PORT, (err) => {
    if (err) {
        console.log(`***${err}`)
    } else {
        console.log(`Server started at ${server.PORT}`)
    }
})

