import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}) {
  const user =
    localStorage.getItem(
      "staffLoggedIn"
    );

  if (!user) {
    return (
      <Navigate
        to="/user-login"
        replace
      />
    );
  }

  return children;
}