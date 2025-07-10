"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { appTheme } from "../../../constant/color_constants"
import StaffSidebar from "../StaffSidebar/StaffSidebar"
import { getOrder, updateOrderStatus } from '../../../api/order';

const StaffOrderList = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Gọi API lấy danh sách đơn hàng khi vào trang
  useEffect(() => {
    getOrder().then(data => {
      setOrders(data);
      setFilteredOrders(data);
      setLoading(false);
    }).catch(() => {
      setOrders([]);
      setFilteredOrders([]);
    });
  }, []);

  // Lọc đơn hàng theo từ khóa tìm kiếm
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.orderId?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      Preparing: "warning",
      Ready: "success",
      Delivering: "info",
      Pending: "secondary",
      Completed: "primary",
      Cancelled: "danger"
    }
    return <Badge bg={statusColors[status] || 'secondary'}>{status}</Badge>
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      let res;
      try {
        res = await updateOrderStatus(orderId, { status: newStatus });
      } catch (e) {
        // Nếu lỗi parse JSON, thử lấy text
        if (e instanceof SyntaxError && e.message.includes('Unexpected token')) {
          res = e.response ? await e.response.text() : 'success';
        } else {
          throw e;
        }
      }
      // Nếu res là string "success"
      if (res === 'success' || (res && res.success) || (res && res.message === 'success')) {
        // Thành công
        setSelectedOrder(null);
        alert('Order status updated successfully!');
        window.location.reload();
      } else {
        alert('Update status failed!');
      }
    } catch (err) {
      alert('Update status failed!');
    }
  };

  const handleViewDetail = (order) => {
    navigate(`/staff-order-detail/${order.orderId}`, { state: { order } });
  }

  const openStatusModal = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: appTheme.primary }}>Order Management</h2>
              <p className="text-muted">View and update assigned orders status.</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by Order ID, Customer Name, or Phone Number..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} className="text-end">
              <small className="text-muted">
                Showing {filteredOrders.length} of {orders.length} orders
              </small>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                  <h5 className="mb-0">Assigned Orders</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Items</th>
                        <th>Order Time</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="text-center">Loading orders...</td>
                        </tr>
                      ) : filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            {searchTerm ? 'No orders found matching your search.' : 'No orders found.'}
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order, index) => (
                          <tr key={index}>
                            <td>
                              <strong>#{order.orderId}</strong>
                            </td>
                            <td>{order.userName}</td>
                            <td>{order.phoneNumber}</td>
                            <td>
                              {order.items && order.items.length > 0
                                ? order.items.map(item => item.productName).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleTimeString()
                                : '-'}
                            </td>
                            <td>{getStatusBadge(order.status)}</td>
                            <td>
                              <strong>{Number(order.totalAmount || 0).toLocaleString()}đ</strong>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleViewDetail(order)}
                              >
                                View Detail
                              </Button>
                              <Button
                                variant="outline-success"
                                size="sm"
                                onClick={() => openStatusModal(order)}
                              >
                                Update Status
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Status Update Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Order Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <div>
                <p>
                  <strong>Order:</strong> {selectedOrder.orderId}
                </p>
                <p>
                  <strong>Customer:</strong> {selectedOrder.userName}
                </p>
                <p>
                  <strong>Current Status:</strong> {getStatusBadge(selectedOrder.status)}
                </p>

                <Form.Group className="mt-3">
                  <Form.Label>New Status</Form.Label>
                  <Form.Select id="statusSelect">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const newStatus = document.getElementById("statusSelect").value;
                handleStatusUpdate(selectedOrder.orderId, newStatus);
              }}
            >
              Update Status
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default StaffOrderList
