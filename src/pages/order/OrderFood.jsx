import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Row, Col, ListGroup, Image, Stack } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import { getProfile } from '../../api/customer_profile';
import { checkoutOrder, getPayOS } from '../../api/order';

const OrderPage = () => {
    const [setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const [profileLoading, setProfileLoading] = useState(true);

    const [paymentInfo, setPaymentInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        province: '',
        ward: '',
        note: ''
    });

    const [selectedPayment, setSelectedPayment] = useState('COD');

    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [discountCode, setDiscountCode] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                let address = data.address || '';
                let province = '';
                let ward = '';
                let street = '';

                if (address) {
                    const parts = address.split(',').map(part => part.trim());
                    if (parts.length >= 3) {
                        street = parts[0];
                        ward = parts[1];
                        province = parts[2];
                    } else if (parts.length === 2) {
                        street = parts[0];
                        province = parts[1];
                    } else if (parts.length === 1) {
                        street = parts[0];
                    }
                }

                setPaymentInfo(prev => ({
                    ...prev,
                    fullName: data.name || '',
                    email: data.email || '',
                    phone: data.phoneNumber || '',
                    address: street,
                    province: province,
                    ward: ward,
                }));
            } catch (err) {
                // Có thể xử lý lỗi ở đây nếu cần
            } finally {
                setProfileLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        fetch('https://vietnamlabs.com/api/vietnamprovince')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.data)) setProvinces(data.data);
                else setProvinces([]);
            });
    }, []);

    useEffect(() => {
        // Khi chọn province thì cập nhật danh sách wards
        const selectedProvince = provinces.find(p => p.province === paymentInfo.province);
        if (selectedProvince) {
            setWards(selectedProvince.wards);
        } else {
            setWards([]);
        }
    }, [paymentInfo.province, provinces]);

    if (profileLoading) return null;

    if (!cartItems || cartItems.length === 0) {
        return null;
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const shippingFee = 30000;
    const subtotal = calculateSubtotal();
    const total = subtotal + shippingFee;

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

    const handleCheckout = async () => {
        const paymentMethod = selectedPayment === 'vnpay' ? 'VNPAY' : 'CASH';
        const orderData = {
            paymentMethod,
            phoneNumber: paymentInfo.phone,
            address: `${paymentInfo.address}${paymentInfo.ward ? ', ' + paymentInfo.ward : ''}${paymentInfo.province ? ', ' + paymentInfo.province : ''}`,
            discountCode: discountCode,
        };
        console.log(orderData);
        try {
            const res = await checkoutOrder(orderData);
            console.log('Order API response:', res);

            if (selectedPayment === 'vnpay') {
                const paymentRes = await getPayOS(res);
                console.log('Payment API response:', paymentRes);
                if (paymentRes && paymentRes.checkoutUrl) {
                    window.open(paymentRes.checkoutUrl, '_blank');
                }
                navigate(`/`);
            } else {
                navigate(`/billing/${res}`);
            }
        } catch (err) {
            console.error('Order API error:', err);
            alert('Order failed!');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ paddingTop: '105px', zoom: 0.8 }}>
            <Header />
            <Container className="py-4 flex-grow-1" style={{ marginTop: '20px' }}>
                <div className="d-flex justify-content-between align-items-start">
                    {/* Left Side - Form */}
                    <div className="w-75 pe-4">
                        <h2 className="mb-4">Shipping Information</h2>
                        <Form onSubmit={handleCheckout}>
                            <Form.Group className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullName"
                                    value={paymentInfo.fullName}
                                    onChange={handleInputChange}
                                    readOnly
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
                                            readOnly
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number</Form.Label>
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
                                <Form.Label>Address</Form.Label>
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
                                        <Form.Label>Province/City</Form.Label>
                                        <Form.Select
                                            name="province"
                                            value={paymentInfo.province}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select province/city</option>
                                            {provinces.map(province => (
                                                <option key={province.id} value={province.province}>{province.province}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Ward</Form.Label>
                                        <Form.Select
                                            name="ward"
                                            value={paymentInfo.ward}
                                            onChange={handleInputChange}
                                            required
                                            disabled={!wards.length}
                                        >
                                            <option value="">Select ward</option>
                                            {wards.map(ward => (
                                                <option key={ward.name} value={ward.name}>{ward.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* <Form.Group className="mb-3">
                                <Form.Label>Note</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="note"
                                    value={paymentInfo.note}
                                    onChange={handleInputChange}
                                    rows={3}
                                    placeholder="Note for the dish (if any)"
                                />
                            </Form.Group> */}

                            {/* Payment Methods Section */}
                            <div className="payment-methods mt-4">
                                <h2 className="mb-4">Payment Method</h2>
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
                                                        <strong>Cash on Delivery</strong>
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
                                                        <strong>VNPAY E-wallet</strong>
                                                        <br />
                                                        <span className="text-muted small">Scan QR to pay</span>
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
                        <h3 className="mb-3">Your Order</h3>

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
                                                <small className="text-muted">Quantity: {item.quantity}</small>
                                                <span className="fw-bold">{(item.price * item.quantity).toLocaleString()}₫</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <Stack gap={2}>
                            <Row className="align-items-center">
                                <Col>Subtotal:</Col>
                                <Col xs="auto">{subtotal.toLocaleString()}₫</Col>
                            </Row>
                            <Row className="align-items-center">
                                <Col>Shipping Fee:</Col>
                                <Col xs="auto">{shippingFee.toLocaleString()}₫</Col>
                            </Row>
                            <hr className="my-2" />
                            <Row className="align-items-center">
                                <Col className="fw-bold">Total:</Col>
                                <Col xs="auto" className="fw-bold">{total.toLocaleString()}₫</Col>
                            </Row>
                        </Stack>

                        {/* Discount Code */}
                        <Form.Group className="mt-3">
                            <Form.Control
                                type="text"
                                placeholder="Discount code"
                                className="mb-2"
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
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
                                        <strong>COD</strong> pay on delivery
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
                                        <strong>VNPAY</strong> scan QR to pay
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="text-end">
                            <div className="total-amount">
                                <span>Total: </span>
                                <span className="text-primary fw-bold">{total.toLocaleString()}₫</span>
                            </div>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleCheckout}
                            >
                                Place Order
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