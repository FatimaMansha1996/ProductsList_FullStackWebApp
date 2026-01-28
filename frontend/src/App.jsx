import { useEffect, useState } from "react";

function App() {
  // ----- State for products -----
  const [products, setProducts] = useState([]);

  // ----- State for Add Product form -----
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");       // Price as string
  const [category, setCategory] = useState("");

  // ----- State for Edit Product -----
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");  // Price as string
  const [editCategory, setEditCategory] = useState("");

  // ----- Fetch all products (GET) -----
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // ----- Add new product (POST) -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { 
      name, 
      price: Number(price),   // convert to number before sending
      category 
    };

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      setProducts([...products, data]);

      // Clear form
      setName("");
      setPrice("");
      setCategory("");
    } catch (err) {
      console.error(err);
    }
  };

  // ----- Start editing a product -----
  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString()); // convert number to string
    setEditCategory(product.category);
  };

  // ----- Update product (PUT) -----
  const handleUpdate = async (id) => {
    const updatedProduct = {
      name: editName,
      price: Number(editPrice),   // convert to number before sending
      category: editCategory,
    };

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      // Update products state
      setProducts(products.map((p) => (p.id === id ? data : p)));

      // Clear edit state
      setEditingId(null);
      setEditName("");
      setEditPrice("");
      setEditCategory("");
    } catch (err) {
      console.error(err);
    }
  };

  // ----- Delete product (DELETE) -----
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Catalog</h1>

      {/* ----- Add Product Form ----- */}
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"           // changed from "number" to "text"
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
        <button type="submit">Add Product</button>
      </form>

      {/* ----- Products List ----- */}
      <h2>Products List</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: "10px" }}>
              {editingId === product.id ? (
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <input
                    type="text"           // changed from "number" to "text"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(product.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{product.name}</strong> – ${product.price} ({product.category})
                  <button onClick={() => handleEditClick(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
