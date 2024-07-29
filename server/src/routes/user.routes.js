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

router.route("/signup").post(
     //file handling middleware for multer, we can add multiple fields to the array. before userSignup Save
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userSignup,
);

router.route("/login").post(userLogin)

// Secure logout route, we are using verifyJwt middleware to verify the jwt token.
router.route("/logout").post(verifyJwt, userLogout);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changeCurrentPassword);
router.route("/:_id").get(verifyJwt, getCurrentUser);
router.route("/").get(verifyJwt, getAuthores);
router.route("/update-account").patch(verifyJwt, updateUserDetails);

router.route("/update-avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)


export default router