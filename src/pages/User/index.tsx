import React, { use, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CreateUserForm from "../../forms/CreateUserForm";
import { useParams } from "react-router-dom";

type User = {
  id: string;
  latitude: string;
  longitude: string;
  zipCode: number;
  name: string;
};

interface OutletContext {
  userCoordinates: {
    latitude: string;
    longitude: string;
  };
}
const User = () => {
  const { userCoordinates } = useOutletContext<OutletContext>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const params = useParams();

  const fetchUser = async () => {
    const response = await fetch(`/api/v1/users/${params.id}`);
    const { data } = await response.json();
    setUser(data);
    setLoading(false);
  };
  const handleSubmit = async (data: { name: string; zipCode: number }) => {
    const response = await fetch(`/api/v1/users/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedUser = await response.json();

    setUser(updatedUser.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <>
      <CreateUserForm
        initialValues={{
          name: user?.name || "",
          zipCode: user?.zipCode || 0,
          latitude: user?.latitude,
          longitude: user?.longitude,
        }}
        coordinateValues={userCoordinates}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default User;
