import {
  mapStateProps,
  mapDispatchProps,
} from "../../screens/login/Login.container";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe("<Login.Container>", () => {
  it("should show previously value", () => {
    const initialState = {
      userState: {
        userId: "",
        userEmail: "",
        userRole: "",
      },
      loaderState: { isLoading: false },
    };

    expect(mapStateProps(initialState).userState).toEqual({
      userId: "",
      userEmail: "",
      userRole: "",
    });
    expect(mapStateProps(initialState).isLoading).toEqual(false);
  });

  it("should upload user state when button is clicked", () => {
    const dispatch = jest.fn();

    mapDispatchProps(dispatch).signInUser(
      { email: "qwe@o2.pl", password: "qweqwe" },
      mockedNavigate
    );
    expect(dispatch.mock.calls[0][0]).toBeTruthy();
  });
});
