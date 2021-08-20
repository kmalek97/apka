import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import Register from "../../screens/register/Register.screen";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

afterEach(cleanup);

describe("<Register />", () => {
  it("renders correctly", () => {
    const onEventMock = jest.fn();

    render(
      <Register isLoading={false} route={{}} registerUser={onEventMock} />
    );
  });

  it("shows warning if email is already in use", async () => {
    const onEventMock = jest.fn();

    const { getByText } = render(
      <Register
        isLoading={false}
        route={{ params: { wrongData: "email" } }}
        registerUser={onEventMock}
      />
    );

    const text = getByText("That email address is already in use!");

    expect(text).toBeTruthy();
  });

  it("shows warning if there is no connection", async () => {
    const onEventMock = jest.fn();

    const { getByText } = render(
      <Register
        isLoading={false}
        route={{ params: { wrongData: "connection" } }}
        registerUser={onEventMock}
      />
    );

    const text = getByText("Connection Error!");

    expect(text).toBeTruthy();
  });

  it("should invoke the handlePress callback", async () => {
    const onEventMock = jest.fn();

    const { getByText } = render(
      <Register isLoading={false} route={{}} registerUser={onEventMock} />
    );

    const buttonSubmit = getByText("Submit");

    await waitFor(() => fireEvent.press(buttonSubmit));

    expect(onEventMock).toHaveBeenCalledTimes(1);
  });
});
