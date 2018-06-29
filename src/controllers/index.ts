import { AuthController } from "./authentication";
import { TransactionController } from "./transaction";
import { UserController } from "./users";
export const CONTROLLERS = [
    new UserController(),
    new AuthController(),
    new TransactionController()
];
