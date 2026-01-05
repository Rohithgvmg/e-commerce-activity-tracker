import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ addToCart, logEvent }) => {
  const { id } = useParams();
  const navigate = useNavigate();


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



  
  useEffect(() => {
    logEvent(
      "PRODUCT_VIEW"
    ,{
        productId: id,
        page: "Product Details"
      });
  }, [id, logEvent]); 


  const handleAddToCart = () => {
    console.log(`🛒 User added Product ID: ${id} to cart`);

    logEvent(
      
      "ADD_TO_CART",
      {
        productId: id,
        productName: products[id-1].name,
        price: products[id-1].price
      }
    );

    addToCart(products[id-1]);
    navigate('/cart');
  };

  return (
    <div className="main-content" style={{background:'white', padding:'40px', marginTop:'20px', maxWidth: '800px'}}>
      <h1>{products[id-1].name}</h1>
      
      <br/>
      <div style={{border:'1px solid #ddd', padding:'20px', borderRadius:'8px', display:'inline-block'}}>
        <span style={{fontSize:'24px', fontWeight:'bold', color:'#B12704'}}>${products[id-1].price}</span>
         <br/><br/>
         
         <button 
          className="buy-btn" 
          style={{width:'100%'}} 
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;