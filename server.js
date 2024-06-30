import express from "express";
import {db} from "./db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import constants from "./constants.js";
import controller from "./controllers.js";
import bodyParser from "body-parser";
import getProductModel from './models/productsModel.js';
import getEventsModel from './models/eventsModel.js';
import getCategoriesModel from './models/categoriesModel.js';
import getAuthModel from "./models/usersModel.js";
import getCartModel from "./models/cartModel.js";

const server = constants.server;
const app = express();
const Router = express.Router();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));


app.get("/", async (req, res) => {
    return res.status(200).send({ status: "success", message: "EMBLOCK EDGE BACKEND. FREE E-COMMERCE FOR SMALL BUSINESSES" })
});




controller.start(app);
// start/test database connection
db.authenticate()
    .then(() => {
        console.log("DB Connected...");
        getCategoriesModel();
        getEventsModel();
        getProductModel();
        getAuthModel();
        getCartModel();

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

