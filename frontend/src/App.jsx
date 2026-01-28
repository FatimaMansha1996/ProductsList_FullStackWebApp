import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // ----- State for products -----
  const [products, setProducts] = useState([]);

  // ----- State for Add Product form -----
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // ----- State for Edit Product -----
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // ----- Fetch all products (GET) -----
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
        } else {
          setProducts([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // ----- Add new product (POST) -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { 
      name, 
      price: Number(price), 
      category 
    };

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (data.success) {
        setProducts([...products, data.data]); // <-- use data.data
        setName("");
        setPrice("");
        setCategory("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----- Start editing a product -----
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditCategory(product.category);
  };

  // ----- Update product (PUT) -----
  const handleUpdate = async (id) => {
    const updatedProduct = {
      name: editName,
      price: Number(editPrice),
      category: editCategory,
    };

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (data.success) {
        setProducts(products.map((p) => (p.id === id ? data.data : p)));
        setEditingId(null);
        setEditName("");
        setEditPrice("");
        setEditCategory("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----- Delete product (DELETE) -----
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter((p) => p.id !== data.data.id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>🛒 Product Catalog</h1>

      {/* ----- Add Product Form ----- */}
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit" className="add-btn">Add Product</button>
      </form>

      {/* ----- Products List ----- */}
      <h2>Products List</h2>

      {products.length === 0 ? (
        <p className="empty-text">No products available</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-card">
              {editingId === product.id ? (
                <div className="edit-section">
                  <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                  <input type="text" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                  <input type="text" value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                  <div className="actions">
                    <button className="save-btn" onClick={() => handleUpdate(product.id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="product-info">
                    <strong>{product.name}</strong>
                    <span>${product.price}</span>
                    <span className="category">{product.category}</span>
                  </div>
                  <div className="actions">
                    <button className="edit-btn" onClick={() => handleEditClick(product)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
