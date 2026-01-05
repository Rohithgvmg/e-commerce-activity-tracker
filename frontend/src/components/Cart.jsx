import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Cart = ({ cartItems, clearCart, logEvent }) => {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
     if (cartItems.length === 0) return;

    cartItems.forEach(item => {
       
        logEvent(
           "PAYMENT_COMPLETED",
            {
            productId: item.id,
            timestamp:new Date().toLocaleString
        });
    });

    

   alert(`Checkout Successful! Total: $${totalPrice.toFixed(2)}`);
    clearCart(); 
   navigate('/'); 
 };

  return (
    <div className="main-content" style={{background:'white', padding:'30px', maxWidth:'1000px', margin: '20px auto'}}>
      <h2 style={{fontSize:'28px'}}>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div>
          <h3 style={{color:'#C40000'}}>Your cart is empty.</h3>
          <p>Go back to <Link to="/">Home</Link> to add items.</p>
        </div>
      ) : (
        <p style={{color:'#007185', cursor:'pointer'}} onClick={clearCart}>Deselect all items</p>
      )}
      
      <hr style={{borderTop:'1px solid #ddd'}} />
      
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
         <div style={{flex: 1, marginRight: '20px'}}>
             {cartItems.map((item, index) => (
                <div key={index} style={{display:'flex', gap:'20px', marginBottom:'20px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
                    <img src={item.img} alt={item.name} style={{width:'80px', height:'80px', objectFit:'contain'}} />
                    <div>
                        <h4 style={{margin:'0 0 5px 0'}}>{item.name}</h4>
                        <span style={{fontWeight:'bold', color:'#B12704'}}>${item.price.toFixed(2)}</span>
                    </div>
                </div>
             ))}
         </div>
         
         <div style={{background:'#f3f3f3', padding:'20px', borderRadius:'8px', height:'fit-content', minWidth:'250px'}}>
            <div style={{fontSize:'18px', marginBottom:'20px'}}>
              Subtotal ({cartItems.length} items): <br/>
              <span style={{fontWeight:'bold', fontSize:'22px'}}>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="buy-btn" 
              style={{background:'#ffd814', padding:'10px 20px', width:'100%', fontSize:'14px'}}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
         </div>
      </div>
    </div>
  );
};

export default Cart;