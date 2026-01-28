const express = require("express");
const router = express.Router();

let products = [
  { id: 1, name: "Laptop", price: 1200, category: "Electronics" },
  { id: 2, name: "Headphones", price: 150, category: "Accessories" },
];

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});
router.post("/", (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
// ------------------- PUT update product -------------------
router.put("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, price, category } = req.body;

  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  // Update fields if provided
  if (name) product.name = name;
  if (price) product.price = price;
  if (category) product.category = category;

  res.json(product);
});
// ------------------- DELETE product -------------------
router.delete("/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === productId);
  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const deletedProduct = products.splice(index, 1);
  res.json({ message: "Product deleted", product: deletedProduct[0] });
});

module.exports = router;
