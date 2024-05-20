import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileType } from "../../utils/multer.js";
import * as Controller  from "./products.controller..js";
import { endPoints } from "./products.role.js";


const router = Router();

router.post('/',auth(endPoints.create),fileUpload(fileType.image).fields([
    {name: 'mainImage',maxCount:1},
    {name: 'subImages',maxCount:5},
]),Controller.create); 

router.get('/',auth(endPoints.get),Controller.getAll);

export default router;