import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CreateUserForm from "../../forms/CreateUserForm";

interface OutletContext {
  userLocation: {
    latitude: string;
    longitude: string;
    timeZone: string;
  };
}

const Home = () => {
  const { userLocation } = useOutletContext<OutletContext>();
  const [user, setUser] = useState({});
  const handleSubmit = async (data: { name: string; zipCode: number }) => {
    const { latitude, longitude, timeZone } = userLocation;
    const newUser = { ...data, latitude, longitude, timeZone };

    const response = await fetch("/api/v1/users", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await response.json();

    setUser(user.data);
  };
  return (
    <div className="card">
      <div className="content">
        <CreateUserForm
          initialValues={{
            name: "",
            zipCode: 0,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            timeZone: userLocation.timeZone,
          }}
          user={user}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
