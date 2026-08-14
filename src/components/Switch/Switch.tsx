import { forwardRef } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "../../lib/cn";
import "./Switch.css";

export interface SwitchProps extends Omit<RadixSwitch.SwitchProps, "asChild"> {
  className?: string;
}

/**
 * DS-TF Switch — on/off toggle built on `@radix-ui/react-switch`.
 *
 * @example
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadixSwitch.Root
        ref={ref}
        className={cn(
          "ds-tf-switch relative inline-flex h-5 w-[34px] shrink-0 items-center rounded-full",
          className
        )}
        {...props}
      >
        <RadixSwitch.Thumb className="ds-tf-switch-thumb block h-4 w-4 rounded-full bg-white" />
      </RadixSwitch.Root>
    );
  }
);

Switch.displayName = "Switch";
