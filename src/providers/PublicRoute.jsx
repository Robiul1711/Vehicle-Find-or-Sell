import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-custom-primary"></div>
      </div>
    );
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
