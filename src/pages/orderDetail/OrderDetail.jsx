import React from 'react';
import './OrderDetail.css';
import { Card, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import orderHistoryData from '../../data/order_history.json';
import orderItemData from '../../data/orderItem_data.json';
import mealData from '../../data/meal_data.json';
import discountData from '../../data/discount.json';

const statusVariant = (status) => {
  switch (status) {
    case 'Hoàn thành':
    case 'Đã giao':
    case 'Completed':
    case 'Delivered':
      return 'success';
    case 'Đang xử lý':
    case 'Processing':
      return 'warning';
    case 'Đã huỷ':
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
  const [date, time] = dateTimeStr.split(' ');
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}${time ? ' ' + time.slice(0,5) : ''}`;
}

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const order = orderHistoryData.orders.find(o => o.order_id === Number(orderId));
  const orderItems = orderItemData.order_items.filter(item => item.order_id === Number(orderId));

  // Get product name from meal_data.json if available
  const getProductName = (product_id) => {
    if (mealData && mealData.meals) {
      const meal = mealData.meals.find(m => m.id === product_id);
      return meal ? meal.name : `Product #${product_id}`;
    }
    return `Product #${product_id}`;
  };

  // Get discount info if available
  let discountCode = null;
  let discountAmount = 0;
  if (order && order.discount_id && discountData && discountData.discounts) {
    const discount = discountData.discounts.find(d => d.discount_id === order.discount_id);
    if (discount) {
      discountCode = discount.discount_code;
      // Calculate discount based on type
      if (discount.type === 'percent') {
        discountAmount = Math.round(order.total_amount / (1 - discount.value/100) * (discount.value/100));
      } else if (discount.type === 'fixed') {
        discountAmount = discount.value;
      }
    }
  }

  // Calculate subtotal = sum of all items
  const subtotal = orderItems.reduce((sum, item) => sum + item.price_at_time * item.quantity, 0);
  // If discount, total = subtotal - discountAmount
  const total = order ? order.total_amount : 0;

  // Get delivery time if available (assume order_date + 1 day if completed)
  let deliveryDate = '';
  if (order && (order.status === 'Hoàn thành' || order.status === 'Completed') && order.order_date) {
    const dateObj = new Date(order.order_date.replace(' ', 'T'));
    dateObj.setDate(dateObj.getDate() + 1);
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const hh = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    deliveryDate = `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  }

  if (!order) {
    return (
      <div className="order-detail-bg min-vh-100 d-flex flex-column">
        <Header />
        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5" style={{ marginTop: '90px' }}>
          <Card className="order-detail-card p-4" style={{ maxWidth: 1000, width: '100%', borderRadius: 24, boxShadow: '0 8px 40px rgba(52,121,40,0.13)' }}>
            <Card.Body>
              <Button variant="outline-success" className="mb-3" onClick={() => navigate(-1)}>
                <ArrowLeft className="me-2" /> Back
              </Button>
              <div className="text-center mb-4">
                <h2 className="order-detail-title">Order not found</h2>
              </div>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="order-detail-bg min-vh-100 d-flex flex-column">
      <Header />
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5" style={{ marginTop: '90px' }}>
        <Card className="order-detail-card p-4" style={{ maxWidth: 1000, width: '100%', borderRadius: 24, boxShadow: '0 8px 40px rgba(52,121,40,0.13)' }}>
          <Card.Body>
            <Button variant="outline-success" className="mb-3" onClick={() => navigate(-1)}>
              <ArrowLeft className="me-2" /> Back
            </Button>
            <div className="text-center mb-4">
              <h2 className="order-detail-title">Order Detail #{order.order_id}</h2>
              <Badge bg={statusVariant(order.status)} className="order-status-badge">{order.status}</Badge>
            </div>
            <div className="order-info mb-4 w-100">
              <div className="order-info-col" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 12, columnGap: 36 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>Customer Name:</strong> <span>{order.name}</span>
                </div>
                <div style={{ gridColumn: '2 / 3', marginTop: '-8px',marginTop: '0px',marginBottom: '9px', paddingLeft: '70px' }}>
                  <strong>Phone Number:</strong> <span>{order.phone_number}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>Order Time:</strong> <span>{formatDateTime(order.order_date)}</span>
                </div>
                <div style={{ gridColumn: '2 / 3', marginTop: '-8px', marginBottom: '8px', paddingLeft: '70px' }}>
                  <strong>Delivery Time:</strong> <span>{deliveryDate ? formatDateTime(deliveryDate) : <span className="text-muted">Not delivered</span>}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>Payment Method:</strong> <span>{order.payment_method === 'Tiền mặt' ? 'Cash' : order.payment_method === 'Chuyển khoản' ? 'Bank Transfer' : order.payment_method}</span>
                </div>
                <div style={{ gridColumn: '2 / 3', marginTop: '-8px', marginBottom: '8px', paddingLeft: '70px' }}>
                  <strong>Receiving Method:</strong> <span>{order.method === 'Giao hàng' ? 'Delivery' : order.method === 'Lấy ngay' ? 'Pickup' : order.method}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>Discount Code:</strong> <span>{discountCode ? discountCode : 'None'}</span>
                </div>
                <div style={{ gridColumn: '2 / 3', marginTop: '-8px', marginBottom: '8px', paddingLeft: '70px' }}>
                  <strong>Shipping Address:</strong>
                </div>
                <div style={{ gridColumn: '2 / 3', marginTop: '-8px', marginBottom: '8px', paddingLeft: '70px' }}>
                  <span>{order.address}</span>
                </div>
              </div>
            </div>
            <div className="order-items-table-wrapper" style={{ maxHeight: '340px', overflowY: 'auto' }}>
              <Table hover className="order-items-table align-middle text-center mb-4">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.length === 0 ? (
                    <tr><td colSpan={5} className="text-muted">No products in this order</td></tr>
                  ) : (
                    orderItems.map(item => {
                      // Get product name from meal_data.json
                      let product = mealData && mealData.products ? mealData.products.find(m => m.product_id === item.product_id) : null;
                      let productName = product ? product.name : `Product #${item.product_id}`;
                      let originalPrice = product ? product.price : '-';
                      return (
                        <tr key={item.order_item_id}>
                          <td>{productName}</td>
                          <td>{item.quantity}</td>
                          <td>{formatCurrency(originalPrice)}</td>
                          <td>{formatCurrency(item.price_at_time)}</td>
                          <td>
                            <Button variant="outline-success" size="sm" style={{ borderRadius: 16, fontWeight: 600 }} onClick={() => navigate(`/foodDetail/${item.product_id}`)}>
                              Buy Again
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </div>
            <div className="order-total text-end">
              <div className="total-breakdown">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(orderItems.reduce((sum, item) => sum + item.price_at_time, 0))}</span>
                </div>
                <div className="total-row">
                  <span>Discount:</span>
                  <span>-{discountCode && discountData && discountData.discounts ? (() => {
                    const discount = discountData.discounts.find(d => d.discount_id === order.discount_id);
                    if (discount && discount.value) return formatCurrency(discount.value);
                    return '0₫';
                  })() : '0₫'}</span>
                </div>
                <hr className="total-divider" />
                <div className="total-row final-total">
                  <span><strong>Total:</strong></span>
                  <span><strong className="text-success fs-4">{formatCurrency(order.total_amount)}</strong></span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetail;