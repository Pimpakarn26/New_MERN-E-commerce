import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProtectAdmin = ({ children }) => {
  const { user, isLoading, getUser } = useContext(AuthContext);
  const location = useLocation();
  const userInfo = getUser(); // อาจเป็น null หรือ undefined ได้

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ตรวจสอบว่า userInfo ไม่เป็น null ก่อนเข้าถึง .role
  if (user && userInfo && userInfo.role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ProtectAdmin;
