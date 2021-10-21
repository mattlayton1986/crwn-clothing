import React from "react";
import { shallow, mount } from "enzyme";
import CollectionPreview, {
  TitleContainer,
} from "./collection-preview.component";

describe("CollectionPreview component", () => {
  let wrapper, mockProps, mockMatch, mockHistory;
  const mockRouteName = "hats";

  beforeEach(() => {
    mockMatch = {
      path: "/shop",
    };

    mockHistory = {
      push: jest.fn(),
    };

    mockProps = {
      title: "hats",
      history: mockHistory,
      routeName: mockRouteName,
      items: [],
    };

    wrapper = shallow(<CollectionPreview {...mockProps} />);
  });

  it("should render CollectionPreview component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
