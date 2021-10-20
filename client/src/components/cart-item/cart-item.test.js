import React from "react";
import { shallow } from "enzyme";
import CartItem from "./cart-item.component";

describe("CartItem component", () => {
  const mockItem = {
    imageUrl: "www.testImage.com",
    price: 10,
    name: "hats",
    quantity: 2,
  };

  const wrapper = shallow(<CartItem item={mockItem} />);

  it("should render CartItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
