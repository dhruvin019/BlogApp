// import React, { useState, useEffect } from 'react'; // Import useEffect
// import axios from 'axios';
// import BlogCard from '../components/BlogCard';



// const UserBlogs = () => {
//   const [blogs, setBlogs] = useState([]);

//   const getUserBlogs = async () => {
//     try {
//       const id = localStorage.getItem('userId');
//       // console.log(id);
//       const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`); 
//       console.log(data);
//       if (data?.success) {
//         setBlogs(data?.userBlog.blogs);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getUserBlogs();
//   }, []);

//   return (
//     <div>
//       {blogs && blogs.length > 0 ? (
//         blogs.map((blog) => (
//           <BlogCard
//           title={blog.title}
//           description={blog.description}
//           image={blog.image}
//           username={blog.user.username}
//           time={blog.createdAt}
//           id={blog._id}
//           isUser={true}
//           />
//           // <h4>{blog.title}</h4>
//         ))
//       ) : (
//         <h1>not found blogs</h1>
//       )}
//     </div>
//   );
// };

// export default UserBlogs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading,setLoading] = useState(false);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      setLoading(true);
      const id = localStorage.getItem("userId");
      console.log(id);
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {loading ? <Spinner/> :
        blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            // id={blog._id}
            // title={blog.title}
            // description={blog.description}
            // image={blog.image}
            // username={blog.userName}
            // time={blog.createdAt}
            // isUser={true}  
            id={blog?._id}
            isUser={true}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            userName={blog?.userName}
            time={blog.createdAt}        
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;