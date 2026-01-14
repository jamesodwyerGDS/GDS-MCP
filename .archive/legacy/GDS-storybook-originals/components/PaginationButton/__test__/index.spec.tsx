import React from "react";
import { render } from "../../../test/utils";
import PaginationButton from "..";

describe("PaginationButton", () => {
  it("should render component", () => {
    const { container } = render(
      <PaginationButton
        onClick={() => {}}
        total={10}
        count={40}
        buttonLabel={"Show more"}
        recapLabel={
          <span>
            Showing <b>60</b> out of <b>320</b> events
          </span>
        }
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should render component in inverse", () => {
    const { container } = render(
      <PaginationButton
        inverse
        onClick={() => {}}
        total={10}
        count={40}
        buttonLabel={"Show more"}
        recapLabel={
          <span>
            Showing <b>60</b> out of <b>320</b> events
          </span>
        }
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
