const express = require('express');
const router = express.Router();
const Post = require('../model/dataModel');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
}

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error= new Error('invalid mime type');
    if(isValid){
      error = null;
    }
    callBack(error, "backend/images");
  },
  filename: (req, file, callBack) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callBack(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.get("/listing",(req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  console.log(req.query);
  const postQuery = Post.find();
  let fetchedPost;
  if(pageSize && currentPage){
    postQuery
        .skip(pageSize * (currentPage-1))
        .limit(pageSize)
  }
  // then() can be use to get the data received from frontend
  postQuery.then((documents) => {
    fetchedPost = documents;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      msg : "Posts fetched successfully",
      posts : fetchedPost,
      maxPosts: count
    })
  })
});

router.post("/create", multer({storage: storage}).single('image'), (req, res) => {
  // protocol http / https ---> :// for full url
  const url = req.protocol + '://' + req.get("host");
  const postData = new Post({
    title : req.body.title,
    description : req.body.description,
    image: url + "/images/" + req.file.filename
  });
  postData.save().then(addedPost => {
    res.status(201).json({
      msg: "Added the new post successfully",
      post: {
        ...addedPost,
        id : addedPost._id,
      }
    });
  });
})

router.put("/create/:id",  multer({storage: storage}).single('image'),(req,res) => {
  let imagePath = req.body.image;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const editedPost = new Post({
    _id : req.params.id,
    title : req.body.title,
    description : req.body.description,
    image : imagePath
  });
  Post.updateOne({_id : req.params.id},editedPost).then(result => {
    res.status(200).json({
      msg : 'Update successful'
    });
  });
})

router.delete("/listing/:id",(req ,res) => {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    res.status(200).json({
      msg: "Post has been deleted"
    })
  });
})

module.exports = router;
