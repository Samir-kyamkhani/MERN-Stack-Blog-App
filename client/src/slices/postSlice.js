import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../constant";
import axios from "axios";



const initialState = {
    allPosts:  [], //localStorage.getItem("allPosts") ? JSON.parse(localStorage.getItem("allPosts")) : [], 
    postAuthor: null, //localStorage.getItem("postAuthor") ? JSON.parse(localStorage.getItem("postAuthor")) : null,
    userPostDetails: null,
    authorPosts: [], //localStorage.getItem("authorPosts") ? JSON.parse(localStorage.getItem("authorPosts")) : [],
    categoriesPosts: [], //localStorage.getItem("categoriesPosts") ? JSON.parse(localStorage.getItem("categoriesPosts")) : [],
    allauthors: [], //localStorage.getItem("allauthors") ? JSON.parse(localStorage.getItem("allauthors")) : [],
    createPost: null,
    editPost: null, //localStorage.getItem("editPost") ? JSON.parse(localStorage.getItem("editPost")) : null,
    deletePost: null,
    updateAvatarByUser: null,
    updateProfileDetails: null,
    isLoading: false,
    error: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        
        //Get All Posts
        getAllPostsRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        getAllPostsSuccess: (state, action) => {
            state.isLoading = false
            state.allPosts = action.payload
            // localStorage.setItem('allPosts', JSON.stringify(action.payload));
        },

        getAllPostsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Get Post Author
        getPostAuthorRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        getPostAuthorSuccess: (state, action) => {
            state.isLoading = false
            state.postAuthor = action.payload
            // localStorage.setItem('postAuthor', JSON.stringify(action.payload));

        },

        getPostAuthorFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        ///Get User Posts Details
        getUserPostDetailsRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        getUserPostDetailsSuccess: (state, action) => {
            state.isLoading = false
            state.userPostDetails = action.payload
        },

        getUserPostDetailsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Get Author Posts
        getAuthorPostsRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        getAuthorPostsSuccess: (state, action) => {
            state.isLoading = false
            state.authorPosts = action.payload
            // localStorage.setItem('authorPosts', JSON.stringify(action.payload));
        },

        getAuthorPostsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Get All Categories Posts
        getCategoriesPostsRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        getCategoriesPostsSuccess: (state, action) => {
            state.isLoading = false
            state.categoriesPosts = action.payload
            // localStorage.setItem('categoriesPosts', JSON.stringify(action.payload));
        },

        getCategoriesPostsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Get All Authors
        getAllAuthorsRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        getAllAuthorsSuccess: (state, action) => {
            state.isLoading = false,
            state.allauthors = action.payload
            // localStorage.setItem('allauthors', JSON.stringify(action.payload));
        },

        getAllAuthorsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        ///Create Post
        createPostRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        createPostSuccess: (state, action) => {
            state.isLoading = false
            state.createPost = action.payload
        },

        createPostFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Edit Post
        editPostRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        editPostSuccess: (state, action) => {
            state.isLoading = false
            state.editPost = action.payload
            // localStorage.setItem('editPost', JSON.stringify(action.payload));
        },

        editPostFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Delete Post
        deletePostRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        deletePostSuccess: (state, action) => {
            state.isLoading = false
            state.deletePost = action.payload

        },

        deletePostFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Update-avatar
        UpdateAvatarRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        UpdateAvatarSuccess: (state, action) => {
            state.isLoading = false
            state.updateAvatarByUser = action.payload
            // localStorage.setItem('UpdateAvatar', JSON.stringify(action.payload));
        },

        UpdateAvatarFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        //Update-user details
        updateUserDetailsRequest: (state) => {
            state.isLoading = true
            state.error = null
        },

        updateUserDetailsSuccess: (state, action) => {
            state.isLoading = false
            state.updateProfileDetails = action.payload
            // localStorage.setItem('updateUserDetails', JSON.stringify(action.payload));
        },

        updateUserDetailsFail: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }

    }
})


export const {
    getAllPostsRequest,
    getAllPostsSuccess,
    getAllPostsFail,

    getPostAuthorRequest,
    getPostAuthorSuccess,
    getPostAuthorFail,

    getUserPostDetailsRequest,
    getUserPostDetailsSuccess,
    getUserPostDetailsFail,

    getAuthorPostsRequest,
    getAuthorPostsSuccess,
    getAuthorPostsFail,

    getCategoriesPostsRequest,
    getCategoriesPostsSuccess,
    getCategoriesPostsFail,

    getAllAuthorsRequest,
    getAllAuthorsSuccess,
    getAllAuthorsFail,

    createPostRequest,
    createPostSuccess,
    createPostFail,

    editPostRequest,
    editPostSuccess,
    editPostFail,

    deletePostRequest,
    deletePostSuccess,
    deletePostFail,

    UpdateAvatarRequest,
    UpdateAvatarSuccess,
    UpdateAvatarFail,

    updateUserDetailsRequest,
    updateUserDetailsSuccess,
    updateUserDetailsFail,

} = postSlice.actions


