import { forwardRef, useId, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import "./PaymentCardField.css";

export interface PaymentCardValue {
  number: string;
  expiry: string;
  cvc: string;
}

export interface PaymentCardFieldProps {
  label?: ReactNode;
  optional?: boolean;
  helperText?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  value?: PaymentCardValue;
  defaultValue?: PaymentCardValue;
  onChange?: (value: PaymentCardValue) => void;
  className?: string;
}

const EMPTY: PaymentCardValue = { number: "", expiry: "", cvc: "" };

function formatCardNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 19);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/**
 * DS-TF PaymentCardField — a two-row composite input (card number, then
 * expiry + CVC) styled as a single bordered control, matching the "Payment
 * Card" field from the design reference. Formats the card number in groups
 * of 4 and the expiry as `MM/YY` as the user types.
 *
 * Brand detection (Visa/Mastercard badge) is a simplified first-digit
 * heuristic for visual purposes only — not real BIN-range validation.
 *
 * @example
 * const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });
 * <PaymentCardField value={card} onChange={setCard} helperText="Helper text" />
 */
export const PaymentCardField = forwardRef<HTMLInputElement, PaymentCardFieldProps>(
  ({ label = "Payment Card", optional, helperText, error, disabled, value, defaultValue, onChange, className }, ref) => {
    const [internal, setInternal] = useState<PaymentCardValue>(defaultValue ?? EMPTY);
    const current = value ?? internal;
    const generatedId = useId();

    const update = (patch: Partial<PaymentCardValue>) => {
      const next = { ...current, ...patch };
      if (!value) setInternal(next);
      onChange?.(next);
    };

    const digitsOnly = current.number.replace(/\s/g, "");
    const brand = digitsOnly.startsWith("4") ? "visa" : digitsOnly.length > 0 ? "mastercard" : null;

    return (
      <div className={cn("ds-tf-paymentcard flex w-full flex-col gap-1.5 font-sans", className)}>
        {(label || optional) && (
          <div className="flex items-center justify-between gap-2 text-[12.5px] font-semibold text-ink-primary">
            {label && <label htmlFor={generatedId}>{label}</label>}
            {optional && <span className="font-normal text-ink-secondary">Optional</span>}
          </div>
        )}
        <div
          data-error={error ? "true" : undefined}
          data-disabled={disabled ? "true" : undefined}
          className={cn(
            "ds-tf-paymentcard-control flex flex-col overflow-hidden rounded-lg border-[1.5px] border-line-dark bg-white",
            disabled && "opacity-50"
          )}
        >
          <div className="flex h-10 items-center gap-2 px-3">
            <input
              ref={ref}
              id={generatedId}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="Card Number"
              disabled={disabled}
              value={current.number}
              onChange={(e) => update({ number: formatCardNumber(e.target.value) })}
              className="ds-tf-paymentcard-input min-w-0 flex-1 bg-transparent text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed"
            />
            {brand === "visa" && (
              <span className="ds-tf-paymentcard-brand" style={{ background: "#1A1F71" }}>
                VISA
              </span>
            )}
            {brand === "mastercard" && (
              <span className="ds-tf-paymentcard-brand" style={{ background: "#EB5A2A" }}>
                ●●
              </span>
            )}
          </div>
          <div className="flex h-10 items-center gap-2 border-t border-line-light px-3">
            <input
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              disabled={disabled}
              value={current.expiry}
              onChange={(e) => update({ expiry: formatExpiry(e.target.value) })}
              className="ds-tf-paymentcard-input w-16 min-w-0 shrink-0 bg-transparent text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed"
            />
            <input
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="CCV"
              maxLength={4}
              disabled={disabled}
              value={current.cvc}
              onChange={(e) => update({ cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
              className="ds-tf-paymentcard-input min-w-0 flex-1 bg-transparent text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed"
            />
            <CardBackIcon />
          </div>
        </div>
        {helperText && (
          <p className={cn("text-[11.5px] text-ink-secondary", error && "text-error-primary")}>{helperText}</p>
        )}
      </div>
    );
  }
);

PaymentCardField.displayName = "PaymentCardField";

function CardBackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-ink-secondary">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
