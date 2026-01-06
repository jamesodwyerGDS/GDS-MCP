import { addPx } from "./utils";

describe("AddPx", () => {
  test("converts number to string px", () => {
    expect(addPx(31)).toEqual("31px");
  });
  test("converts string to string px", () => {
    expect(addPx("31")).toEqual("31px");
    expect(addPx("33px")).toEqual("33px");
  });
  test("converts array of numbers and strings to array of px strings", () => {
    expect(addPx([31, "88", "99px"])).toEqual(["31px", "88px", "99px"]);
  });
  test("converts object of any level to PX values", () => {
    expect(
      addPx({
        level1: {
          level2: {
            level3: {
              numberKey: 24,
              stringKey: "33",
              alreadyAPx: "99px",
              arrayKey: [24, "33"],
            },
          },
        },
      }),
    ).toEqual({
      level1: {
        level2: {
          level3: {
            arrayKey: ["24px", "33px"],
            numberKey: "24px",
            alreadyAPx: "99px",
            stringKey: "33px",
          },
        },
      },
    });
  });
});
