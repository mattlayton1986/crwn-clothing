import React from 'react'
import styled from 'styled-components'
import CollectionItem from '../collection-item/collection-item.component'
// import './collection-preview.styles.scss'

const StyledCollectionPreview = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  h2 {
    font-size: 28px;
    margin-bottom: 25px;
  }
`

const Preview = styled.article`
  display: flex;
  justify-content: space-between;
`

const CollectionPreview = ({ title, items }) => (
  <StyledCollectionPreview>
    <h2>{title.toUpperCase()}</h2>
    <Preview>
      {
        items
          .filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))
      }
    </Preview>
  </StyledCollectionPreview>
)

export default CollectionPreview