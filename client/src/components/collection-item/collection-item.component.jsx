import React from 'react'
import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button.component'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'

const ItemImage = styled.div`
  width: 100%;
  height: 95%;
  background-image: url(${({imageUrl}) => imageUrl});
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
`

const AddButton = styled(CustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;

  @media screen and (max-width: 800px) {
    display: block;
    opacity: 0.9;
    min-width: unset;
    padding: 0 10px;
  }
`

const StyledCollectionItem = styled.article`
  width: 22vw;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  &:hover {
    ${ItemImage} {
      opacity: 0.8;
    }

    ${AddButton} {
      opacity: 0.85;
      display: flex;
    }
  }

  @media screen and (max-width: 800px) {
    width: 40vw;
    &:hover {
      ${ItemImage} {
        opacity: unset;
      }

      ${AddButton} {
        opacity: unset;
        display: flex;
      }
    }
  }
`

const ItemFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  .name {
    width: 90%;
    margin-bottom: 15px;
  }

  .price {
    width: 10%;
    text-align: right;
  }
`

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item
  const dispatch = useDispatch() 

  const handleAddItem = item => {
    dispatch(addItem(item))
  }

  return (
    <StyledCollectionItem>
      <ItemImage imageUrl={imageUrl} />
      <ItemFooter>
        <span className="name">{ name }</span>
        <span className="price">${ price }</span>
      </ItemFooter>
      <AddButton 
        inverted 
        onClick={() => handleAddItem(item)}
      >
        ADD TO CART
      </AddButton>
    </StyledCollectionItem>
  )
}

export default CollectionItem