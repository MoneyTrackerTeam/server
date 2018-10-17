import passport = require("passport");
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { User } from "../models/user.model";
import { userService } from "../services/user.service";
const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
};

const strategy = new Strategy(jwtOptions, async (payload, next) => {
    const user: User = await userService.findOneById(payload.id);
    if (user) {
        next(null, user);
    } else {
        next(new Error("User not found"), null);
    }
});
export default passport.use("jwt", strategy);
