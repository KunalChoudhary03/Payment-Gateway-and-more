import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./App.css";
import PaymentButton from './PaymentButton';

const App = () => {
const handleBuyNow = () => {
  const userConfirm = window.confirm("Are you sure you want to proceed with the payment?");
  
  if (userConfirm) {
    alert("Payment processing started...");
  } else {
    alert("Payment cancelled.");
  }
};

  const [products, setProducts] = useState([]);
useEffect(() => {
  axios.get("http://localhost:3000/api/products/get-Item") 
    .then(response => setProducts(response.data.products))
    .catch(err => console.log(err));
}, []);

return (
  <div className="container">
    {products.map((product) => (
      <div className="card" key={product._id}>
        <img src={product.image} alt={product.title} className="card-img" />
        <h2 className="card-title">{product.title}</h2>
        <p className="card-description">{product.description}</p>
        <h3 className="card-price">₹ {product.price.amount / 100}</h3>
        <PaymentButton product={product} />
      </div>
    ))}
  </div>
);
}

export default App;
