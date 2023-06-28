import { Outlet, Link, useNavigate } from "react-router-dom";
import "./styles.css";
import React, { useEffect, useState, useRef } from "react";
import { Navbar } from "flowbite-react";
import jwt_decode from 'jwt-decode';

const Layout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 970);
    const [isNavbarVisible, setIsNavbarVisible] = useState(!isMobile);
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();
    const tokenCheckInterval = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 970;
            setIsMobile(mobile);
            if (!mobile) {
                setIsNavbarVisible(true);
            }
        };
        window.addEventListener("resize", handleResize);

        const updateTokenStatus = () => {
            const token = sessionStorage.getItem('access_token');
            if (token) {
                const decodedToken = jwt_decode(token);
                setUserRole(decodedToken.Role);
            } else {
                setUserRole("");
                navigate("/Authentication");
            }
        };

        updateTokenStatus();

        tokenCheckInterval.current = setInterval(updateTokenStatus, 1000); // Checks every second

        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(tokenCheckInterval.current);
        };
    }, [navigate]);

    const handleToggleClick = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };

    const navbarStyle = {
        display: isNavbarVisible ? 'block' : 'none'
    };

    const navLinkStyle = {
        marginTop: "-10px"
    };

    const navLinkClass = "text-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0";

    return (
        <>
            <Navbar
                fluid
                rounded
                className="m-4"
            >
                {isMobile && <Navbar.Toggle onClick={handleToggleClick} />}
                <Navbar.Collapse style={navbarStyle} id="test">
                    {/* Only show the links if a user is authenticated */}
                    {userRole &&
                        <>
                            {/* List of pages available to every USER */}
                            <Navbar.Link href="/Home" className={navLinkClass} style={navLinkStyle}>Home</Navbar.Link>
                            <Navbar.Link href="/MealPlans" className={navLinkClass} style={navLinkStyle}>MealPlans</Navbar.Link>
                            <Navbar.Link href="/Workouts" className={navLinkClass} style={navLinkStyle}>Workouts</Navbar.Link>
                            <Navbar.Link href="/Locker" className={navLinkClass} style={navLinkStyle}>Locker</Navbar.Link>
                            <Navbar.Link href="/Contact" className={navLinkClass} style={navLinkStyle}>Contact</Navbar.Link>

                            {/* Page only available to ADMIN */}
                            {(userRole === 'ADMIN' || userRole === 'TRAINER') &&<>
                                <Navbar.Link href="/AddContent" className={navLinkClass} style={navLinkStyle}>Add Content</Navbar.Link>
                                </>
                            }
                            {userRole === 'ADMIN' &&<>
                            <Navbar.Link href="/AddTrainer" className={navLinkClass} style={navLinkStyle}>AddTrainer</Navbar.Link>
                            </>
                            }
                        </>
                    }

                    {/* Authentication page is always available */}
                    <Navbar.Link href="/Authentication" className={navLinkClass} style={navLinkStyle}>Authentication</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>

            <div className="p-4">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;