import React from 'react'
import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BlogDetail.css"

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  };




  return (
    
      <div>
      {inputs && (
        <form onSubmit={handleSubmit} className="blog-edith-form">
          <div className="form-container"> {/* Apply the Material-UI styles */}
            <h2 className="form-heading">
              Post Your Blog
            </h2>
            <label className="form-label">Title</label>
            <input
             type="text"
              name="title"
              onChange={handleChange}
              value={inputs.title}
            
            />
            <label className="form-label">Description</label>
            <input
             type="text"
              name="description"
              onChange={handleChange}
              value={inputs.description}
            
            />

<label htmlFor="imageURL">ImageURL</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={inputs.imageURL}
          onChange={handleChange}
        />

            <button
              className="form-submit" 
             
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


  
export default BlogDetail
