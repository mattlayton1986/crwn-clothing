import React from "react";
import { shallow } from "enzyme";
import CheckoutItem from "./checkout-item.component";
import * as redux from "react-redux";

describe("CheckoutItem component", () => {
  let wrapper,
    mockClearItem,
    mockAddItem,
    mockRemoveItem,
    spyOnUseDispatchClearItem,
    spyonUseDispatchAddItem,
    spyOnUseDispatchRemoveItem;

  beforeEach(() => {
    // Mock useDispatch hook
    mockClearItem = mockAddItem = mockRemoveItem = jest.fn();

    spyOnUseDispatchClearItem =
      spyonUseDispatchAddItem =
      spyOnUseDispatchRemoveItem =
        jest.spyOn(redux, "useDispatch");

    spyOnUseDispatchClearItem.mockReturnValue(mockClearItem);
    spyonUseDispatchAddItem.mockReturnValue(mockAddItem);
    spyOnUseDispatchRemoveItem.mockReturnValue(mockRemoveItem);

    // Mock props
    const mockProps = {
      cartItem: {
        imageUrl: "www.testImage.com",
        price: 10,
        name: "hats",
        quantity: 2,
      },
    };

    wrapper = shallow(<CheckoutItem {...mockProps} />);
  });

  it("should render CheckoutItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call clearItem when remove button is clicked", () => {
    wrapper.find("RemoveButton").simulate("click");
    expect(mockClearItem).toHaveBeenCalled();
  });

  it("should call removeItem when left arrow is clicked", () => {
    wrapper.find("QuantityContainer").childAt(0).simulate("click");
    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it("should call addItem when right arrow is clicked", () => {
    wrapper.find("QuantityContainer").childAt(2).simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });
});
