import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import fileUpload, { fileType } from "../../utils/multer.js";
import * as Controller  from "./products.controller..js";
import reviewRouter from "./../review/review.router.js"

import { endPoints } from "./products.role.js";
import { asyncHandler } from "../../utils/catchError.js";
import { valedation } from "../../middleware/valedation.js";
import * as schema from "./products.valedation.js";

//    

const router = Router(); 

router.use('/:productId/review', reviewRouter); 
router.post('/',fileUpload(fileType.image).fields([
    {name: 'mainImage',maxCount:1},
    {name: 'subImages',maxCount:5},
]),asyncHandler(valedation(schema.createProductSchema)),auth(endPoints.create),asyncHandler(Controller.create)); 

router.get('/',valedation(schema.getAllSchema),asyncHandler(Controller.getAll));

router.get('/productDetails/:productId',valedation(schema.productDetailsSchema),asyncHandler(Controller.productDetails));

router.get('/:categoryId',valedation(schema.getPro_CSchema),asyncHandler(Controller.getPro_C));

router.patch('/:id',fileUpload(fileType.image).fields([
    {name: 'mainImage',maxCount:1},
    {name: 'subImages',maxCount:5},
]),valedation(schema.updateProductSchema),auth(endPoints.update),asyncHandler(Controller.update));

router.delete('/:id',auth(endPoints.delete),valedation(schema.destroySchema),asyncHandler(Controller.destroy));


export default router; 