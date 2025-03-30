import React, { useEffect } from "react";
import CreateUserForm from "../../forms/CreateUserForm";

const Home = () => {
  const handleSubmit = async (data: { name: string; zipCode: number }) => {
    console.log("Form submitted with data:", data);
    try {
      console.log(data, "What");
      await fetch("/api/v1/users", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CreateUserForm
        initialValues={{ name: "", zipCode: 11111 }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
