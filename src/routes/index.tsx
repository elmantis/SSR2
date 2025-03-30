import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import User from "../pages/User";
import MainLayout from "../layout/MainLayout";
import { routes } from "./routes";

type initialDataProps = {
  OPEN_WEATHER_API_KEY?: string;
  TIME_DB_KEY?: string;
};
const AppRoutes: React.FC<initialDataProps> = (initialData) => {
  return (
    <Routes>
      <Route
        element={
          <MainLayout
            OPEN_WEATHER_API_KEY={initialData.OPEN_WEATHER_API_KEY || ""}
            TIME_DB_KEY={initialData.TIME_DB_KEY || ""}
          />
        }
      >
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.users} element={<Users />} />
        <Route path={routes.user} element={<User />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
