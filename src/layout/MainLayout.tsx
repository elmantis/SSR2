import React, { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

type MainLayoutProps = {
  OPEN_WEATHER_API_KEY?: string;
  TIME_DB_KEY?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  OPEN_WEATHER_API_KEY,
  TIME_DB_KEY,
}) => {
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
        <Outlet context={{ OPEN_WEATHER_API_KEY, TIME_DB_KEY }} />
      </div>
    </>
  );
};

export default MainLayout;
