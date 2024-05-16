import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Layout from "./components/Layout"
import ErrorPage from './pages/ErrorPage'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import EditPost from './pages/EditPost'
import DeletePost from './pages/DeletePost'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import CategoryPosts from './pages/CategoryPosts'
import Authors from './pages/Authors'
import UserProfile from './pages/UserProfile'
import AuthorPosts from './pages/AuthorPosts'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
      <Route index={true} element={<Home/>}/>
      <Route path='posts/:id' element={<PostDetails/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='profile/:id' element={<UserProfile/>}/>
      <Route path='logout' element={<Logout/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='posts/:id/edit' element={<EditPost/>}/>
      <Route path='delete:id' element={<DeletePost/>}/>
      <Route path='myposts/:id' element={<Dashboard/>}/>
      <Route path='create' element={<CreatePost/>}/>
      <Route path='posts/categories/:category' element={<CategoryPosts/>}/>
      <Route path='authors' element={<Authors/>}/>
      <Route path='posts/users/:id' element={<AuthorPosts/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
