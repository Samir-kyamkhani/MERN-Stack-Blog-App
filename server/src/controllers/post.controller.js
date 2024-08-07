import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { uploadOnCloudinary , deleteOnCloudinary} from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPost = asyncHandler(async (req, res) => {
  //Algorithem to Create Post
  // 1. Get post Detail From req body
  // 2. Validation if post details Are Not Empty
  // 3. Check For Avatar Image
  // 4. If Avatar is Parsent So Upload on Cloudinary
  // 7. Return  created post

  const { title, description, category } = req.body;

  if ([title, description, category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required !");
  }

  const thumbnail = req.file.path;

  if (!thumbnail) {
    throw new ApiError(400, "Please upload thumbnail");
  }

  if (thumbnail.size > 2000000) {
    throw new ApiError(400, "Thumbnail should be less then 2mb ");
  }

  const newThumbnail = await uploadOnCloudinary(thumbnail);

  const newPost = await Post.create({
    title,
    description,
    category,
    thumbnail: newThumbnail.url,
    createdBy: req.user._id,
  });

  if (!newPost) {
    throw new ApiError(500, "Error while Creating Post!");
  }

  // find user and increate post count by 1
  const exitedUser = await User.findById(req.user._id);
  const userPostCount = exitedUser.posts + 1;
  await User.findByIdAndUpdate(req.user._id, {
    posts: userPostCount,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully ", newPost));
});

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().sort({ updatedAt: -1 });

  if (!posts) {
    throw new ApiError(400, "there is no post found");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "posts fetched successfully...", posts));
});

const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, "Post fetched successfuly...", post));
});

const getCatPosts = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const catPost = await Post.find({ category }).sort({ createdAt: -1 });

  return res
    .status(201)
    .json(
      new ApiResponse(200, "Category post fatched successfully...", catPost),
    );
});

const getUserPosts = asyncHandler(async (req, res) => {
  const id = req.params.id;

  
  const posts = await Post.find({ createdBy: id }).sort({ createdAt: -1 });

  if (!posts) {
    throw new ApiError(404, "User post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User posts fatched successfully...", posts));
});

const editPost = asyncHandler(async (req, res) => {
  let updatedPost;
  const postId = req.params.id;
  
  const { title, description, category } = req.body;

  if ([title, description, category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required !");
  }

  if (!req.file) {
    updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          description,
          category,
        },
      },
      {
        new: true,
      },
    );
  } else {

    //Old thumbnail deletee
    const findePost = await Post.findById(postId);
    await deleteOnCloudinary(findePost);
    

    const thumbnailLocalFilePath = req.file.path;

    if (!thumbnailLocalFilePath) {
      throw new ApiError(400, "Thumnail file missing");
    }

    if (thumbnailLocalFilePath.size > 2000000) {
      throw new ApiError(400, "Thumbnail should be less then 2mb ");
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalFilePath);

    if (!thumbnail) {
      throw new ApiError(400, "Error while uploading thumbnail! ");
    }

    updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          description,
          category,
          thumbnail: thumbnail.url,
        },
      },
      {
        new: true,
      },
    );
  }

  if (!updatedPost) {
    throw new ApiError(400, "Couldn't update post. ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Post updated Successfully...", updatedPost));
});

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  let newPost;

  if (!postId) {
    throw new ApiError(400, "Post unavilable");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (req.user._id.toString() === post.createdBy.toString()) {
    newPost = await Post.findByIdAndDelete(postId);

    // Find user and reduce post count

    const exitedUser = await User.findById(req.user._id);

    if (exitedUser) {
      const userPostCount = (exitedUser.posts || 0) - 1;

      await User.findByIdAndUpdate(req.user._id, {
        posts: userPostCount,
      });
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, `Post ${postId} deleted successfully`, newPost),
      );
  } else {
    throw new ApiError(403, "Unauthorized to delete this post");
  }
});

export {
  createPost,
  editPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  getCatPosts,
};
