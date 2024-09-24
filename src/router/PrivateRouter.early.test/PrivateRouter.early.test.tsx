
// Unit tests for: PrivateRouter


import { render } from '@testing-library/react';
import { Navigate } from "react-router-dom";
import { PrivateRouter } from '../PrivateRouter';



// Mocking Navigate component from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: jest.fn(() => null),
}));

describe('PrivateRouter() PrivateRouter method', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('Happy Path', () => {
    it('should render children when user is authenticated', () => {
      // Arrange: Set up the localStorage to simulate an authenticated user
      localStorage.setItem('token', 'valid-token');

      // Act: Render the PrivateRouter with a mock child component
      const { getByText } = render(
        <PrivateRouter>
          <div>Protected Content</div>
        </PrivateRouter>
      );

      // Assert: Check if the child component is rendered
      expect(getByText('Protected Content')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should navigate to "/" when user is not authenticated', () => {
      // Arrange: Ensure localStorage is empty to simulate an unauthenticated user

      // Act: Render the PrivateRouter
      render(
        <PrivateRouter>
          <div>Protected Content</div>
        </PrivateRouter>
      );

      // Assert: Check if Navigate is called with the correct path
      expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {});
    });

    it('should handle missing token gracefully', () => {
      // Arrange: Simulate a missing token by not setting anything in localStorage

      // Act: Render the PrivateRouter
      render(
        <PrivateRouter>
          <div>Protected Content</div>
        </PrivateRouter>
      );

      // Assert: Check if Navigate is called with the correct path
      expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {});
    });

    it('should handle null token gracefully', () => {
      // Arrange: Set the token to null in localStorage
      localStorage.setItem('token', 'null');

      // Act: Render the PrivateRouter
      render(
        <PrivateRouter>
          <div>Protected Content</div>
        </PrivateRouter>
      );

      // Assert: Check if Navigate is called with the correct path
      expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {});
    });
  });
});

// End of unit tests for: PrivateRouter
