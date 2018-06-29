import { AuthController } from "./authentication";
import { UserController } from "./users";
export const CONTROLLERS = [
    new UserController(),
    new AuthController(),
];
