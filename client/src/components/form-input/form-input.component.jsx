import React from 'react'
import styled, { css } from 'styled-components'

const subColor = '#595959'
const mainColor = 'black'

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`

export const InputGroup = styled.div`
  position: relative;
  margin: 45px 0;

  input[type="password"] {
    letter-spacing: 0.3em;
  }
`;
InputGroup.displayName = "InputGroup";

export const InputField = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

InputField.displayName = "InputField";

export const InputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => (shrink ? shrinkLabelStyles : null)}
`;

InputLabel.displayName = "InputLabel";

const FormInput = ({ handleChange, label, ...props }) => (
  <InputGroup>
    <InputField 
      onChange={handleChange}
      id={label} 
      {...props} 
    />
    {
      label ? (
        <InputLabel shrink={props.value.length} htmlFor={label}>
          {label}
        </InputLabel>
      ) : null
    }

  </InputGroup>
)

export default FormInput