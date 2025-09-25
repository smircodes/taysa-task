"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    // console.log(data);
    try {
      const response = await axios.post(
        "https://taysatest.pythonanywhere.com/api/auth/login/",
        data
      );

      if (response.data?.result) {
        const user = response.data.data[0];
        const token = user?.JWT_token;

        toast.success(response.data.message || "Login Successful!");
        console.log("User:", user);
        console.log("Token:", token);

        Cookies.set("auth_token", token, { expires: 7 });

        router.push("/dashboard");
      } else {
        toast.error(response.data?.message || "error in login!");
      }
      // console.log("login successful:", response.data);
    } catch (error) {
      toast.error("Login faild Try again!");
      console.error("Error during login:", error);
      // console.log("Error during login:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
