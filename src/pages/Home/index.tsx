import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import CreateUserForm from "../../forms/CreateUserForm";

interface OutletContext {
  userCoordinates: {
    latitude: string;
    longitude: string;
  };
}

const Home = () => {
  const { userCoordinates } = useOutletContext<OutletContext>();
  const handleSubmit = async (data: { name: string; zipCode: number }) => {
    const response = await fetch("/api/v1/users", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await response.json();

    console.log(user);
  };
  return (
    <>
      <CreateUserForm
        initialValues={{
          name: "",
          zipCode: 11111,
          latitude: "",
          longitude: "",
        }}
        coordinateValues={userCoordinates}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
