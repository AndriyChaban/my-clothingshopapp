import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shoppage/shoppage.component.jsx';
import Header from './components/header/header.component.jsx';
import './App.css';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';
import { onSnapshot, doc } from "firebase/firestore";
import { setCurrentUser } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors'
import CheckoutPage from './pages/checkout/checkoutpage.component.jsx';


class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const document = doc(firestore, "users", userAuth.uid)
        onSnapshot(document, (document) => {
          console.log(document);
          setCurrentUser({
            id: document.id,
            ...document.data()
          })
          console.log(this.state)
        });

      }
      else {
        setCurrentUser(userAuth);

      }
    });

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }


  render() {

    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop/*' element={<ShopPage />} />
          <Route path='/signin' element={this.props.currentUser ? (<HomePage />) : (<SignInAndSignUpPage />)} />
          <Route path='/checkout' element={< CheckoutPage />} />
        </Routes>
        {/* <Outlet /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStatetoProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

export default connect(mapStatetoProps, mapDispatchToProps)(App);
