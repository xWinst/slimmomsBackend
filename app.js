const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose"); ///////////
const { DB_HOST, PORT = 4000 } = process.env; //////////////

const usersRouter = require("./routes/api/users.js");
const productsRouter = require("./routes/api/products.js");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
    res.json({ hello: "Bingo!!!" });
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    }); ///////////////////////

module.exports = app;
