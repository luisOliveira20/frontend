/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isValidLogin, isFetching, hasLogin } = useAuth();

  useEffect(() => {
    hasLogin();
  }, [])

  if(isFetching) {
      return <div>Loading</div>
  }

  if (!isValidLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;