import React, { useState } from 'react';
import '../styles/Dashboard.css';
// import { Bell, Home, MessageCircle, Search, Users } from "lucide-react"
import './CustomButton.js';
import CustomButton from './CustomButton.js';
import CreatePostCard from './CreatePostCard.js';
import PostList from './PostList.js';

const mockUser = {
  name: "Ganesh",
  avatar: "/placeholder.jpg",
  college: "State University",
  graduationYear: 2020,
};

const mockTrendingTopics = [
  "Alumni Meetup 2023",
  "Career Transition Tips",
  "Networking Strategies",
  "Grad School Advice",
];

const mockSuggestedConnections = [
  { name: "John", college: "IIT Bombay", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Alice", college: "LPU", avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Bob", college: "RVCE", avatar: "/placeholder.svg?height=40&width=40" },
];

export default function Dashboard() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = () => {
    if (post.trim()) {
      setPosts([{ content: post, author: mockUser.name, timestamp: new Date() }, ...posts]);
      setPost("");
    }
  };

  return (
    <div className="dashboard">
      <header className='header'>
        <div className='header-content'>
          <div className='header-div'>
            <h1 className='title'>GradLink</h1>
          </div>
          <nav className='navbar'>
            <CustomButton icon="Home" />
            <CustomButton icon="Bell" />
            <CustomButton icon="MessageCircle" />
          </nav>
        </div>
      </header>

      <main className='main'>
        <div className='main-class'>
          
          <CreatePostCard post={post} setPost={setPost} onPostSubmit={handlePostSubmit} />
          <PostList posts={posts} />
        </div>
      </main>
    </div>
  );
}