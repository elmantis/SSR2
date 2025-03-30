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
    console.log("Form submitted with data:", data);

    console.log(data, "What");
    await fetch("/api/v1/users", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
