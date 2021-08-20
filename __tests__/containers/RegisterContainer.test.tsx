import {
  mapStateProps,
  mapDispatchProps,
} from "../../screens/register/Register.container";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe("<Register.Container>", () => {
  it("should show previously value", () => {
    const initialState = {
      userState: {
        userId: "",
        userEmail: "",
        userRole: "",
      },
      loaderState: { isLoading: false },
    };

    expect(mapStateProps(initialState).isLoading).toEqual(false);
  });

  it("should upload user state when button is clicked", () => {
    const dispatch = jest.fn();

    mapDispatchProps(dispatch).registerUser(
      {
        email: "qwe@o2.pl",
        password: "qweqwe",
        nickname: "qwe",
        confirmPassword: "qweqwe9",
      },
      mockedNavigate
    );
    expect(dispatch.mock.calls[0][0]).not.toBeNull();
  });
});
