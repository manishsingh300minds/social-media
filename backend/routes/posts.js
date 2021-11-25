const express = require('express');
const router = express.Router();
const Post = require('../model/dataModel');

router.get("",(req, res) => {
  // then() can be use to get the data received from frontend
  Post.find().then((documents) => {
    res.status(200).json(documents);
  });
});

router.post("",(req, res) => {
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

router.put("/:id",(req,res) => {
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

router.delete("/:id",(req ,res) => {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    // console.log("Deleted result:",result);
    res.status(200).json({
      msg: "Post has been deleted"
    })
  });
})

module.exports = router;
