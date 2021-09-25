import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router'
// import './menu-item.styles.scss'

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ imageUrl }) => imageUrl});
  background-position: center;
  background-size: cover;
`

const Content = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  h1 {
    font-weight: bold;
    margin: 0 6px 0;
    font-size: 22px;
    color: #4a4a4a;
  }
  span {
    font-weight: lighter;
    font-size: 16px;
  }
`

const StyledMenuItem = styled.article`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  overflow: hidden;
  height: ${ ({size}) => size === 'large' ? '380px' : '240px' };
  &:first-child {
    margin-right: 7.5px;
  }
  &:last-child {
    margin-left: 7.5px;
  }
  &:hover {
    cursor: pointer;
    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }
    & ${Content} {
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
`

const MenuItem = ({ title, size, imageUrl, linkUrl, history, match }) => (
  <StyledMenuItem size={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <BackgroundImage imageUrl={imageUrl} />
    <Content>
      <h1>{title.toUpperCase()}</h1>
      <span>SHOP NOW</span>
    </Content>
  </StyledMenuItem>
)

export default withRouter(MenuItem)