import React, { Suspense } from "react";
import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import { Switch, Route, Redirect } from "react-router-dom";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { useSelector, useDispatch } from "react-redux";
import GlobalStyle from "./global.styles";

const HomePage = React.lazy(() =>
  import("./pages/homepage/homepage.component")
);
const ShopPage = React.lazy(() => import("./pages/shop/shop.component"));
const LoginPage = React.lazy(() => import("./pages/login/login.component"));
const CheckoutPage = React.lazy(() =>
  import("./pages/checkout/checkout.component")
);

const App = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/shop" component={ShopPage} />
            <Route
              path="/login"
              render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
            />
            <Route exact path="/" component={HomePage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

export default App;
