import { useForm } from "react-hook-form";

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

  const onSubmit = (data: RegisterFormData) => {
    console.log(data); // اینجا همه‌ی فیلدها رو یه جا داری
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("nickname", { required: "Nickname is required" })}
        placeholder="Nickname"
      />
      {errors.nickname && <p>{errors.nickname.message}</p>}

      <input
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Register</button>
    </form>
  );
}
