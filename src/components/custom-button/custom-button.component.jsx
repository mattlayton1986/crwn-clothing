import React from 'react'
import styled, { css } from 'styled-components'
// import './custom-button.styles.scss'

// Variants
const basicButton = css`
  background-color: black;
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`

const invertedButton = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid black;
  }
`

const googleButton = css`
  background-color: #4285f4;
  color: white;
  border: none;

  &:hover {
    background-color: #357ae8;
  }
`

// Variant-switching function
const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleButton;
  }

  return props.inverted ? invertedButton : basicButton
}

const StyledButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  // Adds variant styles to button
  ${getButtonStyles}
`

const CustomButton = ({children, ...props}) => (
  <StyledButton {...props}> 
    {children}
  </StyledButton>
)

export default CustomButton