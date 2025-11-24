// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Plus, MessageSquare, FileText } from 'lucide-react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState({ services: 0, projects: 0, team: 0, testimonials: 0, gallery: 0, Inquiries: 0 });

  useEffect(() => {
    const fetchAll = async () => {
      try {
          const  res =  await api.get('/dashboard/count');
              setCounts(res.data.counts)
        
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const cards = [
    { name: 'Projects', value: counts.projects, icon: FileText },
    { name: 'Services', value: counts.services, icon: FileText },
    { name: 'Gallery Items', value: counts.gallery, icon: FileText },
    { name: 'Testimonials', value: counts.testimonials, icon: Calendar },
    { name: 'Team Members', value: counts.team, icon: Users },
    { name: 'Inquiries', value: counts.Inquiries, icon: MessageSquare },
  ];
  return (
    <Container fluid className="py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="text-muted small mt-2 mt-md-0">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        {cards.map((stat, index) => (
          <Col xs={12} sm={6} lg={4} key={index} className="mb-3">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                    <stat.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h6 className="text-muted mb-1">{stat.name}</h6>
                    <h3 className="mb-0">{stat.value}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Overview */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-white py-3">
          <h5 className="mb-0">Manage Your Content</h5>
        </Card.Header>
        <Card.Body>
          <Row className="g-3">
            <Col xs={12} sm={6} lg={3}>
              <Link to="/admin/projects" className="card h-100 text-decoration-none quick-action-card">
                <Card.Body className="text-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                    <FileText size={24} className="text-primary" />
                  </div>
                  <h6 className="mb-0">Add Project</h6>
                </Card.Body>
              </Link>
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <Link to="/admin/services" className="card h-100 text-decoration-none quick-action-card">
                <Card.Body className="text-center">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                    <Plus size={24} className="text-success" />
                  </div>
                  <h6 className="mb-0">Add Service</h6>
                </Card.Body>
              </Link>
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <Link to="/admin/messages" className="card h-100 text-decoration-none quick-action-card">
                <Card.Body className="text-center">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                    <MessageSquare size={24} className="text-warning" />
                  </div>
                  <h6 className="mb-0">View Messages</h6>
                </Card.Body>
              </Link>
            </Col>
            <Col xs={12} sm={6} lg={3}>
              <Link to="/admin/gallery" className="card h-100 text-decoration-none quick-action-card">
                <Card.Body className="text-center">
                  <div className="bg-info bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                    <FileText size={24} className="text-info" />
                  </div>
                  <h6 className="mb-0">Open Gallery</h6>
                </Card.Body>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Quick Actions */}
      <Row className="g-3">
        <Col xs={12} sm={6} lg={3}>
          <Link to="/admin/projects" className="card h-100 text-decoration-none quick-action-card">
            <Card.Body className="text-center">
              <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                <FileText size={24} className="text-primary" />
              </div>
              <h6 className="mb-0">Manage Projects</h6>
            </Card.Body>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Link to="/admin/services" className="card h-100 text-decoration-none quick-action-card">
            <Card.Body className="text-center">
              <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                <Plus size={24} className="text-success" />
              </div>
              <h6 className="mb-0">Manage Services</h6>
            </Card.Body>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Link to="/admin/messages" className="card h-100 text-decoration-none quick-action-card">
            <Card.Body className="text-center">
              <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                <MessageSquare size={24} className="text-warning" />
              </div>
              <h6 className="mb-0">Manage Messages</h6>
            </Card.Body>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Link to="/admin/gallery" className="card h-100 text-decoration-none quick-action-card">
            <Card.Body className="text-center">
              <div className="bg-info bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                <FileText size={24} className="text-info" />
              </div>
              <h6 className="mb-0">Manage Gallery</h6>
            </Card.Body>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;