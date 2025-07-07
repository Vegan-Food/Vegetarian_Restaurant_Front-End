"use client";

import { useState, useEffect } from "react";
import { Dash, Plus, Cart, Truck } from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  ButtonGroup,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import placeholderImage from "../../../assets/image/placeholder.svg";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setProduct(null);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Lỗi khi gọi API sản phẩm:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [productId]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleAddToCart = () => {
    if (product) addToCart(product, quantity);
  };

  if (!productId) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
        <h3 className="text-muted">Please select a product to view details</h3>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "500px" }}>
        <div className="text-center">
          <h3 className="text-muted">Product not found</h3>
          <p className="text-muted">Please try again with another product</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <section className="product-hero bg-light py-5 mt-4">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <div className="main-image-container bg-gradient-success p-4 rounded-4 shadow-lg">
                <Image
                  src={product.image_url || placeholderImage}
                  alt={product.name}
                  className="img-fluid rounded-3 shadow"
                  style={{ maxHeight: "700px", width: "100%", objectFit: "contain" }}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="product-info">
                <div className="mb-4">
                  <span
                    className="mb-3 text-uppercase"
                    style={{
                      background: "#347928",
                      color: "#FFFFFF",
                      borderRadius: 20,
                      fontWeight: 700,
                      padding: "0.5rem 1.5rem",
                      fontSize: "1rem",
                      letterSpacing: 1,
                      display: "inline-block",
                    }}
                  >
                    {product.category}
                  </span>
                  <h1 className="mb-3 lh-sm" style={{ fontWeight: 700, fontSize: "2.5rem" }}>
                    {product.name}
                  </h1>
                </div>

                <div className="price-section mb-4">
                  <h2 style={{ color: "#e53e3e", fontWeight: 700, fontSize: "2rem" }}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price || 0)}
                  </h2>
                </div>

                <Row className="g-3 mb-4">
                  <Col md={12}>
                    <div className="d-flex align-items-end gap-2">
                      <div className="flex-grow-1" style={{ maxWidth: 300 }}>
                        <label className="form-label fw-bold mb-2">Quantity:</label>
                        <ButtonGroup size="lg" className="w-100">
                          <Button variant="outline-success" onClick={decrementQuantity}>
                            <Dash size={18} />
                          </Button>
                          <Button variant="outline-success" disabled>
                            {quantity}
                          </Button>
                          <Button variant="outline-success" onClick={incrementQuantity}>
                            <Plus size={18} />
                          </Button>
                        </ButtonGroup>
                      </div>
                      <Button
                        size="lg"
                        className="py-2 px-4 fw-bold d-flex align-items-center justify-content-center gap-2 border-0 add-to-cart-btn"
                        style={{
                          minWidth: 180,
                          background: "#FCCD2A",
                          color: "#347928",
                          borderRadius: 12,
                          boxShadow: "0 2px 8px rgba(52,121,40,0.08)",
                          fontWeight: 700,
                        }}
                        onClick={handleAddToCart}
                      >
                        <Cart size={20} style={{ color: "#347928" }} className="me-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="product-details-section py-5 bg-white">
        <Container>
          <Row>
            <Col lg={8}>
              <Card className="border-0 shadow-sm" style={{ borderLeft: "6px solid #347928", borderRadius: 16 }}>
                <Card.Header className="border-0 py-3" style={{ background: "#347928", color: "#fff" }}>
                  <h5 className="mb-0 fw-bold">Product Details</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-3 bg-light rounded-3 mb-2">
                      <Row>
                        <Col sm={4} className="fw-semibold text-success">Category:</Col>
                        <Col sm={8}>{product.category}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-3 bg-light rounded-3 mb-2">
                      <Row>
                        <Col sm={4} className="fw-semibold text-success">Status:</Col>
                        <Col sm={8}>In Stock</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 px-0 py-3 bg-light rounded-3">
                      <Row>
                        <Col sm={4} className="fw-semibold text-success">Description:</Col>
                        <Col sm={8}>{product.description}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="border-0 shadow-sm" style={{ borderLeft: "6px solid #347928", borderRadius: 16 }}>
                <Card.Header className="border-0 py-3 bg-success text-white">
                  <h5 className="mb-0 fw-bold">Shipping Policy</h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 px-0 py-3 d-flex align-items-center bg-light rounded-3">
                      <Truck className="me-3 text-success" size={20} />
                      <div>
                        <div className="fw-semibold text-success">Free Shipping</div>
                        <small>For orders from 200,000 VND</small>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
