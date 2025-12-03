const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
//const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/product", (req, res) => {
    console.log("Request Body:", req.body);
  const { name, price, category } = req.body;

  const sql = "INSERT INTO products (name, category, price) VALUES (?, ?, ?)";

  db.query(sql, [name, category, price], (err) => {
    if (err) {
      return res.status(500).json({ message: "Insert Failed", error: err });
    }

    // Fetch AFTER insert
    db.query("SELECT * FROM products", (err2, result2) => {
      if (err2) {
        return res.status(500).json({ message: "Fetch Failed", error: err2 });
      }

      return res.json(result2);  // ONLY RESPONSE SENT
    });
  });
});

// 
app.get('/products', (req, res) => {
    db.query("SELECT * FROM products", (err2, result2) => {
      if (err2) return res.status(500).json({ message: "Fetch Failed", error: err2 });
      return res.json(result2);
    });
});

app.put('/product/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const sql = 'UPDATE products SET name = ?, category = ?, price = ? WHERE id = ?';
    db.query(sql, [name, category, price, id], (err, result) => {
        if (err) return res.status(500).json({ message: "Update Failed", error: err });
        return res.json({ message: "Product Updated" });
    });
});
app.delete("/product/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ message: "Delete Failed", error: err });
    }

    db.query("SELECT * FROM products", (err2, result2) => {
      if (err2) {
        return res.status(500).json({ message: "Fetch Failed", error: err2 });
      }

      return res.json(result2);  // ONLY RESPONSE SENT
    });
  });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});