import React, { useState, useEffect } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredProducts = products.filter(p =>
  category === "" ? true : p.category === category
);
  let sorted = [...filtered];
  if (sortBy === "name-asc")
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "name-desc")
    sorted.sort((a, b) => b.name.localeCompare(a.name));
  if (sortBy === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") sorted.sort((a, b) => b.price - a.price);

  const limit = 4;
  const start = (page - 1) * limit;
  const paginated = sorted.slice(start, start + limit);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleAddOrUpdateProduct = async (product) => {
    if (selected) {
      await updateProduct(selected.id, product);
    } else {
      await addProduct(product);
    }
    setSelected(null);
    loadProducts();
  };
  const handleEditProduct = (id) => {
    const productToEdit = products.find((p) => p.id === id);
    setSelected(productToEdit);
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
      <h1>Product Dashboard</h1>

      <ProductForm onSubmit={handleAddOrUpdateProduct} selected={selected} />
      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20, padding: 8, width: "100%" }}
      />
      <select
        onChange={(e) => setSortBy(e.target.value)}
        style={{ marginLeft: 10 }}
      >
        <option value="">Sort By</option>
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
      <input
        id="category"
        name="category"
        list="categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <datalist id="categories">
        <option value="Select Category"></option>
        <option value="Mobile"></option>
        <option value="Laptop"></option>
        <option value="Accessories"></option>
        <option value="Headphones"></option>
      </datalist>
      <ProductList
        products={paginated}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      <div style={{ marginTop: 20 }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button
          disabled={start + limit >= sorted.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
