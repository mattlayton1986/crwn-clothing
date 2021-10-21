import React from "react";
import * as redux from "react-redux";
import { shallow } from "enzyme";
import Header from "./header.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

describe("Header component", () => {
  let wrapper,
    mockCurrentUser,
    mockCartHidden,
    mockSignOutStart,
    spyonUseSelectorCurrentUser,
    spyOnUseSelectorCartHidden,
    spyOnUseDispatch;

  beforeEach(() => {
    mockCurrentUser = {
      uid: "123",
    };
    mockCartHidden = true;
    mockSignOutStart = jest.fn();

    // Mock useSelector hook
    spyonUseSelectorCurrentUser = jest.spyOn(redux, "useSelector");
    spyonUseSelectorCurrentUser.mockReturnValueOnce(mockCurrentUser);

    spyOnUseSelectorCartHidden = jest.spyOn(redux, "useSelector");
    spyOnUseSelectorCartHidden.mockReturnValueOnce(mockCartHidden);

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(redux, "useDispatch");
    spyOnUseDispatch.mockReturnValue(mockSignOutStart);

    wrapper = shallow(<Header />);
  });

  afterEach(() => {
    mockCurrentUser = null;
  });

  it("should render Header component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("if currentUser is present", () => {
    it("should render sign out link", () => {
      expect(wrapper.find("OptionLink").at(2).text()).toBe("SIGN OUT");
    });

    it("should call signOutStart method when link is clicked", () => {
      wrapper.find("OptionLink").at(2).simulate("click");
      expect(mockSignOutStart).toHaveBeenCalled();
    });
  });

  // TODO: figure out why mockCurrentUser = null is causing
  // wrong behavior
  // describe("if currentUser is null", () => {
  //   beforeEach(() => {
  //     mockCurrentUser = null;
  //   });

  //   it("should render sign in link", () => {
  //     expect(wrapper.find("OptionLink").at(2).text()).toBe("SIGN IN");
  //   });
  // });

  describe("if hidden is true", () => {
    it("should not render CartDropdown", () => {
      expect(wrapper.exists(CartDropdown)).toBe(false);
    });
  });

  // describe("if currentUser is null", () => {
  //   it("should render CartDropdown", () => {
  //     beforeEach(() => {
  //       mockCurrentUser = null;
  //       mockCartHidden = true;
  //     });

  //     expect(wrapper.exists(CartDropdown)).toBe(true);
  //   });
  // });
});
