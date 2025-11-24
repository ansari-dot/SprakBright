// src/components/AdminLayout.jsx
import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
// Add User to the imports
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Bell, 
  ChevronDown,
  User,  // Add this line
  BookCopyIcon
} from 'lucide-react';
import { Container, Navbar, Nav, Offcanvas, Dropdown, Badge } from 'react-bootstrap';
import { logout } from '../services/auth';
import api from '../services/api';
import './AdminLayout.css'; // We'll create this for custom styles

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

 const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: 'Projects', icon: FileText, href: '/admin/projects' },
  { name: 'Services', icon: Settings, href: '/admin/services' },
  { name: 'Gallery', icon: FileText, href: '/admin/gallery' },
  { name: 'Testimonials', icon: Calendar, href: '/admin/testimonials' },
  { name: 'Team', icon: Users, href: '/admin/team' },
  { name: 'Messages', icon: MessageSquare, href: '/admin/messages' },
   { name: 'Blogs', icon: BookCopyIcon, href: '/admin/blogs' },
];


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await api.get('/contact/get');
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        const unread = list.filter((m) => !m.read).length;
        setMessageCount(unread);
      } catch (e) {
      }
    };
    loadMessages();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar - Desktop */}
      <div className="d-none d-lg-flex flex-column flex-shrink-0 bg-white border-end" style={{ width: '250px' }}>
        <div className="p-3 border-bottom">
          <h4 className="m-0">Admin Panel</h4>
        </div>
        <div className="flex-grow-1 overflow-auto">
          <Nav className="nav-pills flex-column p-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Nav.Link
                  key={item.name}
                  as={Link}
                  to={item.href}
                  active={isActive(item.href)}
                  className="d-flex align-items-center mb-2 rounded-3"
                >
                  <Icon size={18} className="me-2" />
                  {item.name}
                </Nav.Link>
              );
            })}
          </Nav>
        </div>
        <div className="p-3 border-top">
          <button 
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
          >
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navigation */}
        <Navbar 
          bg="white" 
          expand="lg" 
          className={`shadow-sm ${scrolled ? 'shadow' : ''}`}
          style={{ transition: 'box-shadow 0.3s ease' }}
        >
          <Container fluid>
            <button 
              className="btn btn-link d-lg-none me-3 p-0"
              onClick={() => setShowSidebar(true)}
            >
              <Menu size={24} />
            </button>
            <Navbar.Brand className="d-none d-lg-block">
              {navItems.find(item => isActive(item.href))?.name || 'Dashboard'}
            </Navbar.Brand>
            
            <div className="ms-auto d-flex align-items-center">
              <button className="btn btn-link position-relative me-3 p-1">
                <Bell size={20} />
                {messageCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {messageCount}
                  </span>
                )}
              </button>
              
              <Dropdown align="end">
                <Dropdown.Toggle 
                  variant="link" 
                  id="user-dropdown" 
                  className="d-flex align-items-center text-decoration-none p-0"
                >
                  <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                    <User size={20} className="text-primary" />
                  </div>
                  <span className="d-none d-md-inline">Admin User</span>
                  <ChevronDown size={16} className="ms-1" />
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-sm border-0">
                  <Dropdown.Item onClick={handleLogout}>
                    <LogOut size={16} className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>

        {/* Page Content */}
        <div className="flex-grow-1 p-3 p-md-4">
          <Outlet />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Offcanvas 
        show={showSidebar} 
        onHide={() => setShowSidebar(false)} 
        placement="start"
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Nav.Link
                  key={item.name}
                  as={Link}
                  to={item.href}
                  active={isActive(item.href)}
                  className="d-flex align-items-center px-4 py-3"
                  onClick={() => setShowSidebar(false)}
                >
                  <Icon size={18} className="me-2" />
                  {item.name}
                  {item.name === 'Messages' && (
                    <Badge bg="danger" className="ms-auto">3</Badge>
                  )}
                </Nav.Link>
              );
            })}
            <div className="p-3 border-top mt-auto">
              <button 
                onClick={handleLogout}
                className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center"
              >
                <LogOut size={18} className="me-2" />
                Logout
              </button>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default AdminLayout;