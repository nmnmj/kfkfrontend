import React, { useState } from 'react';
import { publishBlog } from '../services/api';

const Blog = ({ userId }) => {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  const handlePublish = async () => {
    try {
      setStatus('Publishing...');
      const result = await publishBlog(userId, content);
      setStatus(result.status);
      setContent('');
    } catch (error) {
      setStatus('Failed to publish blog.');
    }
  };

  return (
    <div className="blog">
      <h2>UserId: {userId}</h2>
      <h3>Publish a New Blog</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog content here"
      />
      <button onClick={handlePublish}>Publish</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Blog;
