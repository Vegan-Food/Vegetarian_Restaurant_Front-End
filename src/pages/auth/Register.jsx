"use client"

import { useState, useEffect } from "react"
import logo from "../../assets/image/logo.png" // Điều chỉnh đường dẫn tùy vị trí file

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = "#C0EBA6"
    return () => {
      document.body.style.backgroundColor = ""
    }
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp.")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.")
        window.location.href = "/auth/login"
      } else {
        alert(data.message || "Đăng ký thất bại.")
      }
    } catch (err) {
      console.error(err)
      alert("Lỗi kết nối đến máy chủ.")
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
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: "white",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      maxWidth: "450px",
      width: "100%",
      textAlign: "center",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
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
      marginTop: "20px",
    },
    link: {
      display: "block",
      marginTop: "15px",
      color: "#4CAF50",
      textDecoration: "none",
    },
    logo: {
      width: "80px",
      height: "80px",
      marginBottom: "10px",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="Vegan Food Logo" style={styles.logo} />
        <h2 style={{ color: "#1A3C34", marginBottom: "20px" }}>Tạo tài khoản</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
        <a href="/auth/login" style={styles.link}>Đã có tài khoản? Đăng nhập</a>
      </div>
    </div>
  )
}

export default Register
