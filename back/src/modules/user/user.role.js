import { roles } from "../../middleware/auth.js";


export const endPoints = {
    getUsers: [roles.Admin,roles.User],
    getUserData: [roles.Admin, roles.User],
    update: [roles.Admin],
    delete: [roles.Admin]


}