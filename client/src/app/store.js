import { configureStore} from '@reduxjs/toolkit'
import authReducers from '../slices/authSlice.js'
import postReducers from '../slices/postSlice.js'


export const store = configureStore({
  reducer: {
    auth: authReducers,
    post: postReducers,
  }

})

