import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Card, ToggleButton, ButtonGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { login } from '../../api/auth';

const appTheme = {
  primary: '#347928',
  secondary: '#C0EBA6',
  background: '#FFFBE6',
  accent: '#FCCD2A'
};

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    try {
      const res = await login(decoded.email, decoded.name);
      // Lưu token vào localStorage
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        console.log('Token:', res.token);
      }
    } catch (err) {
      toast.error('Lỗi gửi thông tin đến server!');
    }
    // In ra console thông tin cần thiết
    console.log('Tên:', decoded.name);
    console.log('Email:', decoded.email);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleError = () => {
    toast.error('Đăng nhập thất bại. Vui lòng thử lại!');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập admin ở đây
    toast.info('Chức năng đăng nhập admin đang phát triển!');
  };

  return (
    <div style={{ background: appTheme.background, minHeight: '100vh' }}>
      <Header />
      <Container className="d-flex align-items-center" style={{ minHeight: '90vh' }}>
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={7} lg={5}>
            <Card className="shadow" style={{ borderRadius: 16, width: '600px' }}>
              <Card.Body>
                <Form onSubmit={role === 'admin' ? handleLogin : e => e.preventDefault()}>
                  <div className="d-flex justify-content-center mb-3">
                    <ButtonGroup>
                      <ToggleButton
                        id="radio-customer"
                        type="radio"
                        variant={role === 'customer' ? 'success' : 'outline-success'}
                        name="role"
                        value="customer"
                        checked={role === 'customer'}
                        onChange={() => setRole('customer')}
                        style={{ width: '200px' }}
                      >
                        Khách hàng
                      </ToggleButton>
                      <ToggleButton
                        style={{ width: '200px' }}
                        id="radio-admin"
                        type="radio"
                        variant={role === 'admin' ? 'success' : 'outline-success'}
                        name="role"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={() => setRole('admin')}
                      >
                        Admin
                      </ToggleButton>
                    </ButtonGroup>
                  </div>
                  <h2 className="text-center mb-4" style={{ color: appTheme.primary }}>Đăng nhập</h2>
                  {role === 'admin' ? (
                    <>
                      <Form.Group className="mb-3" controlId="adminPhone">
                        <Form.Label>
                          Tài khoản <span style={{ color: appTheme.accent }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nhập tài khoản admin"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="adminPassword">
                        <Form.Label>
                          Mật khẩu <span style={{ color: appTheme.accent }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <div className="d-flex flex-column align-items-center my-3">
                      <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        width="220"
                        theme="filled_blue"
                        shape="pill"
                        text="signin_with"
                        locale="vi"
                      />
                    </div>
                  )}
                  {role !== 'admin' && (
                    <Form.Group className="mb-3" controlId="policy">
                      <Form.Check
                        type="checkbox"
                        required
                        label={
                          <span>
                            Khách hàng đồng ý cung cấp Thông Tin Cá Nhân và cho phép Vegetarian Restaurant sử dụng Thông Tin Cá Nhân phù hợp với{' '}
                            <a href="#" className="login-link" style={{ color: appTheme.primary }}>Chính sách bảo mật</a>.
                          </span>
                        }
                      />
                    </Form.Group>
                  )}
                  {role === 'admin' && (
                    <Button
                      type="submit"
                      variant="success"
                      className="w-100"
                      style={{ background: appTheme.primary, border: 'none', fontWeight: 600, fontSize: '1.1rem', borderRadius: 8 }}
                    >
                      Đăng nhập &nbsp;→
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;