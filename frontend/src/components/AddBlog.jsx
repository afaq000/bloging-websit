import React,{ useState } from 'react'
import "./AddBlog.css"
import axios from "axios";

import { useNavigate } from "react-router-dom";
// import { useStyles } from "./Utils";


const AddBlog = () => {
  // const classes = useStyles();
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
        <form onSubmit={handleSubmit} className="blog-post-form">
      <h2 className="form-title">Post Your Blog</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={inputs.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageURL">ImageURL</label>
        <input
          type="text"
          id="imageURL"
          name="imageURL"
          value={inputs.imageURL}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
    </div>
  )
}

export default AddBlog
