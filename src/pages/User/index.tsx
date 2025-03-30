import React, { use, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CreateUserForm from "../../forms/CreateUserForm";
import { useParams } from "react-router-dom";
import { routes } from "../../routes/routes";

type User = {
  id: string;
  latitude: string;
  longitude: string;
  zipCode: number;
  name: string;
  timeZone: string;
};

interface OutletContext {
  OPEN_WEATHER_API_KEY: string;
  TIME_DB_KEY: string;
}
const User = () => {
  const { OPEN_WEATHER_API_KEY, TIME_DB_KEY } =
    useOutletContext<OutletContext>();
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
      data.zipCode !== user?.zipCode
        ? { ...data, ...(await handleLocation(data.zipCode)) }
        : { ...user, ...data };
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
  const handleLocation = async (zipCode: number) => {
    const getCoordinates = await fetch(
      routes.openWeatherLocation(`${zipCode}`, OPEN_WEATHER_API_KEY)
    );
    const coordinatesData = await getCoordinates.json();
    const { lat, lon } = coordinatesData;
    const getTimeZone = await fetch(routes.timeZoneDB(lat, lon, TIME_DB_KEY));
    const tzData = await getTimeZone.json();

    return { latitude: lat, longitude: lon, timeZone: tzData.zoneName };
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return null;

  return (
    <div className="card">
      <div className="content">
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
      </div>
    </div>
  );
};

export default User;
