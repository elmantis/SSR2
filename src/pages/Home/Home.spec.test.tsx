// Home.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from ".";
import CreateUserForm from "../../forms/CreateUserForm";

jest.mock("react-router-dom", () => ({
  useOutletContext: () => ({
    OPEN_WEATHER_API_KEY: "wApiKey",
    TIME_DB_KEY: "timeDbKey",
  }),
}));
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

describe("Home", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    mockFetch.mockClear();
  });
  afterEach(() => {
    global.fetch = jest.fn();
  });
  afterAll(() => {
    jest.clearAllMocks;
  });

  test("calls fetch when CreateUserForm triggers onSubmit", async () => {
    const newUser = {
      name: "some name",
      zipCode: 11111,
      latitude: "1234",
      longitude: "5678",
    };
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ lat: newUser.latitude, lon: newUser.longitude }),
    });

    render(<Home />);

    const mockChildButton = screen.getByTestId("submitButton");
    fireEvent.click(mockChildButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
    expect(mockFetch).toHaveBeenNthCalledWith(
      1,
      "http://api.openweathermap.org/geo/1.0/zip?zip=11111&appid=wApiKey"
    );
    expect(mockFetch).toHaveBeenNthCalledWith(
      2,
      "http://api.timezonedb.com/v2.1/get-time-zone?key=timeDbKey&format=json&by=position&lat=1234&lng=5678"
    );
    expect(mockFetch).toHaveBeenNthCalledWith(3, "/api/v1/users", {
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    });
  });
});
