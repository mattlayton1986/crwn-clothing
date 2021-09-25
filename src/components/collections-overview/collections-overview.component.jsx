import React from 'react'
import CollectionPreview from '../collection-preview/collection-preview.component'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'
// import './collections-overview.styles.scss'

const StyledCollectionsOverview = styled.main`
  display: flex;
  flex-direction: column;
`

const CollectionsOverview = ({ collections }) => (
  <StyledCollectionsOverview>
    {
      collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </StyledCollectionsOverview>
)

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)
