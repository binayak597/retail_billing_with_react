import Menubar from "./components/menubar/Menubar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ManageCategory from "./pages/manage-category/ManageCategory";
import Dashboard from "./pages/dashboard/Dashboard";
import Explore from "./pages/explore/Explore";
import ManageUsers from "./pages/manage-users/ManageUsers";
import ManageItems from "./pages/manage-items/ManageItems";
import Login from "./pages/login/Login";
import OrderHistory from "./pages/order-history/OrderHistory";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  const location = useLocation();

  const { auth } = useContext(AppContext);

  const LoginRoute = ({ element }) => {
    if (auth.token) {
      return <Navigate to="/dashboard" replace />;
    }

    return element;
  };

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth.token) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return element;
  };
  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}

      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />

        {/* ADMIN ONLY ROUTES */}
        <Route
          path="/category"
          element={
            <ProtectedRoute
              element={<ManageCategory />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={<ManageUsers />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute
              element={<ManageItems />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />

        <Route path="/login" element={<LoginRoute element={<Login />} />} />

        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
