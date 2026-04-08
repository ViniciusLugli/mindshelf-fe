"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import AuthInputField from "./AuthInputField";
import {
  type AuthMode,
  formatAuthError,
  getCopy,
  initialState,
  validateAuthForm,
} from "./auth-form.utils";

type AuthFormProps = {
  mode: AuthMode;
  // When true, removes the card shell and renders only form content.
  embedded?: boolean;
};

const AUTH_FORM_ERROR_ID = "auth-form-error";

export default function AuthForm({ mode, embedded = false }: AuthFormProps) {
  const router = useRouter();
  const copy = getCopy(mode);
  const [state, setState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const validationError = validateAuthForm(mode, state);

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const email = state.email.trim();
    const password = state.password;

    setIsSubmitting(true);

    try {
      if (copy.isRegister) {
        await authApi.register({
          name: state.name.trim(),
          email,
          password,
        });
      } else {
        await authApi.login(
          { email, password },
          { staySignedIn: state.staySignedIn, rememberDays: 30 },
        );
      }

      router.push("/home");
      router.refresh();
    } catch (error) {
      setErrorMessage(formatAuthError(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  const content = (
    <div className="space-y-7">
      <div className="space-y-1.5">
        {!embedded && (
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-base-content/40">
            MindShelf
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-base-content">
          {copy.heading}
        </h1>
        <p className="text-sm text-base-content/55">{copy.subtitle}</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {copy.isRegister && (
          <AuthInputField
            id="name"
            label="Name"
            type="text"
            value={state.name}
            autoComplete="name"
            disabled={isSubmitting}
            required
            hasError={Boolean(errorMessage)}
            errorMessageId={AUTH_FORM_ERROR_ID}
            onChange={(event) =>
              setState((previous) => ({
                ...previous,
                name: event.target.value,
              }))
            }
          />
        )}

        <AuthInputField
          id="email"
          label="Email"
          type="email"
          value={state.email}
          autoComplete="email"
          disabled={isSubmitting}
          required
          hasError={Boolean(errorMessage)}
          errorMessageId={AUTH_FORM_ERROR_ID}
          onChange={(event) =>
            setState((previous) => ({ ...previous, email: event.target.value }))
          }
        />

        <AuthInputField
          id="password"
          label="Password"
          type="password"
          value={state.password}
          autoComplete={copy.isRegister ? "new-password" : "current-password"}
          disabled={isSubmitting}
          required
          hasError={Boolean(errorMessage)}
          errorMessageId={AUTH_FORM_ERROR_ID}
          onChange={(event) =>
            setState((previous) => ({
              ...previous,
              password: event.target.value,
            }))
          }
        />

        {copy.isRegister && (
          <AuthInputField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            value={state.confirmPassword}
            autoComplete="new-password"
            disabled={isSubmitting}
            required
            hasError={Boolean(errorMessage)}
            errorMessageId={AUTH_FORM_ERROR_ID}
            onChange={(event) =>
              setState((previous) => ({
                ...previous,
                confirmPassword: event.target.value,
              }))
            }
          />
        )}

        {!copy.isRegister && (
          <label className="mt-5 label cursor-pointer items-center gap-3 p-0">
            <div className="space-y-0.5">
              <span className="label-text text-[13px] font-semibold text-base-content/80">
                Stay signed in
              </span>
              <p className="text-[12px] leading-relaxed text-base-content/55">
                Keep your session active on this device.
              </p>
            </div>

            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={state.staySignedIn}
              disabled={isSubmitting}
              onChange={(event) =>
                setState((previous) => ({
                  ...previous,
                  staySignedIn: event.target.checked,
                }))
              }
            />
          </label>
        )}

        {errorMessage && (
          <div
            id={AUTH_FORM_ERROR_ID}
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-error/20 bg-error/8 mt-5 px-4 py-2.5 text-[13px] text-error"
          >
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-5 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              Please wait...
            </>
          ) : (
            copy.submitLabel
          )}
        </button>
      </form>

      <p className="text-center text-[13px] text-base-content/50">
        {copy.switchText}{" "}
        <Link
          href={copy.switchHref}
          className="font-semibold text-primary hover:underline"
        >
          {copy.switchLinkLabel}
        </Link>
      </p>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-base-300/60 bg-base-100 p-8 shadow-xl">
      {content}
    </div>
  );
}
