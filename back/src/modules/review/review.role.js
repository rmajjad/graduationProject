import { roles } from "../../middleware/auth.js";


export const endPoints = {
    create: [roles.User,roles.Admin],
    getUsers: [roles.Admin,roles.User],
    getUserData: [roles.Admin, roles.User],
    changeStatus: [roles.Admin],
    delete: [roles.Admin]

}