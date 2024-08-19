const express = require("express");
const Post = require("../Model/postmodel");
const User = require("../Model/usermodel");
const router = express.Router();

router.post("/createpost", async (req, res) => {
    try {
        const content = req.body.content; // Assuming `content` is in the request body
        const autherId = req.body.autherId; // Assuming `autherId` is in the request body
        const picture = req.file;

        if (!picture) {
            return res.status(402).json({ message: "Please insert an image" });
        }

        const post = new Post({ caption: content, auther: autherId, picture: picture.path }); // Assuming `picture.path` gives the file path
        const savePost = await post.save();

        const user=await User.findById(autherId)
        if(user) 
            { user.savepost.push (post._id);
        await user.save()}
        await post.populate({path:'auther',select:"-password"})
        res.status(201).json({message:"newPost added", post});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



router.get("/getallpost",async(req,res)=>{
    try{
        const allPost=await Post.find().sort({createdAt:-1})
        res.status(200).json({
            allPost,
            succes:true
        })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

router.get("/getindividualpost",async(req,res)=>{
    try{
        const authorId=req.id;
        const indPost=await Post.find(autherId).sort({createdAt:-1})
        res.status(200).json({
            indPost,
            succes:true
        })
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

router.post("/likePost",async(req,res)=>{
    try{
        const followingId=req.id;
        const postId=req.params.id
        const likedPost=await Post.findById(postId)
        if(!likedPost){
            res.status(404).json(err)
        }
        await this.post.updateOne({$addToSet:{Likes:followingId}})
        await this.post.save();
        res.status(200).json("postLiked")
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

router.post("/dislikePost",async(req,res)=>{
    try{
        const followingId=req.id;
        const postId=req.params.id
        const likedPost=await Post.findById(postId)
        if(!likedPost){
            res.status(404).json(err)
        }
        await this.post.updateOne({$pull:{Likes:followingId}})
        await this.post.save();
        res.status(201).json("postdisLiked")
    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

router.post("/addComment",async(req,res)=>{
    try{const commentId=req.id;
    const {commentbody}=req.body
    const postId=req.params.id
    const post=await Post.findById(postId);
   if(!commentbody){
    res.status(202).json('write sometihng')
   }
   const comment= await Comment.create({
    text,
    auther:commentId,
    post:postId
   }).populate({
    path:"author",
    select:'username,profilePicture'
   })
   post.comment.push(comment._id);}
   catch(err){
    es.status(407).json(err)
   }
})

module.exports = router;
