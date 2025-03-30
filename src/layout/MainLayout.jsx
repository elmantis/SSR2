import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const [userCoordinates, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>
          </div>
          <div className="navbar-start">
            <Link to="/about" className="navbar-item">
              About
            </Link>
          </div>
          <div className="navbar-start">
            <Link to="/users" className="navbar-item">
              Users
            </Link>
          </div>
        </div>
      </nav>
      <div className="box">
        <Outlet context={{ userCoordinates: userCoordinates }} />
      </div>
    </>
  );
};

export default MainLayout;
