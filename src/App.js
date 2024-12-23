import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/videos", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setVideos);
    }
  }, [token]);

  const handleLogin = async (username, password) => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
  };

  return (
    <div className="container">
      {!token ? (
        <div className="login-form">
          <input type="text" placeholder="Username" id="username" />
          <input type="password" placeholder="Password" id="password" />
          <button onClick={() => handleLogin(username.value, password.value)}>
            Login
          </button>
        </div>
      ) : (
        <div className="videos-section">
          <h1>Your Videos</h1>
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <h2>{video.title}</h2>
              <p>{video.description}</p>
              <video controls>
                <source src={`http://localhost:5000/uploads/${video._id}`} />
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
