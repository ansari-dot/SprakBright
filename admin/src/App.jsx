// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { isAuthenticated } from "./services/auth";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

const checkTokenExpiration = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return true;
    }

    return false;
  } catch (err) {
    // Invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
};

// Lazy imports
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Services = lazy(() => import("./pages/Services"));
const Team = lazy(() => import("./pages/team"));
const Testimonial = lazy(() => import("./pages/testimonial"));
const Message = lazy(() => import("./pages/Message"));
const Project = lazy(() => import("./pages/project"));
const Gallery = lazy(() => import("./pages/gallery.jsx"));
const Blogs =  lazy(()=> import ('./pages/Blogs.jsx'))
const Quotes =  lazy(()=> import ('./pages/AdminQuotes.jsx'))
// Protected Route
const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // 🔥 Check token on every route change
    if (checkTokenExpiration()) {
      window.location.href = "/login";
      return;
    }

    const auth = isAuthenticated();
    setIsAuth(auth);
  }, [location]);

  if (isAuth === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// App Component
const App = () => {
  // 🔥 Token check once on app load
  useEffect(() => {
    if (checkTokenExpiration()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Toaster position="top-right" />

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="team" element={<Team />} />
            <Route path="testimonials" element={<Testimonial />} />
            <Route path="messages" element={<Message />} />
            <Route path="projects" element={<Project />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path =  "blogs" element = {<Blogs />} />
            <Route path =  "quotes" element = {<Quotes />} />
          </Route>

          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
