import mongoose, {Schema} from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2"; 


const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: [ "Agriculuter", "Business", "Education", "Entertainment", "Art", "Design", "Technology"],
            message: "{Value is not supported !}"
        },
        thumbnail: {
            type: String, // middelware
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }, {timestamps: true})

postSchema.plugin(aggregatePaginate) //pagination plugin

export const Post = mongoose.model("Post", postSchema)