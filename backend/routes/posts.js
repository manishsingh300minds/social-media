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
    // const isValid = MIME_TYPE_MAP[file.mimetype];
    // let error= new Error('invalid mime type');
    // if(isValid){
    //   console.log("Image type is valid")
    //   error = null;
    // }
    // console.log(error)

    callBack(null, "backend/images")
  },
  filename: (req, file, callBack) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log("filename",name);
    callBack(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.get("/listing",(req, res) => {
  // then() can be use to get the data received from frontend
  Post.find().then((documents) => {
    res.status(200).json(documents);
  });
});

router.post("/create", multer({storage: storage}).single('image'), (req, res) => {
  console.log(req.body)
  const postData = new Post({
    title : req.body.title,
    description : req.body.description
  });
  postData.save().then(addedPost => {
    console.log('added data',addedPost);
    res.status(201).json({
      msg: "Added the new post successfully",
      postId: addedPost._id
    });
  });
})

router.put("/create/:id",(req,res) => {
  const editedPost = new Post({
    _id : req.params.id,
    title : req.body.title,
    description : req.body.description,
  });
  console.log('Received =>',req.params.id,'\nPost =>',editedPost);

  Post.updateOne({_id : req.params.id},editedPost).then(result => {
    console.log('On update', result)
    res.status(200).json({
      msg : 'Update successful'
    });
  });
})

router.delete("/listing/:id",(req ,res) => {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    // console.log("Deleted result:",result);
    res.status(200).json({
      msg: "Post has been deleted"
    })
  });
})

module.exports = router;
