// C:\Users\Virpara Dhruvin\.vscode\Backend\NodeJs\BlogApp> npm run dev

import React from 'react';
import Header from './components/Header';
import {Routes,Route} from 'react-router-dom';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      
      <Header/>
      
      {/* <ToastContainer/> */}
     <Routes>
      <Route path="/" element={<Blogs/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog-details/:id" element={<BlogDetails/>}/>
      <Route path="/my-blogs" element={<UserBlogs/>}/>
      <Route path="/create-blogs" element={<CreateBlog/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
