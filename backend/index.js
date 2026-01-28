const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// This is important: make sure the path matches your file
const productRoutes = require("./routes/products");
app.use("/products", productRoutes); // <-- This mounts the router

app.get("/", (req, res) => {
  res.send("Product Catalog API is running 🚀");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Product Catalog API is running on http://localhost:${PORT}`);
});
