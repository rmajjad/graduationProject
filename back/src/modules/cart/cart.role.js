
import { roles } from "../../middleware/auth.js";


export const endPoints = {
    
    get: [roles.User,roles.Admin],
    create: [roles.User,roles.Admin],
    update: [roles.User,roles.Admin],
    delete: [roles.User,roles.Admin],

} 