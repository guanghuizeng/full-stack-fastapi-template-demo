import type { ApiError } from "../client"

export const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

interface ErrorResponse {
  body?: {
    detail?: string;
  };
  status?: number;
}

export const handleError = (err: ErrorResponse, showToast: (title: string, description: string, status: "error" | "success") => void) => {
  if (err.body?.detail) {
    showToast("Error", err.body.detail, "error")
  } else {
    showToast("Error", "An unexpected error occurred", "error")
  }
} 