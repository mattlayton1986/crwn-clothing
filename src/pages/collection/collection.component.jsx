import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selectors'
import styled from 'styled-components'
import CollectionItem from '../../components/collection-item/collection-item.component'
// import './collection.styles.scss'

const StyledCollectionPage = styled.main`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 38px;
    margin: 0 auto 30px;
  }
`

const ItemsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  & > article {
    margin-bottom: 30px;
  }
`

const CollectionPage = ({ collection }) => {
  const { title, items } = collection
  return (
  <StyledCollectionPage>
    <h2 className="title">{title}</h2>
    <ItemsContainer>
      {
        items.map(item => <CollectionItem key={item.id} item={item} />)
      }
    </ItemsContainer>
  </StyledCollectionPage>
)}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)