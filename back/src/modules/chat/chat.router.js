import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as Controller from "./chat.controller.js";
import { endPoints } from "./chat.role.js";


const router = Router();



router.post('/',auth(endPoints.create),Controller.create);




export default router;