"use strict"
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require('express').Router()

// Call Controllers:
const {BlogCategory,  BlogPost } = require('../controllers/blogControllers')

// ------------------------------------------
// BlogPost
// ------------------------------------------


router.route('/post')
.get(BlogPost.list)
.post(BlogPost.create)

router.route('/post/:postId')
.get(BlogPost.read)
.put(BlogPost.update)
.delete(BlogPost.delete)





router.route('/category')
    .get(BlogCategory.list)
    .post(BlogCategory.create)

router.route('/category/:categoryId')
    .get(BlogCategory.read)
    .put(BlogCategory.update)
    .patch(BlogCategory.update)
    .delete(BlogCategory.delete)




module.exports = router