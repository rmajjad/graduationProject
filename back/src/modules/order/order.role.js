import { roles } from "../../middleware/auth.js";


export const endPoints = {
    create: [roles.User,roles.Admin],
    getAll: [roles.Admin],
    getUserOrder: [roles.Admin, roles.User],
    changeStatus: [roles.Admin],
    delete: [roles.Admin]

}