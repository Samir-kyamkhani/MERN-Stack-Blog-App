import { asyncHandler } from "../utils/asynchandler.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken";

// Cookies options for JWT
const cookieOptions = {
    httpOnly: true,
    secure: true,
}

// Generate Tokens 
const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save( { validateBeforeSave: false } )

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Error While generating Tokens..")
    }
}


// Controllers to User Signup
const userSignup = asyncHandler( async ( req, res ) => {
    //Algorithem to signup user
    // 1. Get User Detail From req body
    // 2. Validation if User Are Not Empty
    // 3. Check For Avatar Image  
    // 4. If Avatar is Parsent So Upload on Cloudinary
    // 5. Check if User Exits or not if Exits return an "error" if doesnt "Create User"
    // 6. Check For User Creation 
    // 7. Return User, or Remove Password And RefreshToken From Response

    //Lest Code

    const {fullName, email, password, confirmPassword} = req.body;


    if (
        [fullName, email, password, confirmPassword].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required !")
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Your password dosent match !")
    }

    const avatarLocalFilePath = req.file.path;

    if (!avatarLocalFilePath) {
        throw new ApiError(400, "Please upload avatar")
    }

    const avatar = await uploadOnCloudinary(avatarLocalFilePath)

    if (!avatar) {
        throw new ApiError(400, "Error while uploading avatar")
    }

    const exitedUser = await User.findOne({
        $or: [
            {email},
        ]
    })

    if (exitedUser) {
        throw new ApiError(409, "User already exits...")
    }

    const user = await User.create({
        fullName,
        email: email.toLowerCase() && email.trim(),
        avatar: avatar.url,
        password: password.trim(),
        confirmPassword: confirmPassword.trim()
    })

    const cretedUser = await User.findById(user._id).select(
        "-password -confirmPassword -refreshToken"
    )

    if (!cretedUser) {
        throw new ApiError(500, "Error while creating user !")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, "User signup successfully...", cretedUser)
    )
} )

const userLogin = asyncHandler( async ( req, res ) => {
    // Algorithem To User Login
    // 1. Get login Detail from req body
    // 2. Validation check for is not empty
    // 3. Validation check for User is already Exits or not
    // 4. validation for Passwordis is Correct or not 
    // 5. Generate Tokens or Remove Password and refreshToken and Send cookies
    // 6. Return User And Token

    // Let's Code

    const {email, password} = req.body;

    if (!email && !password) {
        throw new ApiError(400 , "All fields are requried !")
    }

    const user = await User.findOne({
        $or: [
            {email},
        ]
    })

    if (!user) {
        throw new ApiError(404, "Account not found..")
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Password !")
    }

    // First Create a method wich can generate Tokens. itop of the code 👆
    const {refreshToken, accessToken} = await generateTokens(user?._id)

    const logedInUser = await User.findById(user?._id).select(
        "-password -refreshToken"
    )

    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
        new ApiResponse(200, "User Logedin successFully..", {
            user: logedInUser,
            accessToken,
            refreshToken, // IF User Want Save To Manualy Tokens
        })
    )
} )

const userLogout = asyncHandler( async ( req, res ) => {
    // Algorithem To Logout
    // 1. Remove refreshToken From User
    // 2. Remove Cookies from response

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
        new ApiResponse(200, "User Logout Successfully", {})
    )
})

const getCurrentUser = asyncHandler( async ( req, res ) => {
    
    const {_id} = req.params
    const user = await User.findById(_id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(404, "User not found !")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "User fatched successfully...", user)
    )

} )

//Ignore it
const getAuthores = asyncHandler( async ( req, res ) => {
    const authors = await User.find().select(" -password -refreshToken")

    if (!authors) {
        throw new ApiError(404, "There is no authors found !")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Authors fatched sucessfully...", authors)
    )
} )

const updateUserAvatar = asyncHandler( async ( req, res ) => {

    //Algorithem to Update Avatar
    // 1. Get Avatar File Path from req file
    // 2. Validation Check for file is !misisng
    // 3. Upload on Cloudinary
    // 4. Validation check for file updated or not
    // 5. Get user and update the avavtar
    // 6. Return the user and remove the password

    const avatarLocalFilePath = req.file.path

    if (!avatarLocalFilePath) {
        throw new ApiError(400, "Avatar file missing !")
    }

    const avatar  = await uploadOnCloudinary(avatarLocalFilePath)

    if (!avatar) {
        throw new ApiError(400, "Error while updating avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url,
            }
        },
        {
            new: true,
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "User avatar Updated Successfully...", user)
    )

} )

const updateUserDetails = asyncHandler( async ( req, res ) => {
    // Algorithem to Update user Details
    // 1. get details from req body
    // 2. Validation for details are field or not
    // 3. Get user and update details
    // 4. Return user remove the password

    const {fullName, email} = req.body

    if (!fullName && !email) {
        throw new ApiError(400 , "All fields are reqired !")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, "User details update Successfully...", user)
    )
} )

const changeCurrentPassword = asyncHandler( async ( req, res ) => {
    // Algorithem to change password
    // 1. Get user old password or new one from req body
    // 2. Validation for field !empty
    // 3. Get user
    // 4. compare the new password to old password
    // 5. Validation for password correct or not
    // 6. Update the password
    // 7. save it befor validate 
    // 8. return the user and remove the password 

    const {currentPassword, newPassword} = req.body

    if (!currentPassword && !newPassword) {
        throw new ApiError(400, "All fields are required !")
    }

    const user = await User.findOne(req.user?._id)

    const isPasswordCorrect = await user.comparePassword(currentPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Password updated successfilly...", {})
    )

} )

const refreshAccessToken = asyncHandler( async ( req, res ) => {
    
    // Algorithem to Access token refreshed
    // 1. Get Refresh token req cookies or req body
    // 2. Validation check for incoming refresh token coming or not
    // 3. Wrap all the code into trycatch
    // 4. Verification for bettwen incoming token or env Refresh token using jwt verify
    // 5. Get user from verfiyToken 
    // 6. Validation check for user valid or not 
    // 7. Validation check for bettwen incoming refresh token or user refresh token if they are expired or not
    // 8. Generating accessToken and RefreshToken 
    // 9. Return cookie accessToken refreshToken 
    
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request !")
    }

    try {
        
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET,

        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh and access token expired");
        }

        const {accessToken, refreshToken} = await generateTokens(user?._id)

        return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, "Access Token refreshed successfully...", {accessToken, refreshToken})
        )

    } catch (error) {
        throw new ApiError(4.1, error?.message || "Invalid Refresh Token")
    }
} )


export {
    userSignup,
    userLogin,
    userLogout,
    getCurrentUser,
    updateUserAvatar,
    updateUserDetails,
    changeCurrentPassword,
    refreshAccessToken,
    getAuthores
}