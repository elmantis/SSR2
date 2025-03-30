import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

const MainLayout = () => {
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
        <Outlet context={{}} />
      </div>
    </>
  );
};

export default MainLayout;
