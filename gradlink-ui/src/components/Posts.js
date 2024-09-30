import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/auth/posts");
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { id } = jwt.decode(token); // Decode JWT to get userId
    await axios.post("http://localhost:5000/api/auth/posts", {
      content,
      userId: id,
    });
    setContent("");
    const { data: updatedPosts } = await axios.get(
      "http://localhost:5000/api/auth/posts"
    );
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post._id}>
            <h4>{post.userId.username}</h4>
            <p>{post.content}</p>
            <small>{new Date(post.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
