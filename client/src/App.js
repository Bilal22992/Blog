import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1. Fetch existing posts from the backend
  const fetchPosts = () => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log("Fetch error:", err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 2. Function to send a new post to the database
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/posts', { title, content })
      .then(() => {
        setTitle('');   // Clear input fields
        setContent('');
        fetchPosts();   // Refresh the list
      })
      .catch(err => console.log("Post error:", err));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>MERN Blog Challenge</h1>

      {/* --- ADD POST FORM --- */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd' }}>
        <h3>Create a New Post</h3>
        <input 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', marginBottom: '10px' }}
          required
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
          required
        />
        <button type="submit">Publish Post</button>
      </form>

      <hr />

      {/* --- DISPLAY POSTS --- */}
      <div>
        <h3>Recent Posts</h3>
        {posts.map(post => (
          <div key={post._id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
            <h4 style={{ margin: '0' }}>{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;