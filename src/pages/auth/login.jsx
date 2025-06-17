"use client"

import { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import logo from '../assets/image/logo.png'

const CLIENT_ID = "983246949849-9u867h45gdi8110iovgn6jdgmqmf120q.apps.googleusercontent.com"

const Login = () => {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const renderGoogleButton = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      })
      window.google.accounts.id.renderButton(document.getElementById("google-login-button"), {
        theme: "outline",
        size: "large",
        width: 280,
      })
    }
  }

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.onload = renderGoogleButton
    document.body.appendChild(script)

    document.body.style.backgroundColor = "#C0EBA6"
    document.documentElement.style.backgroundColor = "#C0EBA6"

    return () => {
      document.body.style.backgroundColor = ""
      document.documentElement.style.backgroundColor = ""
    }
  }, [])

  useEffect(() => {
    if (!user) renderGoogleButton()
  }, [user])

  const handleCredentialResponse = (response) => {
    const decoded = jwtDecode(response.credential)
    setUser(decoded)
  }

  const handleLogout = () => {
    setUser(null)
    setEmail("")
    setPassword("")
  }

  const handleManualLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        setUser(data.user)
      } else {
        alert(data.message || "Sai email hoặc mật khẩu.")
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err)
      alert("Không thể kết nối đến máy chủ.")
    }

    setIsLoading(false)
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#C0EBA6",
      color: "#1A3C34",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      width: "100%",
      boxSizing: "border-box",
    },
    card: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "450px",
      textAlign: "center",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#1A3C34",
      marginBottom: "8px",
      background: "linear-gradient(to right, #1A3C34, #4CAF50)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    subtitle: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "30px",
    },
    formGroup: {
      marginBottom: "20px",
      textAlign: "left",
      width: "100%",
    },
    label: {
      color: "#1A3C34",
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    inputContainer: {
      position: "relative",
      width: "100%",
    },
    input: {
      width: "100%",
      padding: "12px 40px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    icon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
      width: "18px",
      height: "18px",
      zIndex: 1,
    },
    eyeIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#666",
      width: "18px",
      height: "18px",
      cursor: "pointer",
      background: "none",
      border: "none",
      padding: "4px",
      zIndex: 2,
      borderRadius: "4px",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      marginBottom: "20px",
    },
    divider: {
      display: "flex",
      alignItems: "center",
      margin: "20px 0",
      color: "#666",
    },
    dividerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#ddd",
    },
    dividerText: {
      padding: "0 15px",
      fontSize: "0.9rem",
      color: "#666",
    },
    forgotPassword: {
      color: "#4CAF50",
      textDecoration: "none",
      fontSize: "0.9rem",
      marginTop: "10px",
      display: "inline-block",
    },
    avatar: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 20px",
      border: "4px solid #4CAF50",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    userInfo: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "12px",
      textAlign: "left",
      border: "1px solid #e9ecef",
    },
    badge: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "600",
      display: "inline-block",
    },
    logoutButton: {
      backgroundColor: "#fff",
      color: "#f44336",
      border: "1px solid #f44336",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      marginTop: "10px",
      width: "100%",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Logo + Tiêu đề */}
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={logo}
            alt="Vegan Food Logo"
            style={{ width: "80px", height: "80px", marginBottom: "10px" }}
          />
          <h1 style={{ margin: 0, fontSize: "2rem", color: "#1A3C34" }}>Vegan Food</h1>
        </header>

        {!user ? (
          <>
            <h1 style={styles.title}>Welcome back!</h1>
            <p style={styles.subtitle}>Đăng nhập vào tài khoản của bạn để tiếp tục</p>

            {/* ... (phần form đăng nhập và Google login giữ nguyên như bạn có) */}
          </>
        ) : (
          <>
            {/* Hiển thị thông tin người dùng sau đăng nhập */}
          </>
        )}
      </div>
    </div>
  )
}

export default Login
