import { Router } from "express";
import fileUpload, { fileType } from "../../utils/multer.js";
import * as Controller from "./categories.controller.js";
import { auth } from "../../middleware/auth.js";
import { endPoints } from "./categories.role.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./categories.valedation.js";

const router = Router();
//
//   
router.post('/',fileUpload(fileType.image).single('image'),valedation(schema.createCategorySchema),auth(endPoints.create),asyncHandler(Controller.create))
router.get('/',auth(endPoints.get),asyncHandler(Controller.getAll));
router.get('/active',asyncHandler(Controller.getActive));
router.get('/:id',valedation(schema.getDetailsSchema),auth(endPoints.get),asyncHandler(Controller.getDetails));
router.patch('/:id',fileUpload(fileType.image).single('image'),valedation(schema.updateCategorySchema),auth(endPoints.update),asyncHandler(Controller.update));
router.delete('/:id',valedation(schema.deleteCategorySchema),auth(endPoints.delete),asyncHandler(Controller.destroy));
export default router;  
