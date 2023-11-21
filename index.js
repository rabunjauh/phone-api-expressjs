import express from "express";
import sequelize from "./config/Database.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import cors from "cors";
const app = express();
// untuk membuat database menggunakan sequelize
// import Users from "./models/Users.js";
import Departments from "./models/Departments.js";
import Positions from "./models/Positions.js";
import Groups from "./models/Groups.js";
// import DepartmentOrder from "./models/DepartmentOrder.js";

app.use(bodyParser.json());

try {
  await sequelize.authenticate();
  console.log("connection has been established successfully");
  // untuk membuat database menggunakan sequelize
  // await Extensions.sync();
  //   await Users.sync();
  // await Positions.sync();
  // await Positions.drop();
  // await Departments.sync();
  // await Groups.sync();
  // await DepartmentOrder.sync();
  // await DepartmentOrder.drop();
  // await Groups.destroy({ truncate: { cascade: true } });
  // await Departments.drop();
  // await Groups.drop();
} catch (error) {
  console.log("Unable to connect to the database: ", error);
}

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(router);

app.use("", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => console.log("Server running at port 3000"));
