import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import SalesView from "./pages/SalesView"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/User-dashboard" element={<UserDashboard />} />
        <Route path="/sales-view" element={<SalesView />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user-dashboard" element={
            <ProtectedRoute>
            <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;