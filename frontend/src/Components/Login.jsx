import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../../public/assets/Login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://13.232.41.111:3005/api/v1/logins/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      localStorage.setItem("email", username);

      if (response.ok) {
        const data = await response.json();
        const role = data.result.user?.role?.role;

        if (role === "ADMIN") {
          navigate("/adminDashboard");
        } else if (role === "CLUB") {
          navigate("/clubDashboard");
        } else {
          navigate("/clubDashboard");
          // alert("Invalid role");
        }
      } else {
        // navigate("/clubDashboard");
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("An error occurred. Please try again.");

      // navigate("/clubDashboard");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4"
          onSubmit={handleSignIn}
        >
          <h2 className="text-4xl font-bold text-center py-6">Login</h2>
          <div className="flex flex-col py-2">
            <label>Username</label>
            <input
              className="border p-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Sign In
          </button>
          <div className="flex justify-between">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
