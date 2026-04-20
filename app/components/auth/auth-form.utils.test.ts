import { describe, expect, it } from "vitest";
import {
  formatAuthError,
  getCopy,
  initialState,
  validateAuthForm,
} from "./auth-form.utils";

describe("getCopy", () => {
  it("returns login copy", () => {
    expect(getCopy("login")).toMatchObject({
      isRegister: false,
      submitLabel: "Sign in",
      heading: "Welcome back",
      switchHref: "/register",
    });
  });

  it("returns register copy", () => {
    expect(getCopy("register")).toMatchObject({
      isRegister: true,
      submitLabel: "Create account",
      heading: "Create your account",
      switchHref: "/login",
    });
  });
});

describe("validateAuthForm", () => {
  it("validates required login fields", () => {
    expect(validateAuthForm("login", initialState)).toBe("Email and password are required.");
  });

  it("validates email format", () => {
    expect(
      validateAuthForm("login", {
        ...initialState,
        email: "invalid-email",
        password: "simple-password",
      }),
    ).toBe("Enter a valid email address.");
  });

  it("requires name, strong password and matching confirmation on register", () => {
    expect(
      validateAuthForm("register", {
        ...initialState,
        email: "user@example.com",
        password: "Strong123!",
        confirmPassword: "Strong123!",
      }),
    ).toBe("Name is required.");

    expect(
      validateAuthForm("register", {
        ...initialState,
        name: "Mind Shelf",
        email: "user@example.com",
        password: "weakpass",
        confirmPassword: "weakpass",
      }),
    ).toBe(
      "Password must have at least 8 characters, 1 uppercase letter, 1 number, and 1 special character.",
    );

    expect(
      validateAuthForm("register", {
        ...initialState,
        name: "Mind Shelf",
        email: "user@example.com",
        password: "Strong123!",
        confirmPassword: "Strong123?",
      }),
    ).toBe("Password and confirmation must match.");
  });

  it("accepts valid login and register states", () => {
    expect(
      validateAuthForm("login", {
        ...initialState,
        email: "user@example.com",
        password: "simple-password",
      }),
    ).toBeNull();

    expect(
      validateAuthForm("register", {
        ...initialState,
        name: "Mind Shelf",
        email: "user@example.com",
        password: "Strong123!",
        confirmPassword: "Strong123!",
      }),
    ).toBeNull();
  });
});

describe("formatAuthError", () => {
  it("extracts readable API messages from JSON payloads", () => {
    expect(
      formatAuthError(
        new Error('API 400: {"email":["ignored"],"detail":"This email is already in use."}'),
      ),
    ).toBe("This email is already in use.");
  });

  it("returns API payload text when it is not JSON", () => {
    expect(formatAuthError(new Error("API 401: Invalid credentials"))).toBe(
      "Invalid credentials",
    );
  });

  it("maps network errors and generic failures to user-friendly messages", () => {
    expect(formatAuthError(new Error("Network Error"))).toBe(
      "Could not connect to the server. Check your connection and try again.",
    );
    expect(formatAuthError(new Error("   "))).toBe(
      "Could not authenticate. Please try again.",
    );
    expect(formatAuthError("unknown failure")).toBe(
      "Could not authenticate. Please try again.",
    );
  });
});
