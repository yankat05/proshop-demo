import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//  Outlet is basically what we want to return if we're logged in
// it will put out whatever page or screen we're trying to load.

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

   return userInfo ? <Outlet /> : <Navigate to='/login' replace />
  //iif someone hit shipping page and   if there's userInfo then it will show the shipping page else, it will redirect to the login page
  //  just to replace past history
 }

export default PrivateRoute;
