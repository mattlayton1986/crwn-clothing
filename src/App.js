import React from 'react';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { Switch, Route, Redirect } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

import { onSnapshot } from 'firebase/firestore';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'

import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    // Set up a subscription for changes to the Auth state; passes a user object
    // to callback if user is logged in
    // Returns an unsubscribe function
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        onSnapshot(userRef, (snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      } else {
        // user is not signed in, so userAuth will be null
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/shop" component={ShopPage} />
          <Route 
            path="/login" 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' /> 
              ) : (
                <LoginPage />
              )} 
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);
