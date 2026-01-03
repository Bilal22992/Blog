
import express from "express";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (CentOS local or Atlas)
mongoose.connect('mongodb+srv://moon:Moon%40302%23@cluster0.m4ccdtb.mongodb.net/blogDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Define what a "Post" looks like
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model('Post', postSchema);

// API Routes
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

app.post('/api/posts', async (req, res) => {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
});

app.listen(5000, () => console.log("Server running on port 5000"));