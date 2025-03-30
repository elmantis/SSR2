import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUserForm from ".";
import "@testing-library/jest-dom";

describe("CreateUserForm", () => {
  const defaultProps = {
    initialValues: {
      name: "",
      zipCode: 0,
      longitude: "",
      latitude: "",
      timeZone: "",
    },
    userLocation: {
      latitude: "",
      longitude: "",
      timeZone: "",
    },
    onSubmit: () => {},
  };

  const elements = {
    nameField: () => screen.getByRole("textbox", { name: "Full Name" }),
    zipCodeField: () => screen.getByRole("textbox", { name: "Zip Code" }),
    latitudeField: () => screen.getByRole("textbox", { name: "latitude" }),
    longitudeField: () => screen.getByRole("textbox", { name: "Longitude" }),
    timeZoneField: () => screen.getByRole("textbox", { name: "Time Zone" }),
    signUpBtn: () => screen.getByText("Submit"),
  };
  const renderForm = (props = defaultProps) => {
    render(<CreateUserForm {...props} />);
  };
  it("Submits the form with the correct form values", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    const props = {
      ...defaultProps,
      onSubmit,
    };

    renderForm(props);

    await user.type(elements.nameField(), "some name");
    await user.type(elements.zipCodeField(), "111111");

    await user.click(elements.signUpBtn());

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        {
          name: "some name",
          zipCode: 111111,
          latitude: "",
          longitude: "",
          timeZone: "",
        },
        expect.anything()
      )
    );
  });

  it("displays error messages when validation fails", async () => {
    const user = userEvent.setup();

    renderForm(defaultProps);

    await user.type(elements.nameField(), "000000");
    await waitFor(() =>
      expect(screen.getByText("Please enter valid name")).toBeInTheDocument()
    );
  });
});
