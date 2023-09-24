import { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from './blog';


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/blog');
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data) {
        setBlogs(data.blogs);
      }
    });
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};


export default Blogs;
