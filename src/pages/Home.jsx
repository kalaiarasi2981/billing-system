import { useNavigate } from "react-router-dom";
import "./Login.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
    <div className="login-card">
      <h1 className="login-title">
        Billing System</h1>
      <button className="login-btn"
        onClick={() => navigate("/admin-login")}
      >
        Admin Login
      </button>

      <button className="login-btn"
        onClick={() => navigate("/user-login")}
      >
        User Login
      </button>
    </div>
    </div>
  );
}

export default Home;