import React from 'react';
import { Link } from 'react-router-dom';


const Home = ({ addToCart, logEvent }) => {
  const products = [
    { 
      id: 1, 
      name: "Apple iPhone 15 Pro (128 GB) - Natural Titanium", 
      price: 999.00, 
      img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 2, 
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", 
      price: 348.00, 
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 3, 
      name: "Logitech MX Master 3S Performance Wireless Mouse", 
      price: 99.99, 
      img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 4, 
      name: "Samsung 49\" Odyssey OLED G9 Gaming Monitor", 
      price: 1199.99, 
      img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 5, 
      name: "Herman Miller Aeron Ergonomic Chair - Graphite", 
      price: 1250.00, 
      img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=300&q=80" 
    }
  ];

  return (
    <div className="main-content">
      <div className="product-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.img} alt={p.name} className="product-image" />
            <Link 
              to={`/product/${p.id}`} 
              className="product-title"
             
              onClick={() => logEvent("PRODUCT_CLICK", { productId: p.id, name: p.name })}
              style={{textDecoration:'none', color:'#007185'}}
            >
              {p.name}
            </Link>
            <div className="product-price"><span className="price-symbol">$</span>{p.price.toFixed(2)}</div>
            <div style={{fontSize:'12px', color:'#565959', marginBottom:'10px'}}>
              Delivery by <span style={{fontWeight:'bold'}}>Tomorrow</span>
            </div>
            <button 
              className="buy-btn"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;