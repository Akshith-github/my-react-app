// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link , Outlet} from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



import FormPage from './FormPage';
import ApiUsagePage from './ApiUsage';

function App() {
  // Scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll to bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };
  return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <Link className="navbar-brand" to="/">APOD</Link>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/form">Form</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/usage">Usage</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          
          {/* Button to navigate to top and bottom of the page */}
        <div className="scroll-btn">
          <button className="btn btn-primary mr-2" onClick={scrollToTop}>
            <i className="bi bi-arrow-up"></i>
          </button>
          <button className="btn btn-primary" onClick={scrollToBottom}>
            <i className="bi bi-arrow-down"></i>
          </button>
        </div>

        {/* Custom styles for scroll button */}
        <style jsx>{`
          .scroll-btn {
            position: fixed;
            right: 2px;
            bottom: 20px;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
        `}</style>
        </div>
        <Outlet/>
      </React.Fragment>
  );
}

export default App;
