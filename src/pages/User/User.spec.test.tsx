// Home.test.js
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  RenderResult,
  act,
} from "@testing-library/react";
import User from ".";
import CreateUserForm from "../../forms/CreateUserForm";

import "@testing-library/jest-dom";

console.log(globalThis.fetch);
//Mock react-router-dom
jest.mock("react-router-dom", () => ({
  useOutletContext: () => ({
    OPEN_WEATHER_API_KEY: "wApiKey",
    TIME_DB_KEY: "timeDbKey",
  }),
  useParams: () => ({ id: "123" }),
}));

//Mock the onSubmit Action
jest.mock(
  "../../forms/CreateUserForm",
  () =>
    ({
      onSubmit,
    }: {
      onSubmit: (data: { name: string; zipCode: number }) => void;
    }) =>
      (
        <button
          data-testid="submitButton"
          onClick={() => onSubmit({ name: "some name", zipCode: 11111 })}
        >
          Mock Child
        </button>
      )
);

describe("User", () => {
  let mockFetch: jest.Mock;
  global.fetch = jest.fn();

  beforeEach(() => {
    mockFetch = global.fetch as jest.Mock;
    mockFetch.mockClear();
  });
  afterEach(() => {
    global.fetch = jest.fn();
  });
  afterAll(() => {
    jest.clearAllMocks;
  });

  it("fetches and displays user data on mount", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          id: "123",
          latitude: "40.7128",
          longitude: "-74.0060",
          zipCode: 10001,
          name: "Tomas",
          timeZone: "America/New_York",
        },
      }),
    });

    render(<User />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(mockFetch).toHaveBeenCalledWith("/api/v1/users/123");
  });

  it("updates user data when form is submitted and zip code is different", async () => {
    const thing = jest.spyOn(global, "fetch");
    const updatedUser = {
      name: "some name",
      zipCode: 11111,
      latitude: "34.0522",
      longitude: "-118.2437",
      timeZone: "America/Los_Angeles",
    };
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          id: "123",
          latitude: "40.7128",
          longitude: "-74.0060",
          zipCode: 10001,
          name: "Tomas",
          timeZone: "America/New_York",
        },
      }),
    });
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ lat: "34.0522", lon: "-118.2437" }),
    });
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ zoneName: "America/Los_Angeles" }),
    });
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        data: {
          id: "123",
          latitude: "34",
          longitude: "-118",
          zipCode: 90001,
          name: "Updated User",
          timeZone: "America/Los_Angeles",
        },
      }),
    });

    await act(async () => render(<User />));

    const mockChildButton = screen.getByTestId("submitButton");
    fireEvent.click(mockChildButton);
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(4));
    expect(thing).toHaveBeenCalled;
    expect(mockFetch).toHaveBeenNthCalledWith(1, "/api/v1/users/123");
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      "http://api.openweathermap.org/geo/1.0/zip?zip=11111&appid=wApiKey"
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      3,
      "http://api.timezonedb.com/v2.1/get-time-zone?key=timeDbKey&format=json&by=position&lat=34.0522&lng=-118.2437"
    );
    expect(mockFetch).toHaveBeenNthCalledWith(4, "/api/v1/users/123", {
      body: JSON.stringify(updatedUser),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });
  });
});
