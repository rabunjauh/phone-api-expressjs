import express from "express";
import * as dotenv from "dotenv";

import { getDepartments, getOneDepartment, addDepartments, updateDepartment, deleteDepartment, searchDepartment } from "../controllers/Departments.js";
import { getPositions, getOnePosition, addPositions, updatePositions, deletePositions, searchPosition } from "../controllers/Positions.js";
import { login, getUsers, createUsers, logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

dotenv.config();
import Users from "../models/Users.js";


const router = express.Router();

router.get('/department', getDepartments);
router.get('/department/:id', getOneDepartment);
router.get('/searchDepartment', searchDepartment);
router.post('/department', addDepartments);
router.put('/department/:id', updateDepartment);
router.delete('/department/:id', deleteDepartment);

router.get('/position', getPositions);
router.get('/position/:id', getOnePosition);
router.get('/searchPosition', searchPosition);
router.post('/position/', addPositions);
router.put('/position/:id', updatePositions);
router.delete('/position/:id', deletePositions);

router.post('/login', login);
router.get('/user', verifyToken, getUsers);
router.post('/user', createUsers);
router.get('/token', refreshToken);
router.delete('/logout', logout);

export default router;

