import React from "react";
import { shallow } from "enzyme";
import CollectionItem from "./collection-item.component";
import * as redux from "react-redux";

describe("CollectionItem component", () => {
  let wrapper, mockAddItem, spyOnUseDispatch, imageUrl, mockName, mockPrice;

  beforeEach(() => {
    mockAddItem = jest.fn();

    spyOnUseDispatch = jest.spyOn(redux, "useDispatch");
    spyOnUseDispatch.mockReturnValue(mockAddItem);

    imageUrl = "www.testImage.com";
    mockName = "hats";
    mockPrice = 10;

    const mockProps = {
      item: {
        imageUrl: imageUrl,
        price: mockPrice,
        name: mockName,
        quantity: 2,
      },
    };

    wrapper = shallow(<CollectionItem {...mockProps} />);
  });

  it("should render CollectionItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call addItem when AddButton is clicked", () => {
    wrapper.find("AddButton").simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });

  it("should render imageUrl as a prop on ItemImage", () => {
    expect(wrapper.find("ItemImage").prop("imageUrl")).toBe(imageUrl);
  });

  it("should render name prop in NameContainer", () => {
    expect(wrapper.find("NameContainer").text()).toBe(mockName);
  });

  it("should render price prop in PriceContainer", () => {
    const priceString = wrapper.find("PriceContainer").text().replace("$", "");
    const price = parseInt(priceString);
    expect(price).toBe(mockPrice);
  });
});
