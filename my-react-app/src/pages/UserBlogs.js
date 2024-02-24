import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';
import BlogCard from '../components/BlogCard';


const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      console.log(id);
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`); 
      console.log(data);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
          id={blog._id}
          isUser={true}
          title={blog.title}
          description={blog.description}
          image={blog.image}
          username={blog.user.username}
          time={blog.createdAt}
          />
        ))
      ) : (
        <h1>not found blogs</h1>
      )}
    </div>
  );
};

export default UserBlogs;
