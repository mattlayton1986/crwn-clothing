import React from 'react';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'

import './App.css';

class App extends React.Component {

  componentDidMount() {
    const { checkUserSession } = this.props
    checkUserSession();
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

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
