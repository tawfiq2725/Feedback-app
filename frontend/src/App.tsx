import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/user/Footer";
import Navigation from "./components/user/Navigation";
import Home from "./pages/Home";
import LoginPage from "./components/user/Login";
import SignupPage from "./components/user/Signup";
import PublicRoute from "./components/PublicRoutes";
import Dashboard from "./pages/Dashboard";

export const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route path="/admin/login" element={<h1>Admin Login</h1>} />
          <Route
            path="/auth/*"
            element={<ProtectedRoute requiredRole="user" />}
          >
            <Route path="feedback/form" element={<h1>Form</h1>} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route
            path="/admin/auth/*"
            element={<ProtectedRoute requiredRole="admin" />}
          >
            <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="user/:id/feedbacks" element={<h1>All Feedbacks</h1>} />
            <Route
              path="user/:id/feedbacks/:feedbackId"
              element={<h1>Feedback Details</h1>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </Fragment>
  );
};
