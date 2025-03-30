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
  timeZone: string;
};

interface OutletContext {
  userLocation: {
    latitude: string;
    longitude: string;
    timeZone: string;
  };
}
const User = () => {
  const { userLocation } = useOutletContext<OutletContext>();
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
    const payload =
      data.zipCode !== user?.zipCode ? { ...data, ...userLocation } : data;
    const response = await fetch(`/api/v1/users/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
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
          timeZone: user?.timeZone,
        }}
        onSubmit={handleSubmit}
        user={user}
      />
    </>
  );
};

export default User;
