import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../services/api';

const BlogList = ({ userId }) => {
  const [blogs, setBlogs] = useState([]);
  const [subscribedToUserIds, setsubscribedToUserIds] = useState([])
  const [ws, setWs] = useState(null);

  // Fetch blogs from subscribed users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBlogs(userId);
        setBlogs(data.blogs);
        setsubscribedToUserIds(data.subscribedToUserIds);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Establish WebSocket connection for real-time updates
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/?userId=${userId}`);
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setBlogs((prevBlogs) => [message, ...prevBlogs]); // Add new blog to the top
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [userId]);

  return (
    <div className="blog-list">
      <h3>Blogs</h3>
      <h4>
        Subscribed to users {subscribedToUserIds.map((item, index) => {
            return (
                <>
                {
                    subscribedToUserIds.length === (index + 1) ?
                    <> 
                        {item}
                    </>
                    :
                    <>
                        {item}{", "}
                    </>
                }
                </>
            )
        })}
      </h4>
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <div key={index} className="blog">
            <h4>User {blog.userId}</h4>
            <p>{blog.content}</p>
          </div>
        ))
      ) : (
        <p>No blogs to display</p>
      )}
    </div>
  );
};

export default BlogList;
