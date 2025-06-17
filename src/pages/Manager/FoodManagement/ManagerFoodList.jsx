"use client"

import { useState } from "react"
import Sidebar from "../ManagerSidebar/Sidebar.jsx"
import "./ManagerFoodList.css"

const initialFoodList = [
  {
    name: "Vegetarian Pizza",
    category: "Main Course",
    price: 65000,
    status: "Active",
    description:
      "Delicious vegetarian pizza with fresh vegetables, bell peppers, mushrooms, and mozzarella cheese on a crispy thin crust",
    stock_quantity: 10,
    image_url: "",
  },
  {
    name: "Boiled Artichoke with Mustard Sauce",
    category: "Main Course",
    price: 55000,
    status: "Active",
    description:
      "Fresh artichoke served with homemade mustard sauce, garnished with herbs and served with crusty bread",
    stock_quantity: 20,
    image_url: "",
  },
  {
    name: "Gourd Soup with Mushroom & Beetroot",
    category: "Special",
    price: 85000,
    status: "Inactive",
    description:
      "Special soup with organic ingredients including fresh gourd, wild mushrooms, and roasted beetroot in a rich vegetable broth",
    stock_quantity: 15,
    image_url: "",
  },
  {
    name: "Vegan Condensed Milk",
    category: "Dessert",
    price: 45000,
    status: "Active",
    description:
      "Creamy vegan condensed milk dessert made from coconut milk and natural sweeteners, perfect for a guilt-free treat",
    stock_quantity: 25,
    image_url: "",
  },
]

const ManagerFoodList = () => {
  const [foodList, setFoodList] = useState(initialFoodList)
  const [editingIndex, setEditingIndex] = useState(null)
  const [newFood, setNewFood] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock_quantity: "",
    image_url: "",
    status: "Active",
  })
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showAddPopup, setShowAddPopup] = useState(false)

  const handleEditClick = (index) => {
    setEditingIndex(index)
    setNewFood({ ...foodList[index] })
    setShowEditPopup(true)
  }

  const handleDetailClick = (index) => {
    // Chuyển hướng đến trang chi tiết
    window.location.href = `#/food-detail/${index}`
  }

  const handleSaveEdit = () => {
    const updated = [...foodList]
    updated[editingIndex] = newFood
    setFoodList(updated)
    setShowEditPopup(false)
    setEditingIndex(null)
  }

  const handleAddClick = () => {
    setNewFood({
      name: "",
      category: "",
      price: "",
      description: "",
      stock_quantity: "",
      image_url: "",
      status: "Active",
    })
    setShowAddPopup(true)
  }

  const handleAddSave = () => {
    setFoodList([...foodList, newFood])
    setShowAddPopup(false)
  }

  const handleCancel = () => {
    setShowEditPopup(false)
    setShowAddPopup(false)
    setEditingIndex(null)
    setNewFood({
      name: "",
      category: "",
      price: "",
      description: "",
      stock_quantity: "",
      image_url: "",
      status: "Active",
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewFood({ ...newFood, [name]: value })
  }

  const handleDeleteClick = (index) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      const updated = foodList.filter((_, i) => i !== index)
      setFoodList(updated)
    }
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h3>Food Management</h3>
        <p>Manage and monitor restaurant dishes</p>

        <div className="food-header">
          <input type="text" placeholder="Search food..." className="search-input" />
          <button className="add-food-btn" onClick={handleAddClick}>
            + Add Food
          </button>
        </div>

        <table className="food-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index}>
                <td>{food.name}</td>
                <td>{food.category}</td>
                <td>{food.price.toLocaleString()}đ</td>
                <td>
                  <span className={`badge ${food.status === "Active" ? "active" : "inactive"}`}>{food.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="detail-btn" onClick={() => handleDetailClick(index)}>
                      Detail
                    </button>
                    <button className="edit-btn" onClick={() => handleEditClick(index)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(index)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {(showEditPopup || showAddPopup) && (
          <div className="popup-overlay" onClick={handleCancel}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
              <h4>{showEditPopup ? "Edit Food Item" : "Add New Food Item"}</h4>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Food Name *</label>
                  <input
                    id="name"
                    name="name"
                    value={newFood.name}
                    onChange={handleChange}
                    placeholder="Enter food name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select id="category" name="category" value={newFood.category} onChange={handleChange} required>
                    <option value="">Select category</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Special">Special</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price (VND) *</label>
                  <input
                    id="price"
                    name="price"
                    value={newFood.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    type="number"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock_quantity">Stock Quantity *</label>
                  <input
                    id="stock_quantity"
                    name="stock_quantity"
                    value={newFood.stock_quantity}
                    onChange={handleChange}
                    placeholder="Enter stock quantity"
                    type="number"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={newFood.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="image_url">Image URL</label>
                  <input
                    id="image_url"
                    name="image_url"
                    value={newFood.image_url}
                    onChange={handleChange}
                    placeholder="Enter image URL"
                    type="url"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={newFood.description}
                    onChange={handleChange}
                    placeholder="Enter detailed description of the food item..."
                    rows="3"
                  />
                </div>
              </div>

              <div className="popup-actions">
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="save-btn" onClick={showEditPopup ? handleSaveEdit : handleAddSave}>
                  {showEditPopup ? "Update Food" : "Add Food"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ManagerFoodList
