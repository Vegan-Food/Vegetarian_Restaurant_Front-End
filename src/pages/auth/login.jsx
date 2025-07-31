import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Card, ToggleButton, ButtonGroup } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { loginByGoogle, loginWithAdmin } from '../../api/auth';

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
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  if (checkingAuth) {
    // Có thể return null hoặc spinner cho đẹp
    return null;
  }

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    localStorage.setItem('user', JSON.stringify(decoded));
    try {
      const res = await loginByGoogle(decoded.email, decoded.name);
      // Lưu token vào localStorage
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        console.log('Token:', res.token);
      }
    } catch (err) {
      toast.error('Error sending information to server!');
    }
    // In ra console thông tin cần thiết
    console.log('Tên:', decoded.name);
    console.log('Email:', decoded.email);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleError = () => {
    toast.error('Login failed. Please try again!');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(''); // Clear previous error
    try {
      const res = await loginWithAdmin(phone, password);
      if (res && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify({ email: res.email, role: res.role }));
        toast.success('Login successful!');
        setTimeout(() => {
          switch (res.role) {
            case "manager":
              window.location.href = '/manager-dashboard';
              break;
            case "staff":
              window.location.href = '/staff-dashboard';
              break;
            default:
              window.location.href = '/owner-dashboard';
              break;
          }
        }, 1500);
      } else {
        setLoginError('Login failed!');
      }
    } catch (err) {
      setLoginError('Invalid account or password!');
    }
  };

  return (
    <div style={{ background: appTheme.background, minHeight: '100vh', zoom: 0.8 }}>
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
                        Customer
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
                  <h2 className="text-center mb-4" style={{ color: appTheme.primary }}>Login</h2>
                  {role === 'admin' ? (
                    <>
                      <Form.Group className="mb-3" controlId="adminPhone">
                        <Form.Label>
                          Account <span style={{ color: appTheme.accent }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter admin account"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="adminPassword">
                        <Form.Label>
                          Password <span style={{ color: appTheme.accent }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <div className="d-flex flex-column align-items-center my-3">
                      <div style={{ opacity: agreePolicy ? 1 : 0.5, pointerEvents: agreePolicy ? 'auto' : 'none' }}>
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={handleError}
                          width="220"
                          theme="filled_blue"
                          shape="pill"
                          text="signin_with"
                          locale="en"
                        />
                      </div>
                      {!agreePolicy && (
                        <small className="text-muted mt-2" style={{ fontSize: '0.8rem' }}>
                          Please agree to the Privacy Policy to continue
                        </small>
                      )}
                    </div>
                  )}
                  {role !== 'admin' && (
                    <Form.Group className="mb-3" controlId="policy">
                      <Form.Check
                        type="checkbox"
                        checked={agreePolicy}
                        onChange={(e) => setAgreePolicy(e.target.checked)}
                        required
                        label={
                          <span>
                            I agree to provide Personal Information and allow Vegetarian Restaurant to use Personal Information in accordance with the{' '}
                            <a href="/about" className="login-link" style={{ color: appTheme.primary }}>Privacy Policy</a>.
                          </span>
                        }
                      />
                    </Form.Group>
                  )}
                  {role === 'admin' && (
                    <>
                      {loginError && (
                        <div 
                          className="alert alert-danger mb-3" 
                          style={{ 
                            fontSize: '0.9rem', 
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1px solid #dc3545',
                            backgroundColor: '#f8d7da',
                            color: '#721c24'
                          }}
                        >
                          {loginError}
                        </div>
                      )}
                      <Button
                        type="submit"
                        variant="success"
                        className="w-100"
                        style={{ background: appTheme.primary, border: 'none', fontWeight: 600, fontSize: '1.1rem', borderRadius: 8 }}
                      >
                        Login &nbsp;→
                      </Button>
                    </>
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