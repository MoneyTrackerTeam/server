import { AuthController } from "./authentication";
import { LogsController } from "./logs";
import { MonthController } from "./month";
import { TransactionController } from "./transaction";
import { UserController } from "./users";
export const CONTROLLERS = [
    new UserController(),
    new AuthController(),
    new TransactionController(),
    new LogsController(),
    new MonthController()
];
