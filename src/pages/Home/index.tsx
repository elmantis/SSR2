import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CreateUserForm from "../../forms/CreateUserForm";
import { routes } from "../../routes/routes";

interface OutletContext {
  OPEN_WEATHER_API_KEY: string;
  TIME_DB_KEY: string;
}

const Home = () => {
  const { OPEN_WEATHER_API_KEY, TIME_DB_KEY } =
    useOutletContext<OutletContext>();
  const [user, setUser] = useState({});

  const handleSubmit = async (data: { name: string; zipCode: number }) => {
    const { latitude, longitude, timeZone } = await handleLocation(
      data.zipCode
    );
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
  return (
    <div className="card">
      <div className="content">
        <CreateUserForm
          initialValues={{
            name: "",
            zipCode: 0,
            latitude: "",
            longitude: "",
            timeZone: "",
          }}
          user={user}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
