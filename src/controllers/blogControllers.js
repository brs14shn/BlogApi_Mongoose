const { BlogCategory, BlogPost } = require("../models/blogModel");

require("express-async-errors");

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    // req.params.categoryId
    // const data = await BlogCategory.findById(req.params.categoryId)
    const data = await BlogCategory.findOne(
      { _id: req.params.categoryId },
      req.body
    );

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await BlogCategory.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },

  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.BlogPost = {
  list: async (req, res) => {

    /* FILTERING & SEARCHING & SORTING & PAGINATION */
    //const search = req.query || {}
   
  //http://127.0.0.1:8000/blog/posts?search[title]=test&filter[published]=1&sort[createdAt]=asc
  // URL?filter[key1]=value1&filter[key2]=value2

   //const search = req.query?.search || {}

    const data = await BlogPost.find().populate("blogCategoryId");
    //const data = await BlogPost.find({published:true})

    // URL?search[key1]=value1&search[key2]=value2
  // https://www.mongodb.com/docs/manual/reference/operator/query/regex/


    // PAGINATION: URL?page=1&limit=10
    //const limit = req.query?.limit || 20
      //let limit = req.query?.limit || (process.env?.PAGE_SIZE || 20)
      //console.log(typeof(limit));
      //limit = Number(limit)
      let limit = Number(req.query?.limit)
      limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)
      console.log('limit', typeof limit, limit)


    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  listCategoryPosts: async (req, res) => {
    const data = await BlogPost.find({
      blogCategoryId: req.params.categoryId,
    }).populate("blogCategoryId");

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    // req.params.postId
    // const data = await BlogPost.findById(req.params.postId)
    const data = await BlogPost.findOne({ _id: req.params.postId }, req.body);

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
    // const data = await BlogPost.findByIdAndUpdate(req.params.postId, req.body, { new: true }) // return new-data
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body);

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await BlogPost.findOne({ _id: req.params.postId }),
    });
  },

  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
