import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./order.role.js";
import * as Controller from "./order.controller.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./order.valedation.js";

const router = Router();



router.post('/',auth(endPoints.create),valedation(schema.createOrderSchema),asyncHandler(Controller.create)); 
router.get('/all', auth(endPoints.getAll),asyncHandler(Controller.getOrders));
router.get('/userOrder', auth(endPoints.getUserOrder),asyncHandler(Controller.getUserOrders));
router.patch('/changeStatus/:orderId', auth(endPoints.changeStatus),valedation(schema.OrderStatusSchema),asyncHandler(Controller.changeStatus))


export default router;