import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductLists.css';
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      // console.log(response);
      // console.log(response.text());
      // let jsonString = JSON.stringify('/products');
      // let data = JSON.parse(jsonString);
      setProducts(data);
      
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // console.log(response);
      // console.log(response.text());
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`/products/${id}`, {
        method: 'DELETE',
      });
      
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };
  // const createProduct = async () => {
  //   try {
  //     const response = await fetch('/products', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id: 4, name: 'New Product', price: 12.99 }),
  //     });
  //     if (response.ok) {
  //       // Refresh the product list after successfully creating a new product
  //       fetchProducts();
  //     } else {
  //       console.error('Failed to create product:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Failed to create product:', error);
  //   }
  // };
  return (
    <div>
      <h1 className="product-list-title" >Product List</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/edit/${product.id}`}>Edit</Link>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
