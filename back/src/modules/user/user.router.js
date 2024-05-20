import { Router } from "express";
import * as Controller from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "../categories/categories.role.js";


const router = Router();

router.get('/allUsers',Controller.getAll);
router.get('/:id',Controller.getDetails);
router.patch('/:id',auth(endPoints.update),Controller.update);
router.delete('/:id',auth(endPoints.delete),Controller.destroy);


export default router;
