import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Table, Button, Badge, Form, Pagination
} from 'react-bootstrap';
import {
  Eye, ClockHistory, Funnel, ArrowCounterclockwise
} from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const PAGE_SIZE = 5;

const statusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'processing':
    case 'pending':
    case 'shipped':
      return 'warning';
    case 'cancelled':
      return 'danger';
    default:
      return 'secondary';
  }
};

const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '0₫';
  return amount.toLocaleString('vi-VN') + '₫';
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false 
  });
};

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // State for validation
  const [dateError, setDateError] = useState('');
  const [amountError, setAmountError] = useState('');
  
  // Filters
  const [orderDateFrom, setOrderDateFrom] = useState('');
  const [orderDateTo, setOrderDateTo] = useState('');
  const [minTotal, setMinTotal] = useState('');
  const [maxTotal, setMaxTotal] = useState('');
  const [status, setStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Validate date range
  const validateDateRange = (from, to) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if start date is in the future
    if (from && new Date(from) > today) {
      setDateError('Cannot select future date');
      return false;
    }
    
    // Check if end date is before start date
    if (from && to && new Date(from) > new Date(to)) {
      setDateError('End date cannot be before start date');
      return false;
    }
    
    setDateError('');
    return true;
  };
  
  // Handle date change
  const handleDateChange = (type, value) => {
    // Only update state if validation passes
    if (type === 'from') {
      if (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value);
        
        if (selectedDate > today) {
          setDateError('Cannot select future date');
          return;
        }
      }
      
      setOrderDateFrom(value);
      if (orderDateTo) {
        validateDateRange(value, orderDateTo);
      } else {
        // Clear error if no end date is selected
        setDateError('');
      }
    } else {
      setOrderDateTo(value);
      if (orderDateFrom) {
        validateDateRange(orderDateFrom, value);
      } else {
        // Clear error if no start date is selected
        setDateError('');
      }
    }
  };
  
  // Handle amount change
  const handleAmountChange = (type, value) => {
    const numValue = value === '' ? '' : parseFloat(value);
    
    if (type === 'min') {
      setMinTotal(value);
      if (value !== '' && maxTotal !== '' && numValue > parseFloat(maxTotal)) {
        setAmountError('Maximum value must be greater than or equal to minimum value');
      } else {
        setAmountError('');
      }
    } else {
      setMaxTotal(value);
      if (value !== '' && minTotal !== '' && parseFloat(minTotal) > numValue) {
        setAmountError('Maximum value must be greater than or equal to minimum value');
      } else {
        setAmountError('');
      }
    }
  };

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/order/list', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const mapped = response.data.map(order => ({
          id: order.orderId,
          userName: order.userName,
          orderDate: order.createdAt,
          status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
          paymentMethod: order.paymentMethod,
          totalAmount: order.totalAmount,
          phoneNumber: order.phoneNumber,
          address: order.address,
          items: order.items
        }));

        setOrders(mapped);
        setFilteredOrders(mapped);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...orders];

    if (orderDateFrom) {
      filtered = filtered.filter(o => new Date(o.orderDate) >= new Date(orderDateFrom));
    }
    if (orderDateTo) {
      filtered = filtered.filter(o => new Date(o.orderDate) <= new Date(orderDateTo + 'T23:59:59'));
    }
    if (minTotal) {
      filtered = filtered.filter(o => o.totalAmount >= parseFloat(minTotal));
    }
    if (maxTotal) {
      filtered = filtered.filter(o => o.totalAmount <= parseFloat(maxTotal));
    }
    if (status) {
      filtered = filtered.filter(o => o.status.toLowerCase() === status.toLowerCase());
    }
    if (paymentMethod) {
      filtered = filtered.filter(o => o.paymentMethod.toLowerCase() === paymentMethod.toLowerCase());
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orderDateFrom, orderDateTo, minTotal, maxTotal, status, paymentMethod, orders]);

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="order-history-bg min-vh-100 d-flex flex-column">
      <Header />
      <Container className="flex-grow-1 d-flex flex-column align-items-center justify-content-center py-5" style={{ marginTop: '80px' }}>
        <Card className="order-history-card-new p-4 w-100" style={{ maxWidth: 1300, borderRadius: 32 }}>
          <Card.Body>
            <h2 className="mb-4 text-center">
              <ClockHistory className="me-2" />
              Order History
            </h2>

            {/* Filters */}
            <div className="filter-card mb-4 p-3 rounded-3" style={{ backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
                <div className="d-flex align-items-center">
                  <Funnel size={22} className="me-2" />
                  <h5 className="mb-0 fw-bold">FILTER ORDERS</h5>
                </div>
                <Button variant="link" onClick={() => {
                  setOrderDateFrom('');
                  setOrderDateTo('');
                  setMinTotal('');
                  setMaxTotal('');
                  setStatus('');
                  setPaymentMethod('');
                }}>
                  <ArrowCounterclockwise size={16} className="me-1" />
                  Reset
                </Button>
              </div>
              <Form>
                <Row>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Date Range</Form.Label>
                      <div className="d-flex align-items-center">
                        <div className="position-relative flex-grow-1">
                          <Form.Control 
                            type="date" 
                            value={orderDateFrom} 
                            max={today}
                            onChange={e => handleDateChange('from', e.target.value)} 
                            isInvalid={!!dateError}
                            className="w-100"
                            lang="en-US"
                          />
                        </div>
                        <span className="mx-2">-</span>
                        <div className="position-relative flex-grow-1">
                          <Form.Control 
                            type="date" 
                            value={orderDateTo} 
                            min={orderDateFrom}
                            onChange={e => handleDateChange('to', e.target.value)} 
                            isInvalid={!!dateError}
                            className="w-100"
                            lang="en-US"
                          />
                        </div>
                      </div>
                      {dateError && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {dateError}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Status</Form.Label>
                      <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Payment</Form.Label>
                      <Form.Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="">All Methods</option>
                        <option value="Cash">Cash</option>
                        <option value="VNPAY">VNPAY</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Total Amount</Form.Label>
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex align-items-center">
                          <Form.Control 
                            type="number" 
                            placeholder="Min" 
                            value={minTotal} 
                            onChange={e => handleAmountChange('min', e.target.value)}
                            min="0"
                            step="1000"
                            className="flex-grow-1"
                          />
                          <span className="mx-2">-</span>
                          <Form.Control 
                            type="number" 
                            placeholder="Max" 
                            value={maxTotal} 
                            onChange={e => handleAmountChange('max', e.target.value)}
                            isInvalid={!!amountError}
                            min={minTotal || '0'}
                            step="1000"
                            className="flex-grow-1"
                          />
                        </div>
                        {amountError && (
                          <Form.Text className="text-danger" style={{ fontSize: '0.875em' }}>
                            {amountError}
                          </Form.Text>
                        )}
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <Table className="order-history-table align-middle text-center" bordered hover style={{width: '100%', background: '#FFFBE6', minWidth: 1100}}>
                <thead>
                  <tr>
                    <th className="rounded-top-left" style={{minWidth: 90, padding: '18px 18px'}}>Order ID</th>
                    <th style={{minWidth: 140, padding: '18px 18px'}}>
                      Order Time
                      <div className="date-format-hint">(mm/dd/yyyy)</div>
                    </th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Total</th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Status</th>
                    <th style={{minWidth: 120, padding: '18px 18px'}}>Payment</th>
                    <th className="rounded-top-right" style={{minWidth: 90, padding: '18px 18px'}}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-muted py-4">No matching orders</td>
                    </tr>
                  )}
                  {paginatedOrders.map((order) => (
                    <tr key={order.id} className="order-row">
                      <td className="rounded-cell-left" style={{padding: '16px 18px'}}><strong>{order.id}</strong></td>
                      <td style={{padding: '16px 18px'}}>{formatDateTime(order.orderDate)}</td>
                      <td style={{padding: '16px 18px'}}><span className="fw-bold text-success">{formatCurrency(order.totalAmount)}</span></td>
                      <td style={{padding: '16px 18px'}}>
                        <Badge bg={statusVariant(order.status)} className="order-status-badge px-3 py-2 fs-6 rounded-pill shadow-sm">
                          {order.status}
                        </Badge>
                      </td>
                      <td style={{padding: '16px 18px'}}>{order.paymentMethod}</td>
                      <td className="rounded-cell-right action-cell" style={{padding: '16px 18px'}}>
                        <Button
                          variant="outline-primary"
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => navigate(`/account/orders/${order.id}`)}
                          style={{
                            width: '40px',
                            height: '40px',
                            padding: '0',
                            borderRadius: '50%',
                            border: '2px solid #FCCD2A',
                            backgroundColor: '#FFFBE6',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#FCCD2A';
                            e.currentTarget.style.borderColor = '#FCCD2A';
                            e.currentTarget.querySelector('svg').style.color = '#2D6A23';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#FFFBE6';
                            e.currentTarget.style.borderColor = '#FCCD2A';
                            e.currentTarget.querySelector('svg').style.color = '#2D6A23';
                          }}
                        >
                          <Eye size={20} style={{ color: '#2D6A23', transition: 'color 0.3s ease' }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3 px-2 flex-wrap">
              <div className="text-muted" style={{fontSize: '0.98rem'}}>
                {totalPages === 1
                  ? `Showing ${filteredOrders.length} of ${filteredOrders.length} orders`
                  : `Showing ${filteredOrders.length === 0 ? 0 : ((currentPage-1)*PAGE_SIZE)+1} to ${Math.min(currentPage*PAGE_SIZE, filteredOrders.length)} of ${filteredOrders.length} orders`}
              </div>
              <Pagination className="mb-0">
                <Pagination.First 
                  onClick={() => handlePageChange(1)} 
                  disabled={currentPage === 1}
                  className="page-link-custom"
                >
                  First
                </Pagination.First>
                <Pagination.Prev 
                  onClick={() => handlePageChange(currentPage-1)} 
                  disabled={currentPage === 1}
                  className="page-link-custom"
                >
                  Prev
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item 
                    key={idx+1} 
                    active={currentPage === idx+1} 
                    onClick={() => handlePageChange(idx+1)}
                    className="page-item-custom"
                  >
                    {idx+1}
                  </Pagination.Item>
                ))}
                <Pagination.Next 
                  onClick={() => handlePageChange(currentPage+1)} 
                  disabled={currentPage === totalPages}
                  className="page-link-custom"
                >
                  Next
                </Pagination.Next>
                <Pagination.Last 
                  onClick={() => handlePageChange(totalPages)} 
                  disabled={currentPage === totalPages}
                  className="page-link-custom"
                >
                  Last
                </Pagination.Last>
              </Pagination>
            </div>

          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default OrderHistory;
