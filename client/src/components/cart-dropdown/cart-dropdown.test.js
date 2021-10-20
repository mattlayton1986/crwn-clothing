import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from "react-redux";

import CartDropdown, { EmptyMessageContainer } from "./cart-dropdown.component";
import CartItem from "../cart-item/cart-item.component";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

describe("CartDropdown component", () => {
  let wrapper,
    mockCartItems,
    mockToggleCartHidden,
    spyOnUseSelector,
    spyOnUseDispatch;

  beforeEach(() => {
    mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue(mockCartItems);

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(redux, "useDispatch");
    mockToggleCartHidden = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockToggleCartHidden);

    wrapper = shallow(<CartDropdown />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render CartDropdown component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // TODO: Figures out how to get history.push to work with
  // useHistory hook in a Jest test.
  // it("should call history.push when button is clicked", () => {
  //   wrapper.find("StyledCartDropdownButton").simulate("click");
  //   // expect(mockPush).toHaveBeenCalled();
  //   expect(mockDispatch).toHaveBeenCalledWith(toggleCartHidden());
  // });

  it("should render a number of CartItem components equal to the cartItems prop", () => {
    expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
  });

  it("should render EmptyMessageContainer if cartItems is empty", () => {
    mockCartItems = [];
    const newWrapper = mount(<CartDropdown />);
    expect(newWrapper.contains(EmptyMessageContainer)).toBe(true);
  });
});
