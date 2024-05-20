import { roles } from "../../middleware/auth.js";


export const endPoints = {
    create: [roles.Admin],
    get: [roles.Admin],
    active: [roles.Admin, roles.User],
    update: [roles.Admin],
    delete: [roles.Admin]

}