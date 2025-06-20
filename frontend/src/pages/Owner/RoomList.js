import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter,
    Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    // Create axios instance with auth interceptor
    const authAxios = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Add request interceptor to include token
    authAxios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    // Add response interceptor to handle 401 errors
    authAxios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized error
                localStorage.removeItem('token');
                window.location.href = '/login'; // Redirect to login
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await authAxios.get('/rooms');
                setRooms(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                if (err.response && err.response.status === 401) {
                    setError('Session expired. Please login again.');
                }
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = async () => {
        try {
            // Verify token exists before making the request
            const token = localStorage.getItem('token');
            if (!token) {
                setDeleteError('No authentication token found. Please login again.');
                return;
            }

            await authAxios.delete(`/rooms/${roomToDelete}`);
            setRooms(rooms.filter(room => room._id !== roomToDelete));
            setDeleteModal(false);
            setDeleteSuccess(true);
            setTimeout(() => setDeleteSuccess(false), 3000);
        } catch (err) {
            console.error('Error deleting room:', err);
            setDeleteError(
                err.response?.data?.message ||
                err.message ||
                'Failed to delete room'
            );

            // Handle specific error cases
            if (err.response?.status === 401) {
                setDeleteError('Session expired. Please login again.');
            } else if (err.response?.status === 404) {
                setDeleteError('Room not found');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mt-4">
            <h2>Available Rooms</h2>

            {deleteSuccess && (
                <Alert color="success" toggle={() => setDeleteSuccess(false)}>
                    Room deleted successfully!
                </Alert>
            )}

            <Row>
                {rooms.map(room => (
                    <Col key={room._id} md="4" className="mb-4">
                        <Card>
                            <CardImg
                                top
                                src={`http://localhost:5000/uploads/${room.roomPictures[0]}`}
                                alt={room.roomType}
                            />
                            <CardBody>
                                <CardTitle tag="h5">{room.roomType}</CardTitle>
                                <CardSubtitle className="mb-2 text-muted">
                                    {room.address}
                                </CardSubtitle>
                                <CardText>
                                    Price: ₹{room.pricing}/month
                                </CardText>
                                <Button
                                    color="danger"
                                    onClick={() => {
                                        setRoomToDelete(room._id);
                                        setDeleteModal(true);
                                        setDeleteError(null);
                                    }}
                                >
                                    Delete Room
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
                <ModalHeader toggle={() => setDeleteModal(false)}>
                    Confirm Delete
                </ModalHeader>
                <ModalBody>
                    {deleteError && <Alert color="danger">{deleteError}</Alert>}
                    Are you sure you want to delete this room? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => setDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button color="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default RoomList;