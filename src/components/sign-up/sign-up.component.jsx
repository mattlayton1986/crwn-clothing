import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { signUpStart } from '../../redux/user/user.actions'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
// import './sign-up.styles.scss'

const StyledSignUp = styled.section`
  display: flex;
  flex-direction: column;
  width: 380px;
`

const SignUp = () => {
  const dispatch = useDispatch()
  const [userCredentials, setUserCredentials] = React.useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  
  const { displayName, email, password, confirmPassword } = userCredentials

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(signUpStart(userCredentials))
  }

  const handleChange = event => {
    const { name, value } = event.target
    setUserCredentials({
      ...userCredentials,
      [name]: value 
    })
  }

    return (
      <StyledSignUp>
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput 
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
            label="Display Name"
            autocomplete="name"
            required
          />
          <FormInput 
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email address"
            autocomplete="email"
            required
          />
          <FormInput 
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            autocomplete="new-password"
            required
          />
          <FormInput 
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            autocomplete="new-password"
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </StyledSignUp>
    )
  }

export default SignUp