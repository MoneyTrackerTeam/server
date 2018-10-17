import { AuthController } from "./authentication.controller";
import { CategoriesController } from "./categories.controller";
import { LogsController } from "./logs.controller";
import { MonthController } from "./month.controller";
import { TransactionController } from "./transaction.controller";
import { UserController } from "./users.controller";
export const CONTROLLERS = [
    new UserController(),
    new AuthController(),
    new TransactionController(),
    new LogsController(),
    new MonthController(),
    new CategoriesController(),
];
