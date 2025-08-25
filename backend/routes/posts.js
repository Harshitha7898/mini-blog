const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require("../controllers/postController");

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
