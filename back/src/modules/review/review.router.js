import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./review.role.js";
import * as Controller from "./review.controller.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./review.valedation.js";


const router = Router({mergeParams:true});

router.post('/',auth(endPoints.create),valedation(schema.createReviewSchema),asyncHandler(Controller.create)); 

export default router;