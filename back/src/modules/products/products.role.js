import { roles } from "../../middleware/auth.js";


export const endPoints = {
    create: [roles.Admin],
    update: [roles.Admin],
    delete: [roles.Admin]

}