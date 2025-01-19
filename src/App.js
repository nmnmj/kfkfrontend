import React, { useState } from 'react';
import Blog from './components/Blog';
import Subscribe from './components/Subscribe';
import BlogList from './components/BlogList';
import './App.css';

const App = () => {
  let userid = prompt("Enter your userId")
  const [userId] = useState(userid); // Example userId, ideally should come from authentication

  return (
    <div className="App">
      <h1>Blog Subscription App</h1>
      <Blog userId={userId} />
      <Subscribe subscriberId={userId} />
      <BlogList userId={userId} />
    </div>
  );
};

export default App;
