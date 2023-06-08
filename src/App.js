import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Import components
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await fetch('/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      setProducts([...products, data]);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      setProducts(products.map((product) => (product.id === id ? data : product)));
    } catch (error) {
      console.error('Failed to update product:', error);
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

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList products={products} deleteProduct={deleteProduct} />} />
          <Route path="/add" element={<AddProduct addProduct={addProduct} />} />
          <Route path="/edit/:id" element={<EditProduct updateProduct={updateProduct} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
