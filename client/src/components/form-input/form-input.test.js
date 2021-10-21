import React from "react";
import { shallow } from "enzyme";
import FormInput from "./form-input.component";

describe("FormInput component", () => {
  let wrapper, mockHandleChange;

  beforeEach(() => {
    mockHandleChange = jest.fn();

    const mockProps = {
      label: "email",
      value: "test@google.com",
      handleChange: mockHandleChange,
    };

    wrapper = shallow(<FormInput {...mockProps} />);
  });

  it("should render FormInput component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleChange method when input changes", () => {
    wrapper.find("InputField").simulate("change");
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("should render InputLabel if there is a label", () => {
    expect(wrapper.exists("InputLabel")).toBe(true);
  });

  it("should not render InputLabel if there is no label", () => {
    const mockNewProps = {
      label: "",
      value: "test@google.com",
      handleChange: mockHandleChange,
    };
    const newWrapper = shallow(<FormInput {...mockNewProps} />);
    expect(newWrapper.exists("InputLabel")).toBe(false);
  });
});
