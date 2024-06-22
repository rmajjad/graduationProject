import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as Controller from "./cart.controller.js";
import { endPoints } from "./cart.role.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./cart.valedation.js";


const router = Router();


router.get('/',auth(endPoints.get),asyncHandler(Controller.get));
router.post('/',auth(endPoints.create),valedation(schema.createCartSchema),asyncHandler(Controller.create));
router.put('/updateQuantity/:productId',auth(endPoints.update),valedation(schema.updateQuantitySchema),asyncHandler(Controller.updateQuantity));
router.put('/clear',auth(endPoints.delete),asyncHandler(Controller.clearCart));
router.put('/:productId',auth(endPoints.delete),valedation(schema.removeSchema),asyncHandler(Controller.remove));



export default router;