import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface IProtectedRouteElementProps {
  children?: ReactNode;
  onlyUnAuth?: boolean;
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  children,
  onlyUnAuth = false,
}) => {
  const user = useSelector<any>((state) => state.profile.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const from = location.state?.from || "/";

    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteElement;
