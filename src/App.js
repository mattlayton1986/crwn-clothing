import React from 'react';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { Switch, Route, Redirect } from 'react-router-dom';
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { useSelector, useDispatch } from 'react-redux'

import './App.css';

const App = () => {

  const currentUser = useSelector( selectCurrentUser )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch])

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/shop" component={ShopPage} />
        <Route 
          path="/login" 
          render={() => 
            currentUser ? (
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

export default App;
