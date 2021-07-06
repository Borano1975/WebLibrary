import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Web Library</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/login" className="nav-link">Admin Login</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Book</Link>
            </li>
            <li className="navbar-item">
              <Link to="/api" className="nav-link">API Help</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}