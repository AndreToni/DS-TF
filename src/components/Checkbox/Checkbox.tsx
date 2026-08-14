import { forwardRef } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "../../lib/cn";
import "./Checkbox.css";

export interface CheckboxProps
  extends Omit<RadixCheckbox.CheckboxProps, "asChild"> {
  className?: string;
}

/**
 * DS-TF Checkbox — built on `@radix-ui/react-checkbox`. Supports the
 * native `checked` / `"indeterminate"` / `disabled` states and is fully
 * keyboard operable out of the box.
 *
 * @example
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 * <Checkbox checked="indeterminate" />
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    const isIndeterminate = checked === "indeterminate";
    return (
      <RadixCheckbox.Root
        ref={ref}
        checked={checked}
        className={cn(
          "ds-tf-checkbox inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-[1.5px] border-line-dark bg-white",
          className
        )}
        {...props}
      >
        <RadixCheckbox.Indicator className="flex items-center justify-center text-white">
          {isIndeterminate ? <DashIcon /> : <CheckIcon />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[13px] w-[13px]">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[13px] w-[13px]">
      <path d="M5 12h14" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}
