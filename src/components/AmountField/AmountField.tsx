import { forwardRef, useImperativeHandle, useRef } from "react";
import { TextField, type TextFieldProps } from "../TextField/TextField";
import "./AmountField.css";

export interface AmountFieldProps extends Omit<TextFieldProps, "leading" | "trailing" | "type"> {
  /** Currency code shown as a static trailing chip (e.g. `"USD"`). Purely
   * decorative composition — for an interactive currency picker, pass your
   * own `trailing` (e.g. a `<Select>`) instead. Ignored when `stepper` is set. */
  currency?: string;
  /** Adds decrement/increment buttons instead of the currency chip. */
  stepper?: boolean;
  /** Amount incremented/decremented per click. Default `1`. */
  step?: number;
  min?: number;
  max?: number;
}

function setNativeValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

/**
 * DS-TF AmountField — a `TextField` preconfigured with a leading `"$"`
 * and either a static currency chip (`currency="USD"`) or a decrement/
 * increment stepper (`stepper`).
 *
 * The stepper works uncontrolled (it nudges the native input value and
 * dispatches a real `input` event so React's `onChange` still fires) or
 * controlled (pass `value`/`onChange` as usual).
 *
 * @example
 * <AmountField label="Enter Amount" currency="USD" placeholder="Enter Amount" />
 * <AmountField label="Enter Amount" stepper defaultValue="150.00" />
 */
export const AmountField = forwardRef<HTMLInputElement, AmountFieldProps>(
  ({ currency, stepper, step = 1, min, max, disabled, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const adjust = (dir: 1 | -1) => {
      const input = innerRef.current;
      if (!input) return;
      if (input.type === "number") {
        dir === 1 ? input.stepUp(step) : input.stepDown(step);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        return;
      }
      const current = parseFloat(input.value.replace(/[^0-9.-]/g, "")) || 0;
      let next = current + dir * step;
      if (min != null) next = Math.max(min, next);
      if (max != null) next = Math.min(max, next);
      setNativeValue(input, String(next));
    };

    return (
      <TextField
        ref={innerRef}
        inputMode="decimal"
        disabled={disabled}
        leading="$"
        trailing={
          stepper ? (
            <span className="ds-tf-amountfield-stepper inline-flex items-center gap-1">
              <button type="button" aria-label="Decrease" disabled={disabled} onClick={() => adjust(-1)}>
                −
              </button>
              <button type="button" aria-label="Increase" disabled={disabled} onClick={() => adjust(1)}>
                +
              </button>
            </span>
          ) : currency ? (
            <span className="ds-tf-amountfield-chip">{currency}</span>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

AmountField.displayName = "AmountField";
