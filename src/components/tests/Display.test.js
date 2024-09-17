import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "../Display";

import mockFetchShow from "./../../api/fetchShow";
jest.mock("./../../api/fetchShow");

const testShow = {
  //add in appropriate test data structure here.
  name: "Show Name",
  image: "show image url",
  summary: "Summary of show",
  seasons: [
    {
      name: "Season 1",
      id: 1,
      episodes: []
    },
    {
      name: "Season 2",
      id: 2,
      episodes: []
    },
    {
      name: "Season 3",
      id: 3,
      episodes: []
    }
  ]
};

test("Display component renders without any passed in props", () => {
  render(<Display />);
});

test("when fetch button is pressed, show component displays", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);
  const button = screen.queryByRole("button");
  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("when fetch button is pressed, same number of select options show up as there are seasons", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);

  render(<Display />);
  const button = screen.queryByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(3);
  });
});

test("displayFunc is called when the fetch button is pressed", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);
  const displayFunc = jest.fn();

  render(<Display displayFunc={displayFunc} />);
  const button = screen.getByRole("button");
  userEvent.click(button);

  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});

///Tasks:
//1. Add in necessary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
