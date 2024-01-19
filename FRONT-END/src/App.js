import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './redux/authSlice.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './UserViewPages/Profile/Profile.jsx';
import Login from './UserViewPages/Login/Login.jsx';
import Register from './UserViewPages/Register/Register.jsx';
import Products from './AdminViewPages/Products/Products.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import ProductsList from './UserViewPages/products/ProductsList.jsx';
import TalkToUs from './UserViewPages/TalkToUs/TalkToUs.jsx'
import ProductDetails from './UserViewPages/ProductDetails/ProductDetails.jsx';
import Cart from './UserViewPages/Cart/Cart.jsx';
import Paiement from './UserViewPages/Paiement/Paiement.jsx';
import Commandes from './UserViewPages/Commandes/Commandes.jsx';
import Company from './UserViewPages/Company/Company.jsx'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminView/Products" element={<Products />} />
        <Route path="/AdminView/Categories" element={<Products />} />
        <Route path="/AdminView/Commandes" element={<Products />} />
        <Route path="/AdminView/DetailsCommandes" element={<Products />} />
        <Route path="/AdminView/Paniers" element={<Products />} />
        <Route path="/AdminView/Comments" element={<Products />} />
        <Route path="/AdminView/Users" element={<Products />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Cart" element={<Cart />} />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/Company"
          element={
            <PrivateRoute>
              <Company/>
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
          path="/Profile/:id"
          element={
            <PrivateRoute>
              <Commandes />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProductsList/:id"
          element={
            <PrivateRoute>
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/Paiement"
          element={
            <PrivateRoute>
              <Paiement />
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
