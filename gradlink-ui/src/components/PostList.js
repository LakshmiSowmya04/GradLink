import React from 'react';
import '../styles/PostList.css';

const Avatar = ({ src, alt, fallback }) => (
  <div className="avatar">
    {src ? (
      <img src={src} alt={alt} className="avatar-image" />
    ) : (
      <div className="avatar-fallback">{fallback}</div>
    )}
  </div>
);

const Button = ({ children, variant = 'default', size = 'default' }) => (
  <button className={`button ${variant} ${size}`}>{children}</button>
);

const PostCard = ({ post }) => (
  <div className="card">
    <div className="card-header">
      <div className="flex-container">
        <Avatar
          src={post.avatar}
          alt={post.author}
          fallback={post.author.charAt(0)}
        />
        <div className="author-info">
          <p className="author-name">{post.author}</p>
          <p className="post-timestamp">{post.timestamp.toLocaleString()}</p>
        </div>
      </div>
    </div>
    <div className="card-content">
      <p>{post.content}</p>
    </div>
    <div className="card-footer">
      <div className="button-container">
        <Button variant="outline" size="sm">Like</Button>
        <Button variant="outline" size="sm">Comment</Button>
        <Button variant="outline" size="sm">Share</Button>
      </div>
    </div>
  </div>
);

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </div>
);

export default PostList;