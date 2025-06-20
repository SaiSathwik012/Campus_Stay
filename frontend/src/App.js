import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Rooms from './pages/Rooms'
import About from "./pages/About";
import Contact from "./pages/Contact";
import StudentRegister from "./pages/Student/StudentRegister";
import OwnerLogin from "./pages/Owner/OwnerLogin";
import OwnerRegister from "./pages/Owner/OwnerRegister";
import OwnerRoomForm from "./pages/Owner/OwnerRoomForm";
import AdminLogin from "./pages/Admin/AdminLogin";
import StudentLogin from "./pages/Student/StudentLogin";
import Room from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import "./styles/main.css";
import RoomList from "./pages/Owner/RoomList";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import AdminRooms from "./pages/Admin/AdminRooms";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth Routes - Public but restricted if logged in */}
          <Route element={<PublicRoute restricted={true} />}>
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/register" element={<StudentRegister />} />
            <Route path="/owner/login" element={<OwnerLogin />} />
            <Route path="/owner/register" element={<OwnerRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

          {/* Student Private Routes */}
          <Route element={<PrivateRoute role="student" />}>
            <Route path="/room" element={<Room />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/owner/rooms/:id" element={<RoomDetails />} />
          </Route>

          {/* Owner Private Routes */}
          <Route element={<PrivateRoute role="owner" />}>
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/room-form" element={<OwnerRoomForm />} />
            <Route path="/all-rooms" element={<RoomList />} />
          </Route>

          {/* Admin Private Routes */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin/rooms" element={<AdminRooms />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;