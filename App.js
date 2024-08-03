import React, { Fragment, useEffect } from 'react';
import Carousel from './component/Carousel/Carousel';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Login from './component/Auth/Login';
import Register from './component/Auth/Register';
import Alert from './component/Layout/Alert';
import store from './store';
import { Provider } from 'react-redux';
import setAuthToken from './component/utils/setAuthToken';
import Dashboard from './component/Dashboard/Dashboard';
import { loadUser } from './action/auth';
import PrivateRoute from './component/routing/PrivateRoute'; 
import IndProduct from './component/Products/IndProduct'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CartProducts from './component/Products/CartProducts';
import OrderProducts from './component/Products/OrderProducts';
import PlaceOrder from './component/Products/PlaceOrder';

const App = () => {
  useEffect(() => {
    // Check for token in localStorage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // Log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: 'LOGOUT' });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Alert />
          <Routes>
            <Route path="/" element={<Carousel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/indproduct/:data" element={<PrivateRoute component={IndProduct} />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/cart" element={<PrivateRoute component={CartProducts} />} />
            <Route path="/order" element={<PrivateRoute component={OrderProducts} />} />
            <Route path="/placeorder/:data" element={<PrivateRoute component={PlaceOrder} />} />
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
