import React from "react"
import ReactDOM from "react-dom/client"
import HomePage from "./pages/auth/HomePage"
import "bootstrap/dist/css/bootstrap.min.css"
import { appTheme } from "./constant/color_constants"

// Apply global styles
document.body.style.backgroundColor = appTheme.background

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
)
