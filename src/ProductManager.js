import { readFileSync, writeFileSync } from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.readProducts();
  }

  readProducts() {
    try {
      const data = readFileSync(this.path, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.log("Error al leer el archivo de productos:", error.message);
    }
  }

  writeProducts() {
    try {
      writeFileSync(this.path, JSON.stringify(this.products), "utf-8");
    } catch (error) {
      console.log(
        "Error al escribir en el archivo de productos:",
        error.message
      );
    }
  }

  generateId() {
    if (this.products.length === 0) {
      return 1;
    }
    const lastProductId = this.products[this.products.length - 1].id;
    return lastProductId + 1;
  }

  addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    const id = this.generateId();
    this.products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    this.writeProducts();
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const productId = parseInt(id); 
    const product = this.products.find((p) => p.id === productId);
    if (product) {
      return product; 
    } else {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.writeProducts();
    } else {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.writeProducts();
    } else {
      throw new Error(`Producto con ID ${id} no encontrado.`);
    }
  }
}



export { ProductManager };
