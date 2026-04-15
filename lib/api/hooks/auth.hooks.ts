"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "../client";
import type { CreateUserRequest, LoginRequest } from "../types";

type LoginOptions = {
  staySignedIn?: boolean;
  rememberDays?: number;
};

export function useLoginMutation() {
  return useMutation({
    mutationFn: ({
      payload,
      options,
    }: {
      payload: LoginRequest;
      options?: LoginOptions;
    }) => authApi.login(payload, options),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: CreateUserRequest) => authApi.register(payload),
  });
}
