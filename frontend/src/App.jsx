import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import './App.css';


import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";


const API_URL = "http://localhost:8080/api/events";
const USER_ID = "user-" + Math.floor(Math.random() * 10000);


const logEvent = (eventType,metadata) => {
  const eventPayload = {
    eventType,
    metadata
  };
  
  console.log("LOGGING EVENT:", eventPayload);
  axios.post(API_URL, eventPayload,
  {
    headers: {
      "Content-Type": "application/json"
    }
  }
).catch(err => console.error("Event Error:", err));
};


const PageTracker = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    logEvent("PAGE_VIEW", { pageUrl: location.pathname });
  }, [location]);
  return children;
};


function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    logEvent("ADD_TO_CART", { productId: product.id, price: product.price });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <PageTracker>
        <Navbar cartCount={cartItems.length} />
        <Routes>
          
          <Route path="/" element={<Home addToCart={addToCart} logEvent={logEvent} />} />
          
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} logEvent={logEvent} />} />
          
          <Route path="/cart" element={<Cart cartItems={cartItems} clearCart={clearCart} logEvent={logEvent} />} />
        </Routes>
      </PageTracker>
    </Router>
  );
}

export default App;



