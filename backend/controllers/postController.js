const posts = require("../models/post");

exports.getAllPosts = (req, res) => {
  let { page = 1, limit = 5, search = "" } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  // Search by title (case-insensitive)
  let filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  res.json({
    totalPosts: filteredPosts.length,
    page,
    limit,
    posts: paginatedPosts
  });
};

exports.getPostById = (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: "All fields required" });
  const newPost = { id: posts.length + 1, title, content, userId: req.user.id };
  posts.push(newPost);
  res.json(newPost);
};

exports.updatePost = (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  res.json(post);
};

exports.deletePost = (req, res) => {
  const index = posts.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });
  if (posts[index].userId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
};
