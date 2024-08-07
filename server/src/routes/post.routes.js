import { Router } from "express";
import {
    createPost,
    editPost,
    deletePost,
    getPost,
    getPosts,
    getUserPosts,
    getCatPosts
} from "../controllers/post.controller.js"

import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";


const router = Router()

// Secure post route, we are using verifyJwt middleware to verify the jwt token.
router.route("/create-post").post(verifyJwt, upload.single("thumbnail"), createPost);

router.route("/:id").patch(verifyJwt, upload.single("thumbnail"), editPost);
router.route("/:id").delete(verifyJwt, deletePost);
 


router.route("/").get(getPosts)
router.route("/:id").get(getPost);
router.route("/categories/:category").get(getCatPosts);
router.route("/users/:id").get(getUserPosts);





export default router