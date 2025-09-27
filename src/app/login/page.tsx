"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./login.module.scss";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        "https://taysatest.pythonanywhere.com/api/auth/login/",
        data
      );

      if (response.data?.result) {
        const user = response.data.data[0];
        const token = user?.JWT_token;

        //Save tokon
        Cookies.set("auth_token", token, { expires: 7 });

        //Toast
        toast.success(response.data.message || "Login Successful!");
        console.log("User:", user);
        console.log("Token:", token);

        //Redirect
        router.push("/dashboard");
      } else {
        toast.error(response.data?.message || "error in login!");
      }
    } catch (error) {
      toast.error("Login faild Try again!");
      console.error("Error during login:", error);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            className={errors.email ? styles.inputError : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Email"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <div className={styles.passwordWrapper}>
            <input
              className={errors.password ? styles.inputError : ""}
              type={showPassword ? "text" : "password"}
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
            <span
              className={styles.toggleIcon}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
