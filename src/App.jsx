
import Menubar from './components/menubar/Menubar'
import {Routes, Route, useLocation} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import ManageCategory from './pages/manage-category/ManageCategory';
import Dashboard from './pages/dashboard/Dashboard';
import Explore from './pages/explore/Explore';
import ManageUsers from './pages/manage-users/ManageUsers';
import ManageItems from './pages/manage-items/ManageItems';
import Login from './pages/login/Login';
import OrderHistory from './pages/order-history/OrderHistory';

const App = () => {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && <Menubar />}

      <Toaster />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      

    </div>
  )
}

export default App