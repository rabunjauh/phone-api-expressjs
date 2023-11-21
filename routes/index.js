import express from "express";
import * as dotenv from "dotenv";

import {
  getDepartments,
  getOneDepartment,
  searchDepartment,
  addDepartments,
  updateDepartment,
  deleteDepartment,
  multipleDeleteDepartments,
} from "../controllers/Departments.js";
import {
  getPositions,
  getOnePosition,
  searchPosition,
  addPositions,
  updatePositions,
  deletePositions,
  multipleDeletePositions,
} from "../controllers/Positions.js";
import {
  getGroups,
  getOneGroups,
  searchGroup,
  addGroups,
  updateGroups,
  deleteGroups,
  multipleDeleteGroups,
} from "../controllers/Groups.js";

import { login, getUsers, createUsers, logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

dotenv.config();
import Users from "../models/Users.js";

const router = express.Router();

router.get("/department", getDepartments);
router.get("/department/:id", getOneDepartment);
router.get("/searchDepartment", searchDepartment);
router.post("/department", addDepartments);
router.patch("/department/:id", updateDepartment);
router.delete("/department/:id", deleteDepartment);
router.delete("/multipleDeleteDepartment", multipleDeleteDepartments);

router.get("/position", getPositions);
router.get("/position/:id", getOnePosition);
router.post("/searchPosition", searchPosition);
router.post("/position/", addPositions);
router.put("/position/:id", updatePositions);
router.delete("/position/:id", deletePositions);
router.delete("/multipleDeletePosition", multipleDeletePositions);

router.get("/group", getGroups);
router.get("/group/:id", getOneGroups);
router.post("/group", addGroups);
router.post("/searchGroup", searchGroup);
router.patch("/group/:id", updateGroups);
router.delete("/group/:id", deleteGroups);
router.delete("/multipleDeleteGroup", multipleDeleteGroups);

// router.post('/login', login);
// router.get('/user', verifyToken, getUsers);
// router.post('/user', createUsers);
// router.get('/token', refreshToken);
// router.delete('/logout', logout);

export default router;
