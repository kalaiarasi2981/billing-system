import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function login() {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/admin-dashboard");
  }

  return (
    <div className="login-page">
    <div className="login-card">
      <h2 className="login-title">Admin Login</h2>

      <input className="login-input"
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input className="login-input"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button className="login-btn" onClick={login}>
        Login
      </button>
    </div>
    </div>
  );
}