import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const publishBlog = async (userId, content) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/publish`, { userId, content });
    return response.data;
  } catch (error) {
    console.error('Error publishing blog:', error);
  }
};

export const subscribeBlog = async (subscriberId, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subscribe`, { subscriberId, userId });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to blog:', error);
  }
};

export const fetchBlogs = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch-blogs`, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
};
