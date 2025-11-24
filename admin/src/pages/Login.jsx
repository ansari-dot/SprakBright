// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../services/auth';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { Container, Row, Col, Card, Form, Button, Spinner, InputGroup } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex align-items-center justify-content-center brand-auth-bg" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <div className="text-center">
                <h4 className="mb-1">Admin Sign In</h4>
                <div className="text-muted">Enter your credentials to access the admin panel</div>
              </div>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><Mail size={18} /></InputGroup.Text>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><Lock size={18} /></InputGroup.Text>
                    <Form.Control type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                    <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" id="remember-me" label="Remember me" />
                  <a href="/forgot-password" className="text-primary text-decoration-none">Forgot your password?</a>
                </div>

                <Button type="submit" disabled={isLoading} className="w-100" variant="primary">
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;