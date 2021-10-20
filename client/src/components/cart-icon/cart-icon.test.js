import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import CartIcon from "./cart-icon.component";

describe("CartIcon component", () => {
  let wrapper,
    mockItemCount,
    mockToggleCartHidden,
    spyOnUseSelector,
    spyOnUseDispatch;

  beforeEach(() => {
    mockItemCount = 0;

    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue(mockItemCount);

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(redux, "useDispatch");
    mockToggleCartHidden = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockToggleCartHidden);

    wrapper = shallow(<CartIcon />);
  });

  it("should render CartIcon component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call toggleCartHidden when icon is clicked", () => {
    wrapper.find("StyledCartIcon").simulate("click");
    expect(mockToggleCartHidden).toHaveBeenCalled();
  });

  it("should render the itemCount as the text", () => {
    const itemCount = parseInt(wrapper.find("ItemCount").text());
    expect(itemCount).toBe(0);
  });
});
