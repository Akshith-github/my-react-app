// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Home Page!</h1>
      <p>Click <Link to="/form">here</Link> to go to the Form Page.</p>
    </div>
  );
}

export default Home;
