const mongoose = require('mongoose');
const axios = require('axios');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
require('dotenv').config();

exports.getAllBlog = async (req, res) => {
    try {
        const blogs = await blogModel.find({});
        if (!blogs) {
            return res.status(200).send({
                success: false,
                message: "No blog Found"
            })
        }
        return res.status(200).send({
            success: true,
            count: blogs.length,
            message: "blog Found",
            blogs
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error to get all blogs",
            error
        });
    }
}

exports.creatBlog = async (req, res) => {
    try {
        const { title, description, image, user, userName } = req.body;
        // validation
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "please provide all fields",
            });
        }
        const existingUser = await userModel.findById(user);
        if (!existingUser) {
            return res.staus(404).send({
                success: false,
                message: 'unable to find user'
            })
        }
        const newBlog = new blogModel({ title, description, image, user, userName });
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existingUser.blogs.push(newBlog);
        await existingUser.save({ session });
        await session.commitTransaction();

        return res.status(201).send({
            success: true,
            message: "blog created",
            newBlog
        });

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error to create blog",
            error
        });
    }
}

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(201).send({
                success: false,
                message: "please provide id"
            });
        }
        const oneBlog = await blogModel.findById(id);
        console.log(oneBlog);

        return res.status(201).send({
            success: true,
            message: "blog found",
            oneBlog
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error to get blog",
            error
        });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const updated = await blogModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true });
        return res.status(200).send({
            success: true,
            message: "blog updated",
            updated
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error to update",
            error
        });
    }
}

exports.deletBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBlog = await blogModel.findByIdAndDelete(id)
            .populate("user");

        if (!deleteBlog) {
            return res.status(400).send({
                success: false,
                message: "no blog found"
            });
        }

        deleteBlog.user.blogs.pull(id);
        await deleteBlog.user.save();

        return res.status(200).send({
            success: true,
            message: "blog deleted",
            deleteBlog
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error to delete blog",
            error
        });
    }
}

// get all blog of particuler user
// exports.userBlog = async (req, res) => {
//     try {
//         const { id } = req.params; // Remove .id after req.params
//         const userBlogs = await userModel.findById(id).populate('blogs').populate('user');
//         if (!userBlogs) {
//             return res.status(404).send({
//                 success: false,
//                 message: "No blogs found for this user"
//             });
//         }
//         return res.status(200).send({
//             success: true,
//             message: "User has the following blogs",
//             userBlogs
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({
//             success: false,
//             message: "Error while fetching user blogs",
//             error: error.message
//         });
//     }
// }
exports.userBlog = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: "blogs not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "user blogs",
            userBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "error in user blog",
            error,
        });
    }
};

const { GoogleGenerativeAI } = require("@google/generative-ai");
exports.generateDescription = async (req, res) => {
    try {
        const { prompt } = req.body;
        const formattedPrompt = `give me Description about ${prompt} in 30 words`;

        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(formattedPrompt);
        const response = await result.response;
        const text = response.text();

        console.log(text);

        res.json({ success: true, text });
    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({ success: false, error });
    }
};
