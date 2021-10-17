import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

const CollectionsOverviewContainer = React.lazy(() =>
  import("../../components/collections-overview/collections-overview.container")
);

const CollectionPageContainer = React.lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

export default ShopPage;
