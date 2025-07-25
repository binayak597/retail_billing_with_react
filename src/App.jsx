
import Menubar from './components/menubar/Menubar'
import {Routes, Route} from 'react-router-dom';
import ManageCategory from './pages/manage-category/ManageCategory';
import Dashboard from './pages/dashboard/Dashboard';
import Explore from './pages/explore/Explore';
import ManageUsers from './pages/manage-users/ManageUsers';
import ManageItems from './pages/manage-items/ManageItems';

const App = () => {
  return (
    <div>
      <Menubar />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<ManageCategory />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="/items" element={<ManageItems />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
      

    </div>
  )
}

export default App