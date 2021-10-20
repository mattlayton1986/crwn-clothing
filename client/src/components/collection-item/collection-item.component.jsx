import React from 'react'
import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button.component'
import { useDispatch } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions'

export const ItemImage = styled.div`
  width: 100%;
  height: 95%;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
`;

ItemImage.displayName = "ItemImage";

export const AddButton = styled(CustomButton)`
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
`;

AddButton.displayName = "AddButton";

export const StyledCollectionItem = styled.article`
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
`;

StyledCollectionItem.displayName = "StyledCollectionItem";

export const ItemFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

ItemFooter.displayName = "ItemFooter";

export const NameContainer = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

NameContainer.displayName = "NameContainer";

export const PriceContainer = styled.span`
  width: 10%;
  text-align: right;
`;

PriceContainer.displayName = "PriceContainer";

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <StyledCollectionItem>
      <ItemImage imageUrl={imageUrl} />
      <ItemFooter>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </ItemFooter>
      <AddButton inverted onClick={() => handleAddItem(item)}>
        ADD TO CART
      </AddButton>
    </StyledCollectionItem>
  );
};

export default CollectionItem