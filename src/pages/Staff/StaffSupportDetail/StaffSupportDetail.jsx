import { useParams, useNavigate } from "react-router-dom"
import StaffSidebar from "../StaffSidebar/StaffSidebar"
import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap"
import { appTheme } from "../../../constant/color_constants"

const mockTickets = [
  {
    id: "SUP001",
    customer: "Nguyen Van A",
    subject: "Order Delay Issue",
    status: "Open",
    createdTime: "2 hours ago",
    description: "My order #ORD001 is delayed. When will it be delivered? I placed the order yesterday and expected it to arrive today. This is causing inconvenience as I have guests coming over for dinner.",
  },
  {
    id: "SUP002",
    customer: "Tran Thi B",
    subject: "Food Quality Complaint",
    status: "In Progress",
    createdTime: "4 hours ago",
    description: "The food quality was not as expected. The rice was undercooked and the vegetables were not fresh. I would like a refund or replacement for this order.",
  },
  {
    id: "SUP003",
    customer: "Le Van C",
    subject: "Order Tracking",
    status: "Resolved",
    createdTime: "1 day ago",
    description: "Cannot track my order status. The tracking number provided is not working on the website. Please help me check the current status of my order.",
  },
  {
    id: "SUP004",
    customer: "Pham Thi D",
    subject: "Payment Issue",
    status: "Open",
    createdTime: "30 minutes ago",
    description: "Payment was deducted from my account but the order was not confirmed. I received the payment confirmation from my bank but no order confirmation from your system.",
  },
]


const getStatusBadge = (status) => {
  const colors = { 
    Open: "primary", 
    "In Progress": "warning", 
    Resolved: "success", 
    Closed: "secondary" 
  }
  return <Badge bg={colors[status]} className="px-3 py-2">{status}</Badge>
}

const StaffSupportDetail = () => {
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const ticket = mockTickets.find(t => t.id === ticketId)

  return (
    <div className="dashboard-container">
      <StaffSidebar />
      <div className="main-content" style={{ backgroundColor: appTheme.background }}>
        <Container fluid className="p-4">
          <Row className="mb-4">
            <Col>
              <Button 
                variant="outline-secondary" 
                onClick={() => navigate(-1)}
                className="mb-3"
              >
                ← Back to Support List
              </Button>
              <h2 style={{ color: appTheme.primary }}>Customer Support Detail</h2>
              <p className="text-muted">View detailed information about the support request.</p>
            </Col>
          </Row>

          <Row>
            <Col>
              {ticket ? (
                <Card className="shadow-sm">
                  <Card.Header style={{ backgroundColor: appTheme.primary, color: "white" }}>
                    <Row className="align-items-center">
                      <Col>
                        <h5 className="mb-0">Ticket {ticket.id}</h5>
                      </Col>
                      <Col xs="auto">
                        {getStatusBadge(ticket.status)}
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row className="mb-4">
                      <Col md={6}>
                        <Card className="h-100 border-0" style={{ backgroundColor: "#F8F9FA" }}>
                          <Card.Body>
                            <h6 className="text-muted mb-2">TICKET INFORMATION</h6>
                            <div className="mb-3">
                              <strong>Ticket ID:</strong>
                              <div className="mt-1">{ticket.id}</div>
                            </div>
                            <div className="mb-3">
                              <strong>Created Time:</strong>
                              <div className="mt-1">{ticket.createdTime}</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6}>
                        <Card className="h-100 border-0" style={{ backgroundColor: "#F8F9FA" }}>
                          <Card.Body>
                            <h6 className="text-muted mb-2">CUSTOMER INFORMATION</h6>
                            <div className="mb-3">
                              <strong>Customer Name:</strong>
                              <div className="mt-1">{ticket.customer}</div>
                            </div>
                            <div className="mb-3">
                              <strong>Subject:</strong>
                              <div className="mt-1">{ticket.subject}</div>
                            </div>
                            <div className="mb-0">
                              <strong>Current Status:</strong>
                              <div className="mt-2">{getStatusBadge(ticket.status)}</div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Card className="border-0" style={{ backgroundColor: "#F8F9FA" }}>
                          <Card.Body>
                            <h6 className="text-muted mb-3">ISSUE DESCRIPTION</h6>
                            <div className="p-3" style={{ 
                              backgroundColor: "white", 
                              borderRadius: "8px",
                              border: "1px solid #E9ECEF"
                            }}>
                              <p className="mb-0" style={{ lineHeight: "1.6" }}>
                                {ticket.description}
                              </p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>

                    <Row className="mt-4">
                      <Col>
                        <div className="d-flex gap-2">
                          {/* Đã xóa nút Respond to Ticket */}
                          <Button 
                            variant="outline-secondary"
                            onClick={() => navigate(`/staff-support`)}
                          >
                            Back to List
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ) : (
                <Alert variant="warning" className="text-center">
                  <h5>Ticket Not Found</h5>
                  <p className="mb-3">The support ticket with ID "{ticketId}" could not be found.</p>
                  <Button variant="primary" onClick={() => navigate("/staff-support")}>
                    Return to Support List
                  </Button>
                </Alert>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default StaffSupportDetail