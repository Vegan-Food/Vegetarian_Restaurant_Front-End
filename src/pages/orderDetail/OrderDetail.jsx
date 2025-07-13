import React, { useEffect, useState } from 'react';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './OrderDetail.css';

const statusVariant = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Processing':
      return 'warning';
    case 'Cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

function formatCurrency(amount) {
  if (typeof amount !== 'number') return '';
  return amount.toLocaleString('en-US') + '₫';
}

function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '';
  const dateObj = new Date(dateTimeStr);
  const date = dateObj.toLocaleDateString('en-GB');
  const time = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/order/list/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return (
      <div className="order-detail-bg min-h-screen flex flex-column">
        <Header />
        <div className="flex-grow-1 flex align-items-center justify-content-center py-5">
          <Card className="order-detail-card">
            <Card.Body className="p-4">
              <Button variant="outline-success" className="mb-4" onClick={() => navigate(-1)}>
                <ArrowLeft className="me-2" /> Back
              </Button>
              <h2 className="order-detail-title">Order not found</h2>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.priceAtTime * item.quantity, 0);
  const discountCode = order.discountCode || null;
  const discountPercentage = order.discountPercentage || 0;
  const discountAmount = Math.round(subtotal * (discountPercentage / 100));

  return (
    <div className="order-detail-page">
      <div className="order-detail-bg">
        <Header />
        <div className="order-detail-container">
          <Card className="order-detail-card">
            <Card.Body className="p-4">
              <div className="order-detail-header">
                <Button
                  variant="outline-success"
                  className="back-button"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="me-2" /> Back to Orders
                </Button>
                <div className="order-title-wrapper">
                  <h2 className="order-detail-title">Order #{order.orderId}</h2>
                  <Badge
                    bg={statusVariant(order.status)}
                    className="order-status-badge"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>

              <div className="order-info">
                <table className="order-info-table">
                  <tbody>
                    <tr>
                      <td className="info-label">Customer Name:</td>
                      <td className="info-value">{order.userName}</td>
                      <td className="info-label">Address:</td>
                      <td className="info-value">{order.address}</td>
                    </tr>
                    <tr>
                      <td className="info-label">Phone Number:</td>
                      <td className="info-value">{order.phoneNumber}</td>
                      <td className="info-label">Payment Method:</td>
                      <td className="info-value">
                        {order.paymentMethod === 'Tiền mặt'
                          ? 'Cash'
                          : order.paymentMethod === 'Chuyển khoản'
                          ? 'Bank Transfer'
                          : order.paymentMethod}
                      </td>
                    </tr>
                    <tr>
                      <td className="info-label">Order Time:</td>
                      <td className="info-value">{formatDateTime(order.createdAt)}</td>
                      <td className="info-label">Discount Code:</td>
                      <td className="info-value">{discountCode || 'None'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="order-items-table-wrapper">
                <Table hover className="order-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-muted text-center">
                          No products in this order
                        </td>
                      </tr>
                    ) : (
                      order.items.map((item, index) => {
                        const productName = item.productName;
                        const unitPrice = item.priceAtTime;
                        const category = item.category || '';
                        const slug = item.slug || item.productId;

                        return (
                          <tr key={index}>
                            <td>
                              <div>
                                <div className="fw-medium">{productName}</div>
                                <small className="text-muted">{category}</small>
                              </div>
                            </td>
                            <td className="text-center">{item.quantity}</td>
                            <td className="text-center">{formatCurrency(unitPrice)}</td>
                            <td className="text-center fw-medium">{formatCurrency(item.quantity * item.priceAtTime)}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </div>

              <div className="order-total mt-4 p-4 bg-light rounded">
                <h5 className="mb-4 fw-bold text-uppercase">Order Summary</h5>
                <div className="total-breakdown">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal ({order.items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="d-flex justify-content-between text-success">
                      <span>Discount {discountCode ? `(${discountPercentage}% off)` : ''}:</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="order-summary-total">
                    <h5 className="mb-0 fw-bold">Total Amount:</h5>
                    <h4 className="mb-0 fw-bold text-success">{formatCurrency(subtotal - discountAmount)}</h4>
                  </div>
                
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default OrderDetail;
