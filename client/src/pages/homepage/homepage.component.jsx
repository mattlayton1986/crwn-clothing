import React from 'react'
import Directory from '../../components/directory/directory.component'
import styled from 'styled-components'
// import './homepage.styles.scss'

const StyledHomePage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
`

const HomePage = () => (
  <StyledHomePage>
    <Directory />
  </StyledHomePage>
)

export default HomePage