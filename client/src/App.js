import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shoppage/shoppage.component.jsx';
import Header from './components/header/header.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { selectCurrentUser } from './redux/user/user.selectors'
import CheckoutPage from './pages/checkout/checkoutpage.component.jsx';
import { checkUserSession } from './redux/user/user.reducer.jsx';
import './App.css';



const App = () => {

  const unsubscribeFromAuth = () => null;

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    return unsubscribeFromAuth()
  }, [dispatch])



  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop/*' element={<ShopPage />} />
        <Route path='/signin' element={currentUser ? (<HomePage />) : (<SignInAndSignUpPage />)} />
        <Route path='/checkout' element={< CheckoutPage />} />
      </Routes>
      {/* <Outlet /> */}
    </div>
  );
}

// const mapDispatchToProps = dispatch => ({
//   checkUserSession: user => dispatch(checkUserSession())
// })

// const mapStatetoProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
// })

export default App;
