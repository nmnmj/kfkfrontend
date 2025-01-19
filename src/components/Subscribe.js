import React, { useState } from 'react';
import { subscribeBlog } from '../services/api';

const Subscribe = ({ subscriberId }) => {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async () => {
    try {
      setStatus('Subscribing...');
      const result = await subscribeBlog(subscriberId, userId);
      setStatus(result.status);
      setUserId('');
    } catch (error) {
      setStatus('Failed to subscribe.');
    }
  };

  return (
    <div className="subscribe">
      <h3>Subscribe to a Blog</h3>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter user ID to subscribe to"
      />
      <button onClick={handleSubscribe}>Subscribe</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Subscribe;
