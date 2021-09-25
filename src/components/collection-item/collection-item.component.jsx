import React from 'react'
import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button.component'
import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'
// import './collection-item.styles.scss'

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
  display:none;
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

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item
  return (
    <StyledCollectionItem>
      <ItemImage imageUrl={imageUrl} />
      <ItemFooter>
        <span className="name">{ name }</span>
        <span className="price">${ price }</span>
      </ItemFooter>
      <AddButton 
        inverted 
        onClick={() => addItem(item)}
      >
        ADD TO CART
      </AddButton>
    </StyledCollectionItem>
  )
}


const mapDispatchToProps = (dispatch) => ({
  addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem)