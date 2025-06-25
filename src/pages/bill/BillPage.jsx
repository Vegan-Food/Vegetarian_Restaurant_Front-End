import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, ListGroup, Badge, Image, Table, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BillPage.css";
import Header from "../../components/Header";

const initialBillData = {
    order_id: 1,
    customer_id: 101,
    order_date: "2025-06-13 12:30:00",
    status: "Hoàn thành",
    payment_method: "Chuyển khoản",
    total_amount: 320000,
    payment_id: 1001,
    name: "Nguyễn Văn An",
    phone_number: "0912345678",
    created_at: "2025-06-13 12:30:00",
    address: "123 Lê Lợi, Quận 1, TP.HCM",
    method: "Giao hàng",
    discount_id: 1,
    items: [
        {
            name: "Cơm gạo lứt rau củ",
            quantity: 2,
            price: 60000,
            image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        },
        {
            name: "Đậu hũ sốt nấm",
            quantity: 1,
            price: 50000,
            image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
        },
        {
            name: "Nước ép cam",
            quantity: 2,
            price: 40000,
            image: "https://cdn-icons-png.flaticon.com/512/135/135620.png"
        }
    ]
};

const statusColor = {
    "Hoàn thành": "success",
    "Đang xử lý": "warning",
    "Đã hủy": "danger",
};

const BillPage = () => {
    const [bill, setBill] = useState(initialBillData);
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(180); // 3 phút = 180 giây
    const timerRef = useRef();

    useEffect(() => {
        if (bill.status !== "Đã hủy" && countdown > 0) {
            timerRef.current = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [bill.status, countdown]);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerRef.current);
        }
    }, [countdown]);

    const handleCancelOrder = () => {
        setBill(prev => ({
            ...prev,
            status: "Đã hủy"
        }));
        setShowModal(false);
    };

    // Hàm format mm:ss
    const formatTime = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, "0");
        const s = (sec % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="bill-bg min-vh-100" style={{ backgroundColor: "#FFFBE6", paddingTop: 100 }}>
            <Header />
            <Container fluid className="py-5">
                <h2
                    className="text-center text-success mb-5 fw-bold bill-title"
                    style={{
                        letterSpacing: 2,
                        fontSize: 38,
                        textShadow: "0 2px 8px #00D3C1FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12
                    }}
                >
                    <span role="img" aria-label="leaf">🌿</span>
                    HÓA ĐƠN THANH TOÁN
                    <span role="img" aria-label="leaf">🌿</span>
                </h2>
                <Row className="justify-content-center gx-5">
                    {/* Thông tin khách hàng */}
                    <Col md={4} className="mb-4">
                        <div className="p-4 bg-white rounded-4 shadow-sm h-100">
                            <h5 className="fw-bold mb-4 border-bottom pb-2 text-success">Thông tin khách hàng</h5>
                            <div className="d-flex align-items-center mb-4">
                                <Image
                                    src="https://cdn-icons-png.flaticon.com/512/2909/2909769.png"
                                    roundedCircle
                                    width={70}
                                    height={70}
                                    alt="avatar"
                                    className="me-3"
                                    style={{ background: "#e8f5e9", padding: 8 }}
                                />
                                <div>
                                    <div className="fw-bold fs-4">{bill.name}</div>
                                    <div className="text-muted">{bill.phone_number}</div>
                                </div>
                            </div>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="border-0 px-0 pb-2">
                                    <strong>Địa chỉ:</strong>
                                    <div>{bill.address}</div>
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0 px-0 pb-2">
                                    <strong>Ngày đặt:</strong>
                                    <div>{bill.order_date}</div>
                                </ListGroup.Item>
                                <ListGroup.Item className="border-0 px-0">
                                    <strong>Phương thức nhận:</strong>
                                    <div>{bill.method}</div>
                                </ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Col>
                    {/* Thông tin đơn hàng + món ăn */}
                    <Col md={8}>
                        <div className="p-4 bg-white rounded-4 shadow-sm mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold mb-4 border-bottom pb-2 text-success">Thông tin đơn hàng</h5>
                                {bill.status !== "Đã hủy" && countdown > 0 && (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-danger fw-bold" style={{ minWidth: 60 }}>
                                            {formatTime(countdown)}
                                        </span>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Hủy đặt hàng
                                        </Button>

                                    </div>
                                )}
                            </div>
                            <Row>
                                <Col md={6}>
                                    <ListGroup variant="flush" className="mb-3">
                                        <ListGroup.Item className="border-0 px-0 pb-2">
                                            <Row>
                                                <Col xs={7}><strong>Mã đơn hàng:</strong></Col>
                                                <Col xs={5} className="text-end">#{bill.order_id}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 px-0 pb-2">
                                            <Row>
                                                <Col xs={7}><strong>Trạng thái:</strong></Col>
                                                <Col xs={5} className="text-end">
                                                    <Badge bg={statusColor[bill.status] || "secondary"}>
                                                        {bill.status}
                                                    </Badge>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 px-0 pb-2">
                                            <Row>
                                                <Col xs={7}><strong>Thanh toán:</strong></Col>
                                                <Col xs={5} className="text-end">{bill.payment_method}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 px-0 pb-2">
                                            <Row>
                                                <Col xs={7}><strong>Mã thanh toán:</strong></Col>
                                                <Col xs={5} className="text-end">{bill.payment_id}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="border-0 px-0">
                                            <Row>
                                                <Col xs={7}><strong>Mã giảm giá:</strong></Col>
                                                <Col xs={5} className="text-end">{bill.discount_id}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={6} className="d-flex align-items-center justify-content-end">
                                    <div className="bg-light rounded-3 px-4 py-3 text-end">
                                        <span className="fw-bold fs-5 me-2">Tổng tiền:</span>
                                        <span className="text-success fs-3 fw-bold">
                                            {bill.total_amount.toLocaleString()} <span className="text-muted fs-6">VND</span>
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-4 bg-white rounded-4 shadow-sm">
                            <h5 className="fw-bold mb-3 text-success">Danh sách món ăn</h5>
                            <Table responsive bordered hover size="sm" className="align-middle bg-white rounded-3 overflow-hidden">
                                <thead className="table-success">
                                    <tr>
                                        <th></th>
                                        <th>Món ăn</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bill.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.name}</td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td>{item.price.toLocaleString()} VND</td>
                                            <td className="text-success fw-bold">
                                                {(item.price * item.quantity).toLocaleString()} VND
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <div className="text-center text-muted mt-4" style={{ fontSize: 16 }}>
                    <span role="img" aria-label="leaf">🌱</span> Cảm ơn bạn đã ủng hộ Vegan Food!
                </div>
            </Container>

            {/* Modal xác nhận hủy */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận hủy đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn hủy đơn hàng này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={handleCancelOrder}>
                        Xác nhận hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BillPage;