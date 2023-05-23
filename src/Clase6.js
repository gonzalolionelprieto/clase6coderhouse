import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const port = 8080;

const productManager = new ProductManager("productos.json");

app.get("/", (req, res) => {
  res.send("Bienvenido al Servidor");
});

app.get("/products", (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    const limitedProducts = productManager.products.slice(0, limit);
    res.json(limitedProducts);
  } else {
    res.json(productManager.products);
  }
});

app.get("/products/:pid", (req, res) => {
  const productId = req.params.pid;

  if (!productId) {
    res.json(productManager.products);
  } else {
    const product = productManager.getProductById(productId);
    res.json(product);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
