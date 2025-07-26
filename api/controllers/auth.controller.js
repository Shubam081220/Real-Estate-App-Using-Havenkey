import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"

import { configDotenv } from "dotenv";

export const signup= async (req,res,next)=>{
        //body se data nikaalo
        const {userName,email,password} = req.body;
        //validate the data 
        if(!userName || !email || !password){
            res.status(404).json({
                success:false,
                message:"All fields required !!!"
            });
        }
        //hash the password
        const hashedPassword =await bcryptjs.hash(password,12);
        const newUser=new User({userName,email,password:hashedPassword});
        //save the password
        try{
            await newUser.save();
            res.status(201).json({
                newUser,
                success:true,
                message:"Entry created for new User",
            });
        } catch (error) {
            next(error);
        }
  
};

export const signin=async (req,res,next)=>{
    //body se data nikaalo
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        //validate it
        if(!validUser)return next(errorHandler(404,"User not found"));
        //now check the password is matched or not 
        const validPassword=await bcryptjs.compare(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,"Invalid Credentials"));
        //generate the token
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET,{expiresIn:'3d'});
        const {password:pass, ...rest}=validUser._doc; //to hide the password from response
        res.cookie("access_token",token ,{httpOnly:true}).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const google=async (req,res,next)=>{
  try {
    const user=await User.findOne({email:req.body.email});
    if(user){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=user._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest);
    }else{
        const generatedPassword= Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
        const newUser=new User({
            userName:req.body.name.split(" ").join("").toLowerCase()+ Math.random().toString(36).slice(-8),
            email:req.body.email,
            password:hashedPassword,
            avatar:req.body.photo,
        });

        //save this user
        await newUser.save();
        //create the token again 
        const token=jwt.sign({id:newUser._id._id},process.env.JWT_SECRET);
        const {password:pass,...rest}=newUser._doc;
        res
          .cookie('access_token',token,{httpOnly:true})
          .status(200).
          json(rest);
    }
  } catch (error) {
    next(error);
  }
}