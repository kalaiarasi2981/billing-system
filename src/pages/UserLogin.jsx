import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./Login.css";

function UserLogin() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleLogin() {
    // read staff user
    const { data, error } =
      await supabase
        .from("users")
        .select("*")
        .eq(
          "username",
          username
        )
        .eq(
          "password",
          password
        )
        .single();

    if (error || !data) {
      alert(
        "Wrong username or password"
      );
      return;
    }

    // save session
    localStorage.setItem(
      "staffLoggedIn",
      "true"
    );

    localStorage.setItem(
      "staffUser",
      JSON.stringify(
        data
      )
    );

    navigate(
      "/user-dashboard"
    );
  }

  return (
    <div className="login-page">
    <div className="login-card">
      <h2 className="login-title">
        User Login
      </h2>

      <input className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button className="login-btn"
        onClick={
          handleLogin
        }
      >
        Login
      </button>
    </div>
    </div>

  );
}

export default UserLogin;