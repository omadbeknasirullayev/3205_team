import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  email: string;
  number?: string;
}

const UserForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3001/api/users", data);
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register("email", { required: "Email is required" })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label>Number</label>
          <input {...register("number")} />
          {errors.number && <span>{errors.number.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
