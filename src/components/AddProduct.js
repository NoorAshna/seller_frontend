import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = ({ addProduct }) => {
  const [product, setProduct] = useState({ id: '', name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product);
    setProduct({ id: '', name: '', price: '' });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input type="number" name="id" value={product.id} onChange={handleChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
