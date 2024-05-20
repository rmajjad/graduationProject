import { Router } from "express";
import * as Controller from "./auth.controller.js";

const router = Router();

router.post('/registor',Controller.registor)
router.post('/login',Controller.login)
router.patch('/sendCode',Controller.sendCode);
router.patch('/forgotPassword',Controller.forgotPassword);

export default router;
