import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";
// Then you can use mongoose for creating models, schemas, and interacting with the database




//to find all blogs
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate('user')
    } catch (err) {
        return console.log(err)
    }
    if (!blogs) {
        return res.status(404).json({ message: "Blogs is Not find" })
    }
    return res.status(200).json({ blogs })

}


//create blogs
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);

        if (!existingUser) {
            return res.status(400).json({ message: "Unable to find user by ID" });
        }
        const blog = new Blog({
            title,
            description,
            image,
            user,
        });
        await blog.save();
        existingUser.blogs.push(blog);
        await existingUser.save();
        return res.status(201).json({ message: "Blog post created successfully", blog });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//update blogs
export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update the Blog" });
    }
    return res.status(200).json({ blog })

}


//find blog by id

export const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id)

    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "no blog found" })
    }
    return res.status(200).json({ blog })

}


//delete blog
export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog);

    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(404).json({ message: "unabale to delete" });
    }
    return res.status(200).json({ message: "Successfully Delete" })
}



//geting the blogs of the user
export const getByUserId = async (req, res, next) => {
    const userId= req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");

    }catch(err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(404).json({message:"No Blogs Founds"});
    }
    return res.status(201).json({user:userBlogs})



}