"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // App Router

type RegisterFormData = {
  nickname: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post(
        "https://taysatest.pythonanywhere.com/api/auth/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Register successful:", response.data);
      if (response.data?.result) {
        toast.success(response.data.message || "Register successful!");
        router.push("/login");
      } else {
        toast.error(response.data?.message || "Error in register");
      }
    } catch (error) {
      // console.log("Error during registration:", error);
      toast.error("Registration failed");
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("nickname", { required: "Nickname is required" })}
          placeholder="Nickname"
        />
        {errors.nickname && <p>{errors.nickname.message}</p>}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: "Password must contain letters and numbers",
            },
          })}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
      <Toaster />
    </>
  );
}
