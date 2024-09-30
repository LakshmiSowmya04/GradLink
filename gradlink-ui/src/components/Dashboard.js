import React, { useState } from "react";

const Dashboard = () => {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = () => {
    setPosts([...posts, post]);
    setPost("");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <textarea
        placeholder="What's on your mind?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button onClick={handlePostSubmit}>Post</button>

      <h3>Posts</h3>
      <ul>
        {posts.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>

      {/* Here you can implement follow and chat functionalities */}
    </div>
  );
};

export default Dashboard;
