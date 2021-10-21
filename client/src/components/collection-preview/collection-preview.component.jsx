import React from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router";
import CollectionItem from "../collection-item/collection-item.component";

export const StyledCollectionPreview = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  @media screen and (max-width: 800px) {
    align-items: center;
  }
`;

StyledCollectionPreview.displayName = "StyledCollectionPreview";

export const TitleContainer = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

TitleContainer.displayName = "TitleContainer";

export const Preview = styled.article`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }
`;

Preview.displayName = "Preview";

const CollectionPreview = ({ title, items, history, match }) => {

  return (
    <StyledCollectionPreview>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <Preview>
        {items
          .filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </Preview>
    </StyledCollectionPreview>
  );
};

export default withRouter(CollectionPreview);