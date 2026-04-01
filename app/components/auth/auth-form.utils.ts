export type AuthMode = "login" | "register";

export type AuthFormState = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  staySignedIn: boolean;
};

export const initialState: AuthFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  staySignedIn: false,
};

export function getCopy(mode: AuthMode) {
  const isRegister = mode === "register";

  return {
    isRegister,
    submitLabel: isRegister ? "Create account" : "Sign in",
    heading: isRegister ? "Create your account" : "Welcome back",
    subtitle: isRegister
      ? "Start organizing your ideas with your team."
      : "Sign in to continue using MindShelf.",
    switchText: isRegister
      ? "Already have an account?"
      : "Do not have an account?",
    switchLinkLabel: isRegister ? "Sign in" : "Create one",
    switchHref: isRegister ? "/login" : "/register",
  };
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function validateAuthForm(
  mode: AuthMode,
  state: AuthFormState,
): string | null {
  const email = state.email.trim();
  const password = state.password;

  if (!email || !password) {
    return "Email and password are required.";
  }

  if (!emailRegex.test(email)) {
    return "Enter a valid email address.";
  }

  if (mode === "register") {
    const name = state.name.trim();

    if (!name) {
      return "Name is required.";
    }

    if (!strongPasswordRegex.test(password)) {
      return "Password must have at least 8 characters, 1 uppercase letter, 1 number, and 1 special character.";
    }

    if (password !== state.confirmPassword) {
      return "Password and confirmation must match.";
    }
  }

  return null;
}

export function formatAuthError(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Could not authenticate. Please try again.";
}
