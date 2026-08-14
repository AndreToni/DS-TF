import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import "./TextArea.css";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  /** Shows a muted "Optional" badge on the right of the label row. Ignored if `labelAction` is set. */
  optional?: boolean;
  /** Custom content on the right of the label row — overrides `optional`. */
  labelAction?: ReactNode;
  helperText?: ReactNode;
  /** Marks the field invalid — red border + red helper text. */
  error?: boolean;
  /** `"vertical"` (default — matches the Figma "Resize" atom, drag handle
   * bottom-right) | `"none"` | `"both"`. */
  resize?: "none" | "vertical" | "both";
  className?: string;
  /** Applied to the `<textarea>` element itself. */
  textareaClassName?: string;
}

/**
 * DS-TF TextArea — a native `<textarea>` wrapped with label and helper
 * text, matching the "Text Area" atom from the design reference. Resizable
 * vertically by default (native browser resize handle).
 *
 * @example
 * <TextArea label="Label" optional placeholder="Text Input" helperText="Helper text" />
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      optional,
      labelAction,
      helperText,
      error,
      resize = "vertical",
      disabled,
      className,
      textareaClassName,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
      <div className={cn("ds-tf-textarea flex w-full flex-col gap-1.5 font-sans", className)}>
        {(label || labelAction || optional) && (
          <div className="flex items-center justify-between gap-2 text-[12.5px] font-semibold text-ink-primary">
            {label ? <label htmlFor={textareaId}>{label}</label> : <span />}
            {labelAction ?? (optional && <span className="font-normal text-ink-secondary">Optional</span>)}
          </div>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          data-error={error ? "true" : undefined}
          data-disabled={disabled ? "true" : undefined}
          style={{ resize }}
          className={cn(
            "ds-tf-textarea-control w-full min-w-0 rounded-lg border-[1.5px] border-line-dark bg-white px-3 py-2.5 text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed",
            disabled && "opacity-50",
            textareaClassName
          )}
          {...props}
        />
        {helperText && (
          <p className={cn("text-[11.5px] text-ink-secondary", error && "text-error-primary")}>{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
