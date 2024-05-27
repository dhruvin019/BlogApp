import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(false);

  //get blogs
  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://blogapp-iumc.onrender.com/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {loading ? <Spinner/> : 
        (blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            userName={blog?.userName}
            time={blog.createdAt}
          />
        )))}
        
    </div>
  );
};

export default Blogs;

