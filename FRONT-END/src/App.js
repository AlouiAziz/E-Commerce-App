import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './redux/authSlice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Products from './AdminView/Products/Products.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProductsList from './UserView/products/ProductsList.jsx';
import TalkToUs from './pages/TalkToUs/TalkToUs.jsx'
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  // Define an array of paths where Navbar should not be displayed
  const excludedPaths = ['/', '/Register'];

  // Get the current path
  const currentPath = window.location.pathname;

  // Check if the current path is in the excluded paths array
  const shouldDisplayNavbar = !excludedPaths.includes(currentPath);

  return (
    <div className="App">
      {shouldDisplayNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminView/Products" element={<Products />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProductsList"
          element={
            <PrivateRoute>
              <ProductsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/TalkToUs"
          element={
            <PrivateRoute>
              <TalkToUs />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
