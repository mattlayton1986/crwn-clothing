import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'
import { signUpStart } from '../../redux/user/user.actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import './sign-up.styles.scss'

const StyledSignUp = styled.section`
  display: flex;
  flex-direction: column;
  width: 380px;
`

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const { signUpStart } = this.props
    
    try {
      signUpStart(this.state)
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const { displayName, email, password, confirmPassword } = this.state
    return (
      <StyledSignUp>
        <h2>I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput 
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            autocomplete="name"
            required
          />
          <FormInput 
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email address"
            autocomplete="email"
            required
          />
          <FormInput 
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            autocomplete="new-password"
            required
          />
          <FormInput 
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            autocomplete="new-password"
            required
          />

          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </StyledSignUp>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  signUpStart: (user) => dispatch(signUpStart(user))
})

export default connect(null, mapDispatchToProps)(SignUp)