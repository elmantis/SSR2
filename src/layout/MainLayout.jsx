import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
    timeZone: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          setUserLocation({ latitude, longitude, timeZone });
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
            <Link to="/users" className="navbar-item">
              Users
            </Link>
          </div>
        </div>
      </nav>
      <div className="box">
        <Outlet context={{ userLocation: userLocation }} />
      </div>
    </>
  );
};

export default MainLayout;
