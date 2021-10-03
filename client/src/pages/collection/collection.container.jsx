import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionLoaded } from '../../redux/shop/shop.selectors'
import withSpinner from '../../components/withSpinner/with-spinner.component'
import CollectionPage from './collection.component'

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionLoaded(state)
})

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  withSpinner,
)(CollectionPage)

export default CollectionPageContainer