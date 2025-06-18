"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../ManagerSidebar/Sidebar.jsx"
import "./EditFoodPage.css"

const EditFoodPage = ({ foodIndex, foodData, onSave }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock_quantity: "",
    image_url: "",
    status: "Active",
  })
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    if (foodData) {
      setFormData(foodData)
      setImagePreview(foodData.image_url || "")
    }
  }, [foodData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setImagePreview(imageUrl)
        setFormData({ ...formData, image_url: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUrlChange = (e) => {
    const url = e.target.value
    setFormData({ ...formData, image_url: url })
    setImagePreview(url)
  }

  const removeImage = () => {
    setImagePreview("")
    setImageFile(null)
    setFormData({ ...formData, image_url: "" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSave) {
      onSave(formData)
    }
    navigate("/manager-food")
  }

  const handleCancel = () => {
    navigate("/manager-food")
  }

  const handleBackToList = () => {
    navigate("/manager-food")
  }

  return (
    <div className="edit-food-page">
      <div className="dashboard-container">
        <Sidebar />
        <main className="main-content">
          <div className="edit-food-header">
            <button className="back-btn" onClick={handleBackToList}>
              <span className="back-icon">←</span>
              Back to Food List
            </button>
            <h3>{foodIndex !== null ? "Edit Food Item" : "Add New Food Item"}</h3>
          </div>

          <div className="edit-food-container">
            <form onSubmit={handleSubmit} className="edit-food-form">
              <div className="form-section">
                <h4>Basic Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Food Name *</label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter food name"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="form-select"
                    >
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
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      type="number"
                      min="0"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock_quantity">Stock Quantity *</label>
                    <input
                      id="stock_quantity"
                      name="stock_quantity"
                      value={formData.stock_quantity}
                      onChange={handleChange}
                      placeholder="Enter stock quantity"
                      type="number"
                      min="0"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Image Upload</h4>
                <div className="image-upload-section">
                  <div className="image-upload-options">
                    <div className="upload-method">
                      <label className="upload-btn">
                        <span className="upload-icon">📁</span>
                        Upload Image
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                      </label>
                      <span className="upload-text">or</span>
                      <div className="form-group url-input">
                        <input
                          type="url"
                          placeholder="Enter image URL"
                          value={formData.image_url}
                          onChange={handleImageUrlChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {imagePreview && (
                    <div className="image-preview">
                      <div className="preview-container">
                        <img src={imagePreview || "/placeholder.svg"} alt="Food preview" className="preview-image" />
                        <button type="button" className="remove-image-btn" onClick={removeImage}>
                          <span className="close-icon">×</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <h4>Description</h4>
                <div className="form-group">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed description of the food item..."
                    rows="4"
                    className="form-textarea"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  {foodIndex !== null ? "Update Food" : "Add Food"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditFoodPage
