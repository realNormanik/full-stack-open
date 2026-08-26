import { render, fireEvent, waitFor } from "@testing-library/react-native";

import SignIn from "../src/components/SignIn";

describe("SignIn", () => {
  describe("SignIn", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmitMock = jest.fn();

      const { getByPlaceholderText, getByTestId } = render(
        <SignIn onSubmit={onSubmitMock} />
      );

      fireEvent.changeText(getByPlaceholderText("Username"), "testuser");
      fireEvent.changeText(getByPlaceholderText("Password"), "testpass");

      fireEvent.press(getByTestId("submitButton"));

      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith(
          expect.objectContaining({
            username: "testuser",
            password: "testpass",
          })
        );
      });
    });
  });
});