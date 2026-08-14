import { forwardRef, type ReactNode } from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";
import "./RadioGroup.css";

export interface RadioGroupProps extends RadixRadioGroup.RadioGroupProps {
  className?: string;
}

/**
 * DS-TF RadioGroup — wraps `@radix-ui/react-radio-group`. Renders
 * nothing visually itself; compose it with `RadioGroupItem` (or
 * `RadioCard`, from the RadioCard module) as children.
 *
 * @example
 * <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-3">
 *   <RadioGroupItem value="credit-card" label="Cartão de crédito" />
 *   <RadioGroupItem value="pix" label="Pix" />
 * </RadioGroup>
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, ...props }, ref) => (
    <RadixRadioGroup.Root ref={ref} className={cn(className)} {...props} />
  )
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends Omit<RadixRadioGroup.RadioGroupItemProps, "asChild"> {
  /** Text label rendered next to the control. Omit if you're composing your own layout via `children`. */
  label?: ReactNode;
  className?: string;
}

/**
 * A single radio control, optionally paired with a text `label` (the
 * whole row becomes clickable).
 *
 * @example
 * <RadioGroupItem value="pix" label="Pix" />
 */
export const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, label, id, value, disabled, ...props }, ref) => {
    const autoId = id ?? `radio-${value}`;
    const control = (
      <RadixRadioGroup.Item
        ref={ref}
        id={autoId}
        value={value}
        disabled={disabled}
        className={cn(
          "ds-tf-radio inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-dark bg-white",
          className
        )}
        {...props}
      >
        <RadixRadioGroup.Indicator className="ds-tf-radio-indicator" />
      </RadixRadioGroup.Item>
    );

    if (!label) return control;

    return (
      <label
        htmlFor={autoId}
        className={cn(
          "inline-flex items-center gap-2.5 font-sans text-sm text-ink-primary",
          disabled ? "opacity-40" : "cursor-pointer"
        )}
      >
        {control}
        {label}
      </label>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
