import React from 'react';
import '../styles/CreatePostCard.css';

const CreatePostCard = ({ post, setPost, onPostSubmit }) => {
  const handlePostSubmit = () => {
    onPostSubmit(); // booooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="header-title">Create a Post</h2>
      </div>
      <div className="card-content">
        <textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          value={post}
          onChange={(e) => setPost(e.target.value)} 
          rows={3}
        />
      </div>
      <div className="card-footer">
        <button className="post-button" onClick={handlePostSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostCard;
