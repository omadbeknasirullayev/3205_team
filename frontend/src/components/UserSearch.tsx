import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  email: string;
  number?: string;
}

interface User {
  id: number;
  email: string;
  number: string;
}

const UserSearch: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [users, setUsers] = useState<User[]>([]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3001/api/search", data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
      alert("Failed to search users.");
    }
  };

  return (
    <div>
      <h1>Search Users</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register("email", { required: "Email is required" })} />
        </div>
        <div>
          <label>Number</label>
          <input {...register("number")} />
        </div>
        <button type="submit">Search</button>
      </form>
      {users.length > 0 && (
        <div>
          <h2>Results</h2>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.email} - {user.number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
