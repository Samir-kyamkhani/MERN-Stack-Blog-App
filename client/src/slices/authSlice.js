import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import {baseUrl} from "../constant.js"


const initialState = {
    registerUser: {},
    loginUser:  localStorage.getItem("loginUser") ? JSON.parse(localStorage.getItem("loginUser")) : null,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        //Register User

        registerRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        registerSuccess: (state, action) => {
            state.isLoading = false
            state.registerUser = action.payload
        },

        registerFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Login user

        loginRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        loginSuccess: (state, action) => {
            state.isLoading = false
            state.loginUser = action.payload
            localStorage.setItem('loginUser', JSON.stringify(action.payload));
        },

        loginFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Logout

        logoutRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        logoutSuccess: (state) => {
            state.isLoading = false
            state.loginUser = {} 
            localStorage.removeItem('loginUser')
        },

        logoutFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }

        
    }
})

export const {
    registerRequest,
    registerSuccess,
    registerFail,
    
    loginRequest,
    loginSuccess,
    loginFail,

    logoutRequest,
    logoutSuccess,
    logoutFail

} = authSlice.actions

export  default authSlice.reducer

// parseHtmlError
function parseHtmlError(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // Assuming the error message is in a <pre> tag or another specific element
    const errorElement = doc.querySelector('pre') || doc.querySelector('body');
    return errorElement ? errorElement.textContent : 'An error occurred.';
}


 
//Register
export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest())
    try {
        const response = await axios.post(`${baseUrl}/users/signup`, userData)
        dispatch(registerSuccess(response?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(registerFail(errorMessage))
        }
    }
}

//Login
export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest())
    try {
        const response = await axios.post(`${baseUrl}/users/login`, userData)
        dispatch(loginSuccess(response?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data
            const errorMessage = parseHtmlError(htmlError)
            dispatch(loginFail(errorMessage))
        }
    }
}

//Logout
export const logout = (userId, accessToken) => async (dispatch) => {
    dispatch(logoutRequest())
    try {
        const response = await axios.post(`${baseUrl}/users/logout`, userId, {withCredentials: true, headers: {'Authorization': `Bearer ${accessToken}`}})
        dispatch(logoutSuccess(response.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data
            const errorMessage = parseHtmlError(htmlError)
            dispatch(logoutFail(errorMessage))
        }
    }
} 