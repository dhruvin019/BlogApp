// C:\Users\Virpara Dhruvin\.vscode\Backend\NodeJs\BlogApp> npm run dev

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//express objecct
const app = express();

//middelwares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));


const BASE_URL = process.env.BASE_URL
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);


// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});