const express = require("express");
const ctrl = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, auth, passport, facebook } = require("../../middlewares");
const {
    registerSchema,
    loginSchema,
    refreshSchema,
    update,
} = require("../../schemas/users");

const router = express.Router();

router.post(
    "/register",
    validateBody(registerSchema),
    ctrlWrapper(ctrl.register)
);

router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.post("/refresh", validateBody(refreshSchema), ctrlWrapper(ctrl.refresh));
router.get("/user", auth, ctrlWrapper(ctrl.getUser));

router.patch(
    "/dailyRate",
    auth,
    validateBody(update),
    ctrlWrapper(ctrl.setDailyRate)
);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    ctrlWrapper(ctrl.googleAuth)
);

router.get(
    "/facebook",
    passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { session: false }),
    ctrlWrapper(ctrl.facebookAuth)
);

module.exports = router;
