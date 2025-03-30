import React, { useEffect, useState } from "react";
import Table from "../../components/Table";

type User = {
  id: string;
  latitude: string;
  longitude: string;
  zipCode: number;
  name: string;
  timeZone: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const handleUsers = async () => {
    const res = await fetch("/api/v1/users");
    const { data } = await res.json();

    setUsers(data);
  };

  useEffect(() => {
    handleUsers();
  }, []);

  return (
    <>
      <h1 className="title is-1">Users List</h1>
      <Table users={users} />
    </>
  );
};

export default Users;
