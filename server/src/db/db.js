import mongoose from "mongoose"
import {DB_NAME} from '../constants.js'

const DB_CONNECTION = async () => {
    try {
        const connectionInctence = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`DB CONNECTION SUCCESFULLY ${connectionInctence.connection.host}`);
    } catch (error) {
        console.log(`DB CONNECTION FAILED :: ${error} `);
    }
}

export default DB_CONNECTION