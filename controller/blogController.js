const blogModel = require('../models/blogModel')

exports.getAllBlog = async (req,res) => {
    try{
        const blogs = await blogModel.find({});
        if(!blogs)
        {
            return res.status(200).send({
                success: false,
                message : "No blog Found"    
            }) 
        }
        return res.status(200).send({
            success: true,
            count:blogs.length,
            message : "blog Found",
            blogs    
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "Error to get all blogs",
            error
        }); 
    } 
}

exports.creatBlog = async (req,res) => {
    try{
        const{title,description,image} = req.body;
        // validation
        if(!title || !description || !image)
        {    
            return res.status(400).send({
            success: false,
            message : "please provide all fields",
            }); 
        }
        const newBlog = new blogModel({title,description,image});
        await newBlog.save();
        return res.status(201).send({
            success: true,
            message : "blog created",
            newBlog
        });

    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success: false,
            message : "Error to create blog",
            error
        }); 
    } 
}

exports.getBlogById = async (req,res) => {
    try{
        const {id} = req.params;
        if(!id)
        {
            return res.status(201).send({
                success: false,
                message : "please provide id"
            }); 
        }
        const oneBlog = await blogModel.findById(id);

        return res.status(201).send({
            success: true,
            message : "blog found",
            oneBlog
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success: false,
            message : "Error to get blog",
            error
        });
    } 
}

exports.updateBlog = async (req,res) => {
    try{
        const { id } = req.params;
        const{title,description,image} = req.body;
        const updated = await blogModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new:true});
        return res.status(200).send({
            success: true,
            message : "blog updated",
            updated
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success: false,
            message : "Error to update",
            error
        }); 
    } 
}

exports.deletBlog = async (req,res) => {
    try{
        const {id} =  req.params;
        const deleteBlog = await  blogModel.findByIdAndDelete(id);

        return res.status(200).send({
            success: true,
            message : "blog deleted",
            deleteBlog
        });
    }
    catch(error)
    {
        console.log(error);
        return res.status(400).send({
            success: false,
            message : "Error to delete blog",
            error
        }) 
    } 
}

