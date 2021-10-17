import React from 'react'
import CollectionPreview from '../collection-preview/collection-preview.component'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

const StyledCollectionsOverview = styled.main`
  display: flex;
  flex-direction: column;
`

const CollectionsOverview = () => {
  const collections = useSelector(selectCollectionsForPreview)
  
  return (
    <StyledCollectionsOverview>
      {
        collections.map(({id, ...otherCollectionProps}) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))
      }
    </StyledCollectionsOverview>
  )
}

export default CollectionsOverview
