import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import "./TextField.css";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: ReactNode;
  /** Shows a muted "Optional" badge on the right of the label row. Ignored if `labelAction` is set. */
  optional?: boolean;
  /** Custom content on the right of the label row (e.g. a "Forgot Password?" link) — overrides `optional`. */
  labelAction?: ReactNode;
  helperText?: ReactNode;
  /** Marks the field invalid — red border + red helper text. */
  error?: boolean;
  /** Content before the input: icon, text prefix (`"http://"`), or a chip (country code, currency). */
  leading?: ReactNode;
  /** Content after the input: icon, chip, clear button, or a stepper. */
  trailing?: ReactNode;
  className?: string;
  /** Applied to the control wrapper (the bordered box), not the `<input>` itself. */
  controlClassName?: string;
}

/**
 * DS-TF TextField — a native `<input>` wrapped with label, helper text,
 * and `leading`/`trailing` composition slots. Covers "Basic", "with clear
 * icon", "Search", "Web Address", "Phone Number" and "Transfer" from the
 * design reference via composition:
 *
 *   <TextField leading="http://" placeholder="Web Address" />
 *   <TextField leading={<SearchIcon />} placeholder="Search" />
 *   <TextField trailing={<button onClick={clear}><XIcon /></button>} />
 *
 * For Password, Amount (currency/stepper), and Payment Card — which need
 * their own interaction, not just slot composition — use `PasswordField`,
 * `AmountField`, and `PaymentCardField`. They all wrap this component.
 *
 * @example
 * <TextField label="Label" optional placeholder="Placeholder" helperText="Helper text" />
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      optional,
      labelAction,
      helperText,
      error,
      leading,
      trailing,
      disabled,
      className,
      controlClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={cn("ds-tf-textfield flex w-full flex-col gap-1.5 font-sans", className)}>
        {(label || labelAction || optional) && (
          <div className="flex items-center justify-between gap-2 text-[12.5px] font-semibold text-ink-primary">
            {label ? <label htmlFor={inputId}>{label}</label> : <span />}
            {labelAction ?? (optional && <span className="font-normal text-ink-secondary">Optional</span>)}
          </div>
        )}
        <div
          data-error={error ? "true" : undefined}
          data-disabled={disabled ? "true" : undefined}
          className={cn(
            "ds-tf-textfield-control flex h-10 min-w-0 items-center gap-2 rounded-lg border-[1.5px] border-line-dark bg-white px-3",
            disabled && "opacity-50",
            controlClassName
          )}
        >
          {leading && (
            <span className="ds-tf-textfield-leading flex shrink-0 items-center gap-1 text-sm text-ink-secondary">
              {leading}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className="ds-tf-textfield-input min-w-0 flex-1 bg-transparent text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed"
            {...props}
          />
          {trailing && (
            <span className="ds-tf-textfield-trailing flex shrink-0 items-center gap-1 text-sm text-ink-secondary">
              {trailing}
            </span>
          )}
        </div>
        {helperText && (
          <p className={cn("text-[11.5px] text-ink-secondary", error && "text-error-primary")}>{helperText}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
