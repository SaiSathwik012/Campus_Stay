import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/OwnerDashboard.css";

const OwnerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="owner-dashboard-container">
            <div className="owner-dashboard-card">
                <h1 className="owner-dashboard-title">Owner Dashboard</h1>
                <p className="owner-dashboard-subtitle">Manage your property listings</p>

                <div className="dashboard-options">
                    <button
                        className="dashboard-btn create-room-btn"
                        onClick={() => navigate("/owner/room-form")}
                    >
                        Create a Room Form
                    </button>

                    <button
                        className="dashboard-btn room-list-btn"
                        onClick={() => navigate("/rooms")}
                    >
                        Room List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;