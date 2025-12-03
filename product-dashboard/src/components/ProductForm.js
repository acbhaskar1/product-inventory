import { useState, useEffect } from "react";

const ProductForm = ({ onSubmit, selected}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("");

useEffect(() => {    
    if (selected) {
      setName(selected.name);
      setCategory(selected.category);
      setPrice(selected.price);
}}, [selected]);  

const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, category, price: parseFloat(price) });
    setName('');
    setPrice('');
    setCategory('');

  };

return (  
<>
<form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    <h3>{ selected ? 'Update Product':'Add New Product'}</h3>
    <div>
      <label>
        Product Name:
        <input
          type="text"
          value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />
      </label>
    </div>  
    <div>
      <label>
        Price:
        <input
          type="number"
          value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
        />
      </label>
    </div>
    <div>
      <label>Category:

        <input
        id="category"
        name="category"
        list="categories"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <datalist id="categories">
        <option value="Chose Category"></option>
        <option value="Mobile"></option>
        <option value="Laptop"></option>
        <option value="Accessories"></option>
        <option value="Headphones"></option>
      </datalist>
      </label>
    </div>
    <button type="submit">{ selected ? 'Update':'Add'}</button>
  </form>
  </>
);
}
export default ProductForm;