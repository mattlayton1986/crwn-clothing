import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectCollection } from '../../redux/shop/shop.selectors'
import styled from 'styled-components'
import CollectionItem from '../../components/collection-item/collection-item.component'

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

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`

const CollectionPage = () => {
  const { collectionId } = useParams()
  const collection = useSelector( selectCollection( collectionId ) )
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
  )
}

export default CollectionPage