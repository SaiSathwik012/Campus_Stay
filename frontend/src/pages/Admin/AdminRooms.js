import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
    FaTrash,
    FaSignOutAlt,
    FaSearch,
    FaPhone,
    FaUser,
    FaHome,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaBed
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "../../styles/AdminRooms.css";

const rooms_url = process.env.REACT_APP_API_URL

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                if (!token) {
                    navigate("/admin/login");
                    return;
                }

                const response = await axios.get(`${rooms_url}/api/rooms`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRooms(response.data);
                setFilteredRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to fetch rooms. Please try again.",
                    icon: "error",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
    }, [navigate]);

    useEffect(() => {
        const results = rooms.filter(room =>
            room.ownerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.contactNumber?.includes(searchTerm) ||
            room.address?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRooms(results);
    }, [searchTerm, rooms]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Confirm Deletion",
                html: `
          <div style="color: #ff4757; font-size: 3rem; margin: 1rem 0;">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <p>This will permanently delete the room listing!</p>
        `,
                showCancelButton: true,
                confirmButtonColor: "#ff4757",
                cancelButtonColor: "#576574",
                confirmButtonText: "Delete",
                cancelButtonText: "Cancel",
                focusConfirm: false,
                customClass: {
                    popup: 'swal2-delete-popup'
                }
            });

            if (result.isConfirmed) {
                const token = localStorage.getItem("adminToken");
                await axios.delete(`${rooms_url}/api/rooms/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setRooms(rooms.filter((room) => room._id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "The room has been deleted.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error("Error deleting room:", error);
            Swal.fire("Error", "Failed to delete room.", "error");
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure you want to logout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3b82f6",
            cancelButtonColor: "#576574",
            confirmButtonText: "Yes, logout"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("adminToken");
                navigate("/admin/login");
            }
        });
    };

    const formatContactNumber = (number) => {
        if (!number) return "Not provided";
        const cleaned = number.toString().replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        return match ? `(${match[1]}) ${match[2]}-${match[3]}` : number;
    };

    if (isLoading) {
        return (
            <div className="admin-rooms-loading">
                <div className="spinner"></div>
                <p>Loading rooms...</p>
            </div>
        );
    }

    return (
        <div className="admin-rooms-container">
            <div className="admin-header">
                <div className="header-content">
                    <h1>
                        <FaHome className="header-icon" /> Room Management Dashboard
                    </h1>
                    <button onClick={handleLogout} className="logout-btn">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </div>

            <div className="admin-content">
                <div className="search-bar">
                    <div className="search-input-container">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by owner, contact number, or address..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="stats-card">
                        <span className="stats-number">{filteredRooms.length}</span>
                        <span className="stats-label">Total Rooms</span>
                    </div>
                </div>

                <div className="table-container">
                    <table className="rooms-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>
                                    <FaUser className="table-icon" /> Owner
                                </th>
                                <th>
                                    <FaPhone className="table-icon" /> Contact Number
                                </th>
                                <th>
                                    <FaMapMarkerAlt className="table-icon" /> Address
                                </th>
                                <th>
                                    <FaBed className="table-icon" /> Beds
                                </th>
                                <th>
                                    <FaMoneyBillWave className="table-icon" /> Rent
                                </th>
                                <th>
                                    <FaCalendarAlt className="table-icon" /> Available
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRooms.length > 0 ? (
                                filteredRooms.map((room, index) => (
                                    <tr key={room._id}>
                                        <td>{index + 1}</td>
                                        <td className="owner-cell">
                                            <div className="owner-info">
                                                <span className="owner-name">{room.ownerName || "Not provided"}</span>
                                                {room.email && (
                                                    <span className="owner-email">{room.email}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            {room.contactNumber ? (
                                                <a
                                                    href={`tel:${room.contactNumber}`}
                                                    className="phone-link"
                                                    title="Click to call"
                                                >
                                                    {formatContactNumber(room.contactNumber)}
                                                </a>
                                            ) : (
                                                "Not provided"
                                            )}
                                        </td>
                                        <td className="address-cell">
                                            {room.address || "Not provided"}
                                        </td>
                                        <td>{room.bedrooms || "N/A"}</td>
                                        <td>${room.rent ? room.rent.toLocaleString() : "N/A"}</td>
                                        <td>
                                            {room.availableFrom
                                                ? new Date(room.availableFrom).toLocaleDateString()
                                                : "N/A"}
                                        </td>
                                        <td className="actions-cell">
                                            <button
                                                className="edit-btn"
                                                onClick={() => navigate(`/admin/rooms/edit/${room._id}`)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(room._id)}
                                                className="delete-btn"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="no-rooms-row">
                                    <td colSpan="8">
                                        <div className="no-rooms">
                                            <img
                                                src="/images/no-data.svg"
                                                alt="No rooms found"
                                                className="no-rooms-img"
                                            />
                                            <p>No rooms found matching your search</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminRooms;