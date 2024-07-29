import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String, // Password will be hashed in the bcrypt middlware
            required: true,
        },
        refreshToken: {
            type: String,
        },
        avatar: {
            type: String, //letter on cloudinary
            required: true
        },
        posts: {
            type: Number,
            default: 0
        }


    }, {timestamps: true})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
}); // dont use callbacke function becose callback does'nt have "this" access


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        //payload || data
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        // Secret key
        // Access token env key
        process.env.ACCESS_TOKEN_SECRET,

        // expire key
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },
    )
}; // generate access token for user


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },

        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        },
    )
}


export const User = mongoose.model("User", userSchema)