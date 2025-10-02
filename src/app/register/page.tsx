"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; // App Router
import styles from "./register.module.scss";
import Cookies from "js-cookie";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type RegisterFormData = {
  nickname: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
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
        data
      );
      // console.log("Register successful:", response.data);
      if (response.data?.result) {
        Cookies.set("user_info", JSON.stringify(response.data.data[0]), {
          expires: 7,
        });

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
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className={styles.formGroup}>
          <label>Nick name</label>
          <input
            className={errors.nickname ? styles.inputError : ""}
            {...register("nickname", { required: "Nickname is required" })}
            placeholder="Enter username"
          />
          {errors.nickname && (
            <p className={styles.error}>{errors.nickname.message}</p>
          )}
        </div>

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
            placeholder="Enter email"
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
          {isSubmitting ? "Loading..." : "Register"}
        </button>
      </form>
      <Toaster
        toastOptions={{
          duration: 6000,
        }}
      />
    </div>
  );
}
