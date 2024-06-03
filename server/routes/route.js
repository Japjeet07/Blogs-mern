import express from 'express';
import { signupUser,loginUser } from '../controller/usercontroller.js';
import { CreatePost,getAllPosts,getPost,updatePost,deletePost } from '../controller/post-contoller.js';
import { authenticateToken } from '../controller/jwt-contoller.js';
import { newComment ,getComments,deleteComment} from '../controller/comment-contoller.js';

const router=express.Router();

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/create',authenticateToken,CreatePost);
router.get('/posts',authenticateToken,getAllPosts);
router.get('/post/:id', authenticateToken, getPost);
router.put('/update/:id',authenticateToken,updatePost)
router.delete('/delete/:id',authenticateToken,deletePost);
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);



export default router;