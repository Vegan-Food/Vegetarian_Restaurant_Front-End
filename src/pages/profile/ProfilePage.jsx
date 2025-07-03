import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Card, Form, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import './ProfilePage.css';
import SideBarProfile from '../../components/SideBarProfile';
import { getCustomerProfile } from '../../api/customer_profile';

const ProfilePage = () => {
    // State for dynamic address
    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

    // State for profile info
    const [profile, setProfile] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        address: ''
    });

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getCustomerProfile();
                setProfile(data);
            } catch (err) {
                console.error('Error fetching profile:', err);
            }
        };
        fetchProfile();
    }, []);

    // Fetch provinces data
    useEffect(() => {
        fetch('https://vietnamlabs.com/api/vietnamprovince')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data.data)) setProvinces(data.data);
                else setProvinces([]);
            });
    }, []);

    // Update wards when province changes
    useEffect(() => {
        if (selectedProvince) {
            const province = provinces.find(p => p.province === selectedProvince);
            setWards(province ? province.wards : []);
            setSelectedWard('');
        } else {
            setWards([]);
            setSelectedWard('');
        }
    }, [selectedProvince, provinces]);

    // Handle profile input change
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#FFFBE6' }}>
            <Header />
            <Container className="flex-grow-1 py-4 mt-100">
                <Row>
                    <Col md={3}>
                        {SideBarProfile.map(item => (
                            <Card className="sidebarprofile" style={{ marginBottom: '10px', borderRadius: '0' }} key={item.id}>
                                <Nav className="flex-column">
                                    <Nav.Link
                                        key={item.id}
                                        href={item.link}
                                        className={`sidebarprofile-item ${item.active ? 'active' : ''}`}
                                    >
                                        <img src={item.icon} alt="" className="sidebarprofile-icon" />
                                        <span>{item.title}</span>
                                    </Nav.Link>
                                </Nav>
                            </Card>
                        ))}
                    </Col>
                    <Col md={9}>
                        <Card className="content-card">
                            <Card.Body>
                                <h3 className="mb-4">Account Information</h3>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={profile.email} readOnly />
                                    </Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Full Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={profile.name}
                                                    onChange={handleProfileChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={profile.phoneNumber}
                                                    onChange={handleProfileChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Button variant="success" className="mt-3 end-btn">
                                        Update Information
                                    </Button>
                                </Form>

                                <hr className="my-4" />

                                <h3 className="mb-4">Shipping Address</h3>
                                <Form>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="House number, street name"
                                                    value={profile.address}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Province/City</Form.Label>
                                                <Form.Select
                                                    value={selectedProvince}
                                                    onChange={e => setSelectedProvince(e.target.value)}
                                                >
                                                    <option value="">Select province/city</option>
                                                    {provinces.map(province => (
                                                        <option key={province.province} value={province.province}>
                                                            {province.province}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ward</Form.Label>
                                                <Form.Select
                                                    value={selectedWard}
                                                    onChange={e => setSelectedWard(e.target.value)}
                                                    disabled={!wards.length}
                                                >
                                                    <option value="">Select ward</option>
                                                    {wards.map(ward => (
                                                        <option key={ward.name} value={ward.name}>
                                                            {ward.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="success" className="mt-3">
                                        Update Address
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfilePage;