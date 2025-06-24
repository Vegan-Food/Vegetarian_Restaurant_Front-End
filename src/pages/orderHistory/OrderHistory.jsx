import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Form, InputGroup, Pagination } from 'react-bootstrap';
import { Eye, ClockHistory } from 'react-bootstrap-icons';
import { ArrowRight } from 'react-bootstrap-icons';
import './OrderHistory.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import orderHistoryData from '../../data/order_history.json';

const statusMap = {
  delivered: 'Đã giao',
  shipped: 'Đang xử lý',
  pending: 'Đang xử lý',
  cancelled: 'Đã huỷ',
};

const statusVariant = (status) => {
  switch (status) {
    case 'Hoàn thành':
      return 'success';
    case 'Đang xử lý':
      return 'warning';
    case 'Đã huỷ':
      return 'danger';
    default:
      return 'secondary';
  }
};

function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + '₫';
}

function formatDateTime(dateTimeStr) {
  if (!dateTimeStr) return '';
  const [date, time] = dateTimeStr.split(' ');
  const [year, month, day] = date.split('-');
  return `${month}/${day}/${year}${time ? ' ' + time.slice(0,5) : ''}`;
}

const PAGE_SIZE = 5;

const OrderHistory = () => {
  // Filter states
  const [orderDateFrom, setOrderDateFrom] = useState('');
  const [orderDateTo, setOrderDateTo] = useState('');
  const [minTotal, setMinTotal] = useState('');
  const [maxTotal, setMaxTotal] = useState('');
  const [status, setStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  // Map orders from JSON (no need to localize, already in Vietnamese)
  const orders = orderHistoryData.orders.map(order => ({
    id: order.order_id,
    orderDate: order.order_date,
    deliveryDate: order.status === 'Hoàn thành' ? order.order_date : '', // No delivery date in JSON, so use order_date for completed
    total: order.total_amount,
    status: order.status,
    paymentMethod: order.payment_method,
    method: order.method,
  }));

  // Filter logic
  const filteredOrders = orders.filter(order => {
    // Ngày đặt (khoảng)
    let matchOrderDate = true;
    if (orderDateFrom) {
      const orderDateOnly = order.orderDate.split(' ')[0];
      matchOrderDate = orderDateOnly >= orderDateFrom;
    }
    if (orderDateTo) {
      const orderDateOnly = order.orderDate.split(' ')[0];
      matchOrderDate = matchOrderDate && orderDateOnly <= orderDateTo;
    }
    // Tổng tiền
    let matchMinTotal = true;
    let matchMaxTotal = true;
    if (minTotal) matchMinTotal = order.total >= parseInt(minTotal);
    if (maxTotal) matchMaxTotal = order.total <= parseInt(maxTotal);
    // Trạng thái
    let matchStatus = true;
    if (status) matchStatus = order.status === status;
    // Thanh toán
    let matchPayment = true;
    if (paymentMethod) matchPayment = order.paymentMethod === paymentMethod;
    // Nhận hàng
    let matchDelivery = true;
    if (deliveryMethod) matchDelivery = order.method === deliveryMethod;
    return matchOrderDate && matchMinTotal && matchMaxTotal && matchStatus && matchPayment && matchDelivery;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="order-history-bg min-vh-100 d-flex flex-column">
      <Header />
      <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5" style={{ marginTop: '80px' }}>
        {/* Table Card */}
        <Card className="order-history-card-new p-4 w-100" style={{maxWidth: 1300, borderRadius: 32, boxShadow: '0 8px 40px rgba(52,121,40,0.13)'}}>
          <Card.Body>
            <h2 className="mb-4 order-history-title text-center">
              <ClockHistory className="history-icon" />
              Lịch sử đơn hàng
            </h2>
            {/* Inline Filter Bar under title */}
            <Form className="order-inline-filter mb-4 w-100 d-flex flex-row align-items-center justify-content-center" style={{gap: 24, flexWrap: 'wrap'}}>
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="filter-label mb-0">Ngày đặt</Form.Label>
                <Form.Control type="date" value={orderDateFrom} onChange={e => setOrderDateFrom(e.target.value)} className="filter-input" style={{minWidth: 120}} />
                <span className="filter-arrow"><ArrowRight size={18} /></span>
                <Form.Control type="date" value={orderDateTo} onChange={e => setOrderDateTo(e.target.value)} className="filter-input" style={{minWidth: 120}} />
              </div>
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="filter-label mb-0">Trạng thái</Form.Label>
                <Form.Select value={status} onChange={e => setStatus(e.target.value)} className="filter-input">
                  <option value="">Tất cả</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đã huỷ">Đã huỷ</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="filter-label mb-0">Thanh toán</Form.Label>
                <Form.Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="filter-input">
                  <option value="">Tất cả</option>
                  <option value="Tiền mặt">Tiền mặt</option>
                  <option value="Chuyển khoản">Chuyển khoản</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="filter-label mb-0">Nhận hàng</Form.Label>
                <Form.Select value={deliveryMethod} onChange={e => setDeliveryMethod(e.target.value)} className="filter-input">
                  <option value="">Tất cả</option>
                  <option value="Giao hàng">Giao hàng</option>
                  <option value="Lấy ngay">Lấy ngay</option>
                </Form.Select>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Form.Label className="filter-label mb-0">Tổng tiền</Form.Label>
                <Form.Control type="text" inputMode="numeric" pattern="[0-9]*" value={minTotal} onChange={e => setMinTotal(e.target.value.replace(/\D/g, ''))} className="filter-input" style={{minWidth: 90}} />
                <span className="filter-arrow"><ArrowRight size={18} /></span>
                <Form.Control type="text" inputMode="numeric" pattern="[0-9]*" value={maxTotal} onChange={e => setMaxTotal(e.target.value.replace(/\D/g, ''))} className="filter-input" style={{minWidth: 90}} />
              </div>
            </Form>
            <div className="table-responsive">
              <Table className="order-history-table align-middle text-center" bordered hover style={{width: '100%', background: '#FFFBE6', minWidth: 1100}}>
                <thead>
                  <tr>
                    <th className="rounded-top-left" style={{minWidth: 90, padding: '18px 18px'}}>Mã đơn</th>
                    <th style={{minWidth: 140, padding: '18px 18px'}}>
                      Thời điểm đặt
                      <div className="date-format-hint">(mm/dd/yyyy)</div>
                    </th>
                    <th style={{minWidth: 140, padding: '18px 18px'}}>
                      Thời điểm giao
                      <div className="date-format-hint">(mm/dd/yyyy)</div>
                    </th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Tổng tiền</th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Trạng thái</th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Thanh toán</th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Nhận hàng</th>
                    <th className="rounded-top-right" style={{minWidth: 90, padding: '18px 18px'}}>Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center text-muted py-4">Không có đơn hàng phù hợp</td>
                    </tr>
                  )}
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="order-row">
                      <td className="rounded-cell-left" style={{padding: '16px 18px'}}><strong>{order.id}</strong></td>
                      <td style={{padding: '16px 18px'}}>{formatDateTime(order.orderDate)}</td>
                      <td style={{padding: '16px 18px'}}>{order.deliveryDate ? formatDateTime(order.deliveryDate) : <span className="text-muted">Chưa giao</span>}</td>
                      <td style={{padding: '16px 18px'}}><span className="fw-bold text-success">{formatCurrency(order.total)}</span></td>
                      <td style={{padding: '16px 18px'}}>
                        <Badge bg={statusVariant(order.status)} className="order-status-badge px-3 py-2 fs-6 rounded-pill shadow-sm">
                          {order.status}
                        </Badge>
                      </td>
                      <td style={{padding: '16px 18px'}}>{order.paymentMethod}</td>
                      <td style={{padding: '16px 18px'}}>{order.method}</td>
                      <td className="rounded-cell-right action-cell" style={{padding: '16px 18px'}}>
                        <Button
                          className="eye-btn-custom"
                          onClick={() => navigate(`/account/orders/${order.id}`)}
                        >
                          <Eye size={22} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-3 px-2 flex-wrap">
                <div className="text-muted" style={{fontSize: '0.98rem'}}>
                  {totalPages === 1
                    ? `Hiển thị ${filteredOrders.length} trong tổng số ${filteredOrders.length} đơn hàng`
                    : `Hiển thị ${filteredOrders.length === 0 ? 0 : ((currentPage-1)*PAGE_SIZE)+1} đến ${Math.min(currentPage*PAGE_SIZE, filteredOrders.length)} trong tổng số ${filteredOrders.length} đơn hàng`}
                </div>
                <Pagination className="mb-0">
                  <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1}>Đầu</Pagination.First>
                  <Pagination.Prev onClick={() => handlePageChange(currentPage-1)} disabled={currentPage === 1}>Trước</Pagination.Prev>
                  {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item key={idx+1} active={currentPage === idx+1} onClick={() => handlePageChange(idx+1)}>{idx+1}</Pagination.Item>
                  ))}
                  <Pagination.Next onClick={() => handlePageChange(currentPage+1)} disabled={currentPage === totalPages}>Tiếp</Pagination.Next>
                  <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>Cuối</Pagination.Last>
                </Pagination>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default OrderHistory; 