export  default postSlice.reducer


// parseHtmlError
function parseHtmlError(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // Assuming the error message is in a <pre> tag or another specific element
    const errorElement = doc.querySelector('pre') || doc.querySelector('body');
    return errorElement ? errorElement.textContent : 'An error occurred.';
}



//Fetch all posts
export const getAllPosts = () => async (dispatch) => {
    dispatch(getAllPostsRequest())
    try {
        const response = await axios.get(`${baseUrl}/posts`)
        dispatch(getAllPostsSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(getAllPostsFail(errorMessage))
        }
    }
}

//Get Post Author
export const getPostAuthor = (authorId) => async (dispatch) => {
    dispatch(getPostAuthorRequest())
    try {
        const response = await axios.get(`${baseUrl}/users/${authorId}`)
        dispatch(getPostAuthorSuccess(response?.data?.data))        
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(getAllAuthorsFail(errorMessage))
        }
    }
}

///Get User Post Details
export const getPostDetails = (id) => async (dispatch) => {
    dispatch(getUserPostDetailsRequest())
    try {
        const response = await axios.get(`${baseUrl}/posts/${id}`)
        dispatch(getUserPostDetailsSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(getUserPostDetailsFail(errorMessage))
        }
    }
}

//Get Author Posts
export const getAuthorPosts = (id) => async (dispatch) => {
    dispatch(getAuthorPostsRequest())
    try {
        const response = await axios.get(`${baseUrl}/posts/users/${id}`)
        dispatch(getAuthorPostsSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(getAuthorPostsFail(errorMessage))
        }
    }
}

//Get Categories Posts 
export const getCategoriesPosts = (category) => async (dispatch) => {
    dispatch(getCategoriesPostsRequest())
    try {
        const response = await axios.get(`${baseUrl}/posts/categories/${category}`)
        dispatch(getCategoriesPostsSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(getCategoriesPostsFail(errorMessage))
        }
    }
}

//Get All Authors
export const getAllAuthors = () => async (dispatch) => {
    dispatch(getAllAuthorsRequest())
    try {
        const response = await axios.get(`${baseUrl}/users/`)
        dispatch(getAllAuthorsSuccess(response?.data?.data))
        
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(getAllAuthorsFail(errorMessage))
        }
    }
}

///Create Post
export const getCreatePost = (postData) => async (dispatch) => {
    dispatch(createPostRequest())
    try {
        const response = await axios.post(`${baseUrl}/posts//create-post`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('loginUser') && JSON.parse(localStorage.getItem('loginUser')).data.accessToken}`}})
        dispatch(createPostSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(createPostFail(errorMessage))
        }
    }
}

//edit Post

export const letsEditPost = (postData, id) => async (dispatch) => {
    dispatch(editPostRequest())
    try {
        const response = await axios.patch(`${baseUrl}/posts/${id}`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('loginUser') && JSON.parse(localStorage.getItem('loginUser')).data.accessToken}`}})
        dispatch(editPostSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(editPostFail(errorMessage))
        }
    }
}

//Delete Post
export const postDelete = (id) => async (dispatch) => {
    dispatch(deletePostRequest())
    try {
        const response = await axios.delete(`${baseUrl}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('loginUser') && JSON.parse(localStorage.getItem('loginUser')).data.accessToken}`}})
        dispatch(deletePostSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(deletePostFail(errorMessage))
        }
    }
}

// Update Avatar
export const updateAvatar = (formData) => async (dispatch) => {
    dispatch(UpdateAvatarRequest())
    try {
        const response = await axios.patch(`${baseUrl}/users/update-avatar`, formData, {withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('loginUser') && JSON.parse(localStorage.getItem('loginUser')).data.accessToken}`}})
        dispatch(UpdateAvatarSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) {
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(UpdateAvatarFail(errorMessage))
        }
    }
}

/// Update user details
export const updateUserDetails = (userData) => async (dispatch) => {
    console.log("postSlice: ",userData);
    
    dispatch(updateUserDetailsRequest())
    try {
        const response = await axios.patch(`${baseUrl}/users/update-account`, userData, {withCredentials: true, headers: {Authorization: `Bearer ${localStorage.getItem('loginUser') && JSON.parse(localStorage.getItem('loginUser')).data.accessToken}`}})
        dispatch(updateUserDetailsSuccess(response?.data?.data))
    } catch (err) {
        if (err.response && err.response.data) { 
            const htmlError = err.response.data;
            const errorMessage = parseHtmlError(htmlError)
            dispatch(updateUserDetailsFail(errorMessage))
        }
    }
}