import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

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
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <button onClick={() => console.log("button clicked")}>Click</button>
      <div className="box">
        <Outlet context={{ userCoordinates: userCoordinates }} />
      </div>
    </>
  );
};

export default MainLayout;
