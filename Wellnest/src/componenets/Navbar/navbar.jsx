import './navbar.css'
import React, { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, signOut } from '../../config/firebase';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function OffcanvasNavbar() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#f53b3b",
                confirmButtonText: "Yes, logout!"
            });
            if (result.isConfirmed) {
                await signOut(auth);
                setUser(null);
                Swal.fire("Logged out!", "You have been logged out successfully.", "success");
            }
        } catch (error) {
            // console.error('Logout error:', error.message);
            Swal.fire("Error", error.message, "error");
        }
    };

    return (
        <div>
            {['md'].map((expand) => (
                <Navbar key={expand} expand={expand} className="mb-3 p-4">
                    <Container fluid>
                        <Navbar.Brand href="./">WellNest</Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Menu
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-center flex-grow-1">
                                    <Nav.Link href='./'>Home</Nav.Link>
                                    <NavDropdown
                                        title="Company"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item>
                                            <NavLink to="../about" className="navigation-link">About Us</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink to="../services" className="navigation-link">Our Services</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink to="../faqs" className="navigation-link">FAQs</NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Resources"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item>
                                            <NavLink to="../forums" className="navigation-link">Forums</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                            <NavLink to="../blogs" className="navigation-link">Blogs</NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Contact"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item>
                                        <NavLink to="../contact" className="navigation-link">Contact Us</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                        <NavLink to="../bookappointment" className="navigation-link">Book an Appointment</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>
                                        <NavLink to="../enrollasphysician" className="navigation-link">Enroll as a Physician</NavLink>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {!loading && !user && (
                                    <Form className="login-btn-container">
                                        <NavLink to={'../login'}>
                                            <button className='login-btn'>Login</button>
                                        </NavLink>
                                    </Form>
                                )}
                                {!loading && user && (
                                    <div className='logout-btn-container'>
                                        <button className='logout-btn' onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </div>
    );
}

export default OffcanvasNavbar;