import React from "react";
import * as redux from "react-redux";
import { shallow } from "enzyme";
import Directory from "./directory.component";

describe("Directory component", () => {
  let wrapper, spyOnUseSelector, mockSections;

  beforeEach(() => {
    mockSections = [];

    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue(mockSections);

    wrapper = shallow(<Directory />);
  });

  it("should render Directory component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
