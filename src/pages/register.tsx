import { useForm } from "react-hook-form";
import axios from "axios";

type RegisterFormData = {
  nickname: string;
  email: string;
  password: string;
};
export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axios.post(
        "https://share.apidog.com/4b7ea7f3-044c-4fa5-934b-3ad39e0f9619/user-info-20619547e0",
        data
      );
      console.log("Register successful:", response.data);
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  return (
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

      <button type="submit">Register</button>
    </form>
  );
}
