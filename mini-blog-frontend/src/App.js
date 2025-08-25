import React, { useState, useEffect } from "react";
import { registerUser, loginUser, getPostsWithParams, createPost } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchPosts = () => {
    getPostsWithParams(page, 5, search).then(res => setPosts(res.data.posts));
  };

  useEffect(() => { fetchPosts(); }, [page, search]);

  const handleRegister = async () => {
    try { await registerUser(form); alert("User registered! Login now."); }
    catch { alert("Register failed"); }
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      localStorage.setItem("token", res.data.token);
      setUser({ email: form.email });
      alert("Login successful!");
    } catch { alert("Login failed"); }
  };

  const handleCreatePost = async () => {
    try {
      await createPost(newPost);
      setNewPost({ title: "", content: "" });
      fetchPosts();
    } catch { alert("Must be logged in"); }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Blog</h1>

      {!user ? (
        <div>
          <h2>Register / Login</h2>
          <input placeholder="Username" value={form.username} onChange={e => setForm({...form, username:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : <h2>Welcome {user.email}</h2>}

      <h2>Create Post</h2>
      <input placeholder="Title" value={newPost.title} onChange={e => setNewPost({...newPost, title:e.target.value})} />
      <textarea placeholder="Content" value={newPost.content} onChange={e => setNewPost({...newPost, content:e.target.value})}></textarea>
      <button onClick={handleCreatePost}>Post</button>

      <h2>Search Posts</h2>
      <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />

      <h2>All Posts</h2>
      <ul>
        {posts.map(p => <li key={p.id}><b>{p.title}</b>: {p.content}</li>)}
      </ul>

      <div>
        <button onClick={() => setPage(p => Math.max(1, p-1))}>Prev</button>
        <span> Page {page} </span>
        <button onClick={() => setPage(p => p+1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
