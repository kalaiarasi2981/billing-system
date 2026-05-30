import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [users, setUsers] =
    useState([]);

  async function loadUsers() {
    const { data, error } =
      await supabase
        .from("users")
        .select("*")
        .order("username");

    if (error) {
      alert(error.message);
      return;
    }

    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function addUser() {
    if (!username || !password) {
      alert(
        "Enter username and password"
      );
      return;
    }

    const { error } =
      await supabase
        .from("users")
        .insert([
          {
            username,
            password,
            role: "staff",
          },
        ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Staff added");

    setUsername("");
    setPassword("");

    loadUsers();
  }

  async function deleteUser(id) {
    const { error } =
      await supabase
        .from("users")
        .delete()
        .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadUsers();
  }

  return (
    <div className="login-page">
    <div className="login-card">
      <h2 className="login-title">Admin Dashboard</h2>

      <h3 className="login-title">Add Staff User</h3>

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

      <button className="login-btn" onClick={addUser}>
        Add User
      </button>

      <hr />

      <h3 className="login-title">Users</h3>

      {users.length === 0 && (
        <p>No users</p>
      )}

      {users.map((user) => (
        <div className="user-row"
          key={user.id}
        >
          <strong className="user-text">
            {user.username}
          </strong>

          {" - "}

          {user.role}

          {user.role ===
            "staff" && (
            <button className="delete-btn"
              onClick={() =>
                deleteUser(
                  user.id
                )
              }
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}