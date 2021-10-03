import React from 'react'
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'
import styled from 'styled-components'
// import './login.styles.scss'

const StyledLogin = styled.main`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
`

const LoginPage = () => (
  <StyledLogin>
    <SignIn />
    <SignUp />
  </StyledLogin>
)

export default LoginPage