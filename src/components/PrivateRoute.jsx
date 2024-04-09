import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthService";

export default function PrivateRoute({ children, role = 'user' }) {
  const { currentUser, user } = useAuth();
  return !currentUser
    ?
    <Navigate to="/login" />
    :
    user && (user?.role === role ?
      children
      :
      <Navigate to={'/login'} />
    )
}
