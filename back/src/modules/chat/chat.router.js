import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as Controller from "./chat.controller.js";
import { endPoints } from "./chat.role.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./chat.valedation.js";


const router = Router();



router.post('/',auth(endPoints.create),valedation(schema.chatSchema),asyncHandler(Controller.create));




export default router;