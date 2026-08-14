import { forwardRef, useState, type ReactNode } from "react";
import { TextField, type TextFieldProps } from "../TextField/TextField";

export interface PasswordFieldProps
  extends Omit<TextFieldProps, "type" | "leading" | "trailing" | "labelAction"> {
  /** Rendered top-right of the label row — typically a "Forgot Password?" link. */
  forgotPasswordAction?: ReactNode;
}

/**
 * DS-TF PasswordField — a `TextField` preconfigured with a lock icon,
 * a show/hide toggle, and a slot for a "Forgot Password?" link.
 *
 * @example
 * <PasswordField
 *   label="Password"
 *   forgotPasswordAction={<a href="/reset">Forgot Password?</a>}
 *   helperText="At least 8 characters"
 * />
 */
export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ forgotPasswordAction, disabled, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <TextField
        ref={ref}
        type={visible ? "text" : "password"}
        disabled={disabled}
        labelAction={forgotPasswordAction}
        leading={<LockIcon />}
        trailing={
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            className="ds-tf-textfield-icon-btn flex items-center justify-center"
          >
            <EyeIcon open={visible} />
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M3 3l18 18M10.6 10.6a2.5 2.5 0 003.5 3.5M6.5 6.7C4.3 8.1 2.7 10 1.5 12c1.5 2.7 5 7 10.5 7 1.9 0 3.5-.5 4.9-1.3M9.9 4.2A9.8 9.8 0 0112 4c5.5 0 9 4.3 10.5 7-.6 1.1-1.5 2.4-2.7 3.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
