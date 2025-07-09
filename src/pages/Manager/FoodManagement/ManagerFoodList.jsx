"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../ManagerSidebar/ManagerSidebar.jsx"
import { getProducts, deleteProduct } from "../../../api/product"
import "./ManagerFoodList.css"

const ManagerFoodList = () => {
  const navigate = useNavigate()
  const [foodList, setFoodList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      navigate("/login");
      return;
    }
    const { role } = JSON.parse(user);
    if (role !== "manager") {
      navigate("/");
      return;
    }
    getProducts()
      .then((data) => setFoodList(data))
      .catch(() => setFoodList([]))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleEditClick = (product_id) => {
    navigate(`/manager-edit-food/${product_id}`)
  }

  const handleDetailClick = (product_id) => {
    navigate(`/manager-food-detail/${product_id}`)
  }

  const handleAddClick = () => {
    navigate("/manager-add-food")
  }

  const handleDeleteClick = async (product_id) => {
    if (window.confirm("Are you sure you want to delete this food item?")) {
      try {
        await deleteProduct(product_id);
        setFoodList(foodList.filter((food) => food.product_id !== product_id));
        alert('Delete food successfully!');
      } catch (err) {
        alert('Delete food failed!');
      }
    }
  };

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

        {loading ? (
          <div className="text-center my-5">Loading...</div>
        ) : (
          <>
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                marginBottom: 24,
              }}
            >
              <table className="food-table" style={{ width: "100%", tableLayout: "fixed" }}>
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
              </table>
              <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <table className="food-table" style={{ width: "100%", tableLayout: "fixed" }}>
                  <tbody>
                    {foodList.map((food) => (
                      <tr key={food.product_id}>
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
                          <span className={`badge ${food.status === "Active" ? "active" : "inactive"}`}>{food.status || "Active"}</span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="detail-btn" onClick={() => handleDetailClick(food.product_id)} title="View Details">
                              Detail
                            </button>
                            <button className="edit-btn" onClick={() => handleEditClick(food.product_id)} title="Edit">
                              Edit
                            </button>
                            <button className="delete-btn" onClick={() => handleDeleteClick(food.product_id)} title="Delete">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {foodList.length === 0 && !loading && (
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
          </>
        )}
      </main>
    </div>
  )
}

export default ManagerFoodList
