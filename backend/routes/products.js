const express = require("express");
const router = express.Router();

let products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Headphones", price: 150, category: "Accessories" },
];

// ----- GET all products -----
router.get("/", (req, res) => {
  try {
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----- GET single product by ID -----
router.get("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----- POST new product -----
router.post("/", (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validate input
    if (!name || price === undefined || !category) {
      return res.status(400).json({ success: false, message: "Name, price, and category are required" });
    }

    const newProduct = {
       id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name,
      price,
      category,
    };

    products.push(newProduct);

    res.status(201).json({ success: true, message: "Product created", data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----- PUT update product -----
router.put("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price, category } = req.body;

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (!name && price === undefined && !category) {
      return res.status(400).json({ success: false, message: "At least one field (name, price, category) is required to update" });
    }

    if (name) product.name = name;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;

    res.status(200).json({ success: true, message: "Product updated", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----- DELETE product -----
router.delete("/:id", (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1);

    res.status(200).json({ success: true, message: "Product deleted", data: deletedProduct[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
