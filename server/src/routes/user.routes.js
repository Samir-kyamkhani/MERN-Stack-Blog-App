import { Router } from "express";
import {
    userSignup,
    userLogin,
    userLogout,
    getCurrentUser,
    getAuthores,
    updateUserAvatar,
    updateUserDetails,
    changeCurrentPassword,
    refreshAccessToken,
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/signup").post(userSignup,);
router.route("/login").post(userLogin)
router.route("/logout").post(verifyJwt, userLogout);

// Secure logout route, we are using verifyJwt middleware to verify the jwt token.
// router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/:id").get(getCurrentUser);
router.route("/").get(getAuthores);
router.route("/update-account").patch(verifyJwt, updateUserDetails);

router.route("/update-avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)


export default router