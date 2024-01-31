const express = require('express');
const { getAllBlog, creatBlog, getBlogById, updateBlog, deletBlog } = require('../controller/blogController');

const router = express.Router();

// all blogs
router.get('/all-blog',getAllBlog);
// create blogs
router.post('/create-blog',creatBlog);
// get single blog
router.get('/get-blog/:id',getBlogById)
// update blogs
router.put('/update-blog/:id',updateBlog);
// delete blogs
router.delete('/delete-blog/:id',deletBlog);

module.exports = router;
