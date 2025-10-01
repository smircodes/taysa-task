"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
  id: number;
  email: string;
};
export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = Cookies.get("user_info");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      setUser(userData);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Welcome to Dashboard 🎉</h1>
      {!user ? (
        <p>user data is loading...</p>
      ) : (
        <div>
          <h2>Welcome {user.email}!</h2>
          <p>This is your dashboard.</p>
          <p>Your user ID is: {user.id}</p>
        </div>
      )}
    </div>
  );
}
