import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import Login from "../../screens/login/Login.screen";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

afterEach(cleanup);

describe("<Login />", () => {
  it("renders correctly", () => {
    const onEventMock = jest.fn();

    render(<Login isLoading={false} route={{}} signInUser={onEventMock} />);
  });

  it("shows warning if email and password is not valid", async () => {
    const onEventMock = jest.fn();

    const { getByText } = render(
      <Login
        isLoading={false}
        route={{ params: { wrongData: true } }}
        signInUser={onEventMock}
      />
    );

    const text = getByText("Wrong data or account doesn't exist");

    expect(text).toBeTruthy();
  });

  it("should invoke the handlePress callback", async () => {
    const onEventMock = jest.fn();

    const { getByText } = render(
      <Login
        isLoading={false}
        route={{ params: { wrongData: false } }}
        signInUser={onEventMock}
      />
    );

    const buttonSubmit = getByText("Submit");

    await waitFor(() => fireEvent.press(buttonSubmit));

    expect(onEventMock).toHaveBeenCalledTimes(1);
  });
});
