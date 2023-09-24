import  express  from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs"



export const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users=await User.find();
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"no user found"});
    }
    return res.status(200).json({users:users})
}


//sign up
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred" });
    }

    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Specify the number of salt rounds

    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        blogs: [],
    });

    try {
        await user.save(); // Use `save()` instead of `sava()`
        return res.status(201).json({ user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while saving the user" });
    }
};

//for login

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email });
    } catch (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
  
    if (!existingUser) {
      return res.status(404).json({ message: "Couldn't find user with this email" });
    }
  
    if (!existingUser.password) {
      return res.status(500).json({ message: 'User password is missing or invalid' });
    }
  
    try {
      const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      return res.status(200).json({ message: 'Login successful', user: existingUser });
    } catch (err) {
      console.error('Password comparison error:', err);
      return res.status(500).json({ message: 'Password comparison error' });
    }
  };
  