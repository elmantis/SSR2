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
    const newUser = { ...data, ...userLocation };
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
    <>
      <CreateUserForm
        initialValues={{
          name: "",
          zipCode: 11111,
          latitude: "",
          longitude: "",
          timeZone: "",
        }}
        user={user}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
