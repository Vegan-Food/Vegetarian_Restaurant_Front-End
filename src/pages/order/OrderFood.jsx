import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Row, Col, ListGroup, Image, Stack } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';

const OrderPage = () => {
    const [setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const shippingFee = 30000;
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingFee;

    const [paymentInfo, setPaymentInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        province: '',
        district: '',
        ward: '',
        note: ''
    });

    const [selectedPayment, setSelectedPayment] = useState('COD');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Gọi trực tiếp PayOS API demo (chỉ dùng cho demo, không bảo mật)
            const response = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-client-id': process.env.REACT_APP_PAYOS_CLIENT_ID,
                    'x-api-key': process.env.REACT_APP_PAYOS_API_KEY,
                },
                body: JSON.stringify({
                    orderCode: Math.floor(Math.random() * 1000000000), // mã đơn hàng random
                    amount: 250000,
                    description: 'Thanh toán đơn hàng Vegetarian Restaurant',
                    returnUrl: window.location.origin + '/account/orders', // sau khi thanh toán xong sẽ chuyển về đây
                    cancelUrl: window.location.href,
                }),
            });
            const data = await response.json();
            if (data.data && data.data.checkoutUrl) {
                window.open(data.data.checkoutUrl, '_blank');
            } else {
                alert('Không lấy được link thanh toán PayOS!');
            }
        } catch (err) {
            alert('Có lỗi khi kết nối PayOS!');
        }
        setLoading(false);
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '105px' }}>
            <Header />
            <Container className="py-4 flex-grow-1" style={{ marginTop: '20px' }}>
                <div className="d-flex justify-content-between align-items-start">
                    {/* Left Side - Form */}
                    <div className="w-75 pe-4">
                        <h2 className="mb-4">Thông tin giao hàng</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={paymentInfo.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={paymentInfo.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            value={paymentInfo.phone}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={paymentInfo.address}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tỉnh / thành</Form.Label>
                                        <Form.Select
                                            name="province"
                                            value={paymentInfo.province}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Chọn tỉnh/thành</option>
                                            <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                            {/* Add more provinces */}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Quận / huyện</Form.Label>
                                        <Form.Select
                                            name="district"
                                            value={paymentInfo.district}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Chọn quận/huyện</option>
                                            <option value="Huyện Côn Đảo">Huyện Côn Đảo</option>
                                            {/* Add more districts */}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phường / xã</Form.Label>
                                        <Form.Select
                                            name="ward"
                                            value={paymentInfo.ward}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Chọn phường/xã</option>
                                            <option value="Thị trấn Côn Đảo">Thị trấn Côn Đảo</option>
                                            {/* Add more wards */}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Ghi chú</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="note"
                                    value={paymentInfo.note}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Ghi chú cho món ăn (nếu có)"
                                />
                            </Form.Group>

                            {/* Payment Methods Section */}
                            <div className="payment-methods mt-4">
                                <h2 className="mb-4">Hình thức thanh toán</h2>
                                <Form.Group
                                    style={{ marginBottom: '120px' }}
                                >
                                    <div className="payment-method__item mb-3">
                                        <Form.Check
                                            type="radio"
                                            id="payment-COD"
                                            name="payment-method"
                                            value="COD"
                                            onChange={handlePaymentChange}
                                            label={
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="https://mcdn.coolmate.me/image/October2024/mceclip2_42.png"
                                                        alt="COD"
                                                        className="payment-icon me-3"
                                                        style={{ width: '40px', height: '40px' }}

                                                    />
                                                    <span className="payment-label">
                                                        <strong>Thanh toán khi nhận món</strong>
                                                    </span>
                                                </div>
                                            }
                                            defaultChecked
                                        />
                                    </div>

                                    <div className="payment-method__item mb-3">
                                        <Form.Check
                                            type="radio"
                                            id="payment-vnpay"
                                            name="payment-method"
                                            value="vnpay"
                                            onChange={handlePaymentChange}
                                            label={
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src="https://mcdn.coolmate.me/image/October2024/mceclip0_81.png"
                                                        alt="VNPAY"
                                                        className="payment-icon me-3"
                                                        style={{ width: '40px', height: '40px' }}

                                                    />
                                                    <span className="payment-label">
                                                        <strong>Ví điện tử VNPAY</strong>
                                                        <br />
                                                        <span className="text-muted small">Quét QR để thanh toán</span>
                                                    </span>
                                                </div>
                                            }
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </Form>
                    </div>

                    {/* Right Side - Order Summary */}
                    <Col md={3} className="bg-light p-3" style={{ marginBottom: '120px' }}>
                        <h3 className="mb-3">Đơn hàng của bạn</h3>

                        <ListGroup className="mb-4">
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.id} className="border-0 px-0">
                                    <Row className="align-items-center">
                                        <Col xs={3}>
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                className="rounded"
                                            />
                                        </Col>
                                        <Col xs={9}>
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-1">{item.name}</h6>
                                                <span>{item.price.toLocaleString()}₫</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">Số lượng: {item.quantity}</small>
                                                <span className="fw-bold">{(item.price * item.quantity).toLocaleString()}₫</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <Stack gap={2}>
                            <Row className="align-items-center">
                                <Col>Tạm tính:</Col>
                                <Col xs="auto">{subtotal.toLocaleString()}₫</Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col>Phí vận chuyển:</Col>
                                <Col xs="auto">{shippingFee.toLocaleString()}₫</Col>
                            </Row>
                            <hr className="my-2" />
                            <Row className="align-items-center">
                                <Col className="fw-bold">Tổng cộng:</Col>
                                <Col xs="auto" className="fw-bold">{total.toLocaleString()}₫</Col>
                            </Row>
                        </Stack>

                        {/* Discount Code */}
                        <Form.Group className="mt-3">
                            <Form.Control
                                type="text"
                                placeholder="Mã giảm giá"
                                className="mb-2"
                            />
                            <Button variant="secondary" className="w-100">
                                Áp dụng
                            </Button>
                        </Form.Group>
                    </Col>
                </div>
            </Container>
            <div className="fixed-bottom bg-white border-top p-3">
                <Container>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            {selectedPayment === 'COD' && (
                                <>
                                    <img
                                        src="https://mcdn.coolmate.me/image/October2024/mceclip2_42.png"
                                        alt="COD" className="me-2" style={{ width: '24px', height: '24px' }} />
                                    <span>
                                        <strong>COD</strong> thanh toán khi nhận món
                                    </span>
                                </>
                            )}
                            {selectedPayment === 'vnpay' && (
                                <>
                                    <img src="https://mcdn.coolmate.me/image/October2024/mceclip0_81.png"
                                        alt="VNPAY"
                                        className="me-2"
                                        style={{ width: '24px', height: '24px' }}
                                    />
                                    <span>
                                        <strong>VNPAY</strong> quét QR để thanh toán
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="text-end">
                            <div className="total-amount">
                                <span>Thành tiền: </span>
                                <span className="text-primary fw-bold">{total.toLocaleString()}₫</span>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => {
                                    if (selectedPayment === 'vnpay') {
                                        handleSubmit();
                                    } else {
                                        alert("Đặt món thành công! Bạn sẽ thanh toán khi nhận món.");
                                        navigate('/billing', {
                                            state: { success: true, message: 'Đặt món thành công!' }
                                        });
                                    }
                                }}
                            >
                                Đặt món
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default OrderPage;