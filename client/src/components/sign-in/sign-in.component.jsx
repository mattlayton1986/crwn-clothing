import React from 'react'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { useDispatch } from 'react-redux'
import styled from 'styled-components';

const StyledSignIn = styled.section`
  width: 380px;
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const SignIn = () => {
  const [userCredentials, setUserCredentials] = React.useState({
    email: '',
    password: '',
  })
  const { email, password } = userCredentials;
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(emailSignInStart({email, password}))
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setUserCredentials({
      ...userCredentials,
      [name]: value 
    })
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart())
  }


  return (
    <StyledSignIn>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput 
          name="email" 
          type="email" 
          label="email"
          value={email} 
          handleChange={handleChange}
          autocomplete="email"
          required 
        />

        <FormInput 
          name="password" 
          type="password" 
          label="password"
          value={password} 
          handleChange={handleChange}
          autocomplete="current-password"
          required 
        />

        <ButtonWrapper>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton 
            type="button" 
            onClick={handleGoogleSignIn} 
            isGoogleSignIn
          >
            Sign In With Google
          </CustomButton>
        </ButtonWrapper>
      </form>
    </StyledSignIn>
  )
}

export default SignIn