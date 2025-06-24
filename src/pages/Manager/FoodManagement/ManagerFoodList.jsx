"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../ManagerSidebar/ManagerSidebar.jsx"
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
  const navigate = useNavigate()
  const [foodList, setFoodList] = useState(initialFoodList)

  const handleEditClick = (index) => {
    // Navigate to edit page with food ID
    navigate(`/manager-edit-food/${index}`)
  }

  const handleDetailClick = (index) => {
    // Chuyển hướng đến trang chi tiết
    navigate(`/food-detail/${index}`)
  }

  const handleAddClick = () => {
    // Navigate to add food page
    navigate("/manager-add-food")
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
        <div className="food-management-header">
          <div className="header-content">
            <h3>Food Management</h3>
            <p>Manage and monitor restaurant dishes</p>
          </div>
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-number">{foodList.length}</span>
              <span className="stat-label">Total Items</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{foodList.filter((food) => food.status === "Active").length}</span>
              <span className="stat-label">Active</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{foodList.filter((food) => food.status === "Inactive").length}</span>
              <span className="stat-label">Inactive</span>
            </div>
          </div>
        </div>

        <div className="food-header">
          <input type="text" placeholder="Search food..." className="search-input" />
          <button className="add-food-btn" onClick={handleAddClick}>
            <span className="add-icon">+</span>
            Add Food
          </button>
        </div>

        <table className="food-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foodList.map((food, index) => (
              <tr key={index}>
                <td>
                  <div className="food-info">
                    {food.image_url && (
                      <img src={food.image_url || "/placeholder.svg"} alt={food.name} className="food-thumbnail" />
                    )}
                    <span className="food-name">{food.name}</span>
                  </div>
                </td>
                <td>
                  <span className="category-tag">{food.category}</span>
                </td>
                <td className="price-cell">{food.price.toLocaleString()}đ</td>
                <td className="stock-cell">
                  <span className={`stock-badge ${food.stock_quantity < 10 ? "low-stock" : ""}`}>
                    {food.stock_quantity}
                  </span>
                </td>
                <td>
                  <span className={`badge ${food.status === "Active" ? "active" : "inactive"}`}>{food.status}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="detail-btn" onClick={() => handleDetailClick(index)} title="View Details">
                      Detail
                    </button>
                    <button className="edit-btn" onClick={() => handleEditClick(index)} title="Edit">
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(index)} title="Delete">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {foodList.length === 0 && (
          <div className="empty-state">
            <div className="empty-content">
              <div className="empty-icon">🍽️</div>
              <h4>No food items yet</h4>
              <p>Start by adding your first food item to the menu</p>
              <button className="add-first-btn" onClick={handleAddClick}>
                Add First Food Item
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ManagerFoodList
