import React from "react";
import * as redux from "react-redux";
import { shallow } from "enzyme";
import CollectionsOverview from "./collections-overview.component";

describe("CollectionsOverview component", () => {
  let wrapper, spyOnUseSelector, mockCollections;

  beforeEach(() => {
    mockCollections = [];

    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue(mockCollections);

    wrapper = shallow(<CollectionsOverview />);
  });

  it("should render CollectionsOverview component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
