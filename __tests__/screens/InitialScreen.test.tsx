import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import InitialScreen from "../../screens/initialScreen/InitialScreen.screen";

const mockedNavigate = jest.fn();
const onPress = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

afterEach(cleanup);

describe("<InitialScreen />", () => {
  it("renders correctly", () => {
    render(<InitialScreen />);
  });

  it("check log in button", () => {
    const { getByText } = render(<InitialScreen loginPress={onPress} />);

    const loginButton = getByText("log in");

    expect(loginButton).toBeTruthy();

    fireEvent.press(loginButton);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("check register button", () => {
    const { getByText } = render(<InitialScreen loginPress={onPress} />);

    const registerButton = getByText("register");

    expect(registerButton).toBeTruthy();

    fireEvent.press(registerButton);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
