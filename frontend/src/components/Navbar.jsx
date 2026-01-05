import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => (
  <header className="amazon-header">
    <Link to="/" className="brand-logo">amazon<span style={{fontSize:'14px'}}>.demo</span></Link>
    
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Search Amazon" />
      <button className="search-btn">🔍</button>
    </div>

    <div className="nav-links">
      <div className="nav-item">
        <span>Hello, Guest</span>
        <span className="nav-bold">Account & Lists</span>
      </div>
      <Link to="/cart" className="nav-item">
        <span>Returns</span>
        <span className="nav-bold">& Orders</span>
      </Link>
      
      <Link to="/cart" className="nav-item">
        <span className="nav-bold" style={{fontSize: '18px'}}>
          🛒 Cart {cartCount > 0 && `(${cartCount})`}
        </span>
      </Link>
    </div>
  </header>
);

export default Navbar;