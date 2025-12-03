import React from 'react'
import { useState } from 'react'

function ProductList({products, onEdit, onDelete}) {
    
   
  return (
    <div>
        <table border="1" cellPadding="8" width="100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* Product rows will go here */}
                {products && products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td><button onClick={() => onEdit(product.id)}>Edit</button></td>
                        <td><button onClick={() => onDelete(product.id)} style={{ marginLeft: 10 }}>Delete</button></td>
                    </tr>
                ))}    
                 
            </tbody>
        </table>
    </div>
  )
}

export default ProductList