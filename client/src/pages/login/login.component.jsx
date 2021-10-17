import React from 'react'
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'
import styled from 'styled-components'

const StyledLogin = styled.main`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    width: unset;
    align-items: center;
    > *:first-child {
      margin-bottom: 50px;
    }
  }
`

const LoginPage = () => (
  <StyledLogin>
    <SignIn />
    <SignUp />
  </StyledLogin>
)

export default LoginPage