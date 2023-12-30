import './App.css';
import Profile from './pages/Profile/Profile.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Products from './AdminView/Products/Products.jsx';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './redux/authSlice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(currentUser())
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/AdminView/Products' element={<Products />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Profile' element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
