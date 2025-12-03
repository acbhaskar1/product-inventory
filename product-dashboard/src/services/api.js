const API_URL = "http://localhost:5000";

export async function fetchProducts() {
  const res = await fetch(`${API_URL}/products`);
  //console.log("Fetch Products Response:", res);
  
  if (!res.ok) {
    throw new Error(res.status || "Failed to fetch products");
  }
  const data = await res.json();
  return data;
}

export async function addProduct(product) {
  console.log("Adding Product:", product);
  const res = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  console.log("Add Product Response:", res);
  return res.json();
}

export async function updateProduct(id, product) {
  
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
