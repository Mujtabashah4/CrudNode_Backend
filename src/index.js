const express = require("express");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv")
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

dotenv.config();

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/note", noteRouter);

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
