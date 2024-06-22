import { Router } from "express";
import * as Controller from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./auth.valedation.js";

const router = Router();

router.post('/registor',valedation(schema.registerSchema),checkEmail,asyncHandler(Controller.registor));
router.get('/confirmEmail/:token',asyncHandler(Controller.confirmEmail));
router.post('/login',valedation(schema.loginSchema),asyncHandler(Controller.login));
router.patch('/sendCode',valedation(schema.sendCodeSchema),asyncHandler(Controller.sendCode));
router.patch('/forgotPassword',valedation(schema.forgotPasswordSchema),asyncHandler(Controller.forgotPassword));

export default router;
