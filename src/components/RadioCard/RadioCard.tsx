import { forwardRef } from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "../../lib/cn";
import "./RadioCard.css";

export interface RadioCardProps extends Omit<RadixRadioGroup.RadioGroupItemProps, "asChild"> {
  /** `"row"` (default): content on the left, the radio dot trailing, vertically centered — good for Payment/User/Simple cards. `"column"`: radio dot pinned top-right, content flows below — good for pricing/plan cards. */
  direction?: "row" | "column";
  /** `"md"` (default) | `"sm"` padding/radius. */
  size?: "md" | "sm";
  className?: string;
}

/**
 * DS-TF RadioCard — a selectable card alternative to `RadioGroupItem`,
 * for options that need more context (icon, description, price). Use
 * inside a `RadioGroup`. The whole card is the Radix radio control
 * (`role="radio"`), so it's fully keyboard operable.
 *
 * @example
 * <RadioGroup value={plan} onValueChange={setPlan} className="flex flex-col gap-3">
 *   <RadioCard value="pro" direction="column">
 *     <p className="font-semibold text-sm">Pro</p>
 *     <p className="text-sm font-semibold mt-2">R$ 49/mês</p>
 *     <p className="text-xs text-ink-secondary mt-1">Para times em crescimento</p>
 *   </RadioCard>
 * </RadioGroup>
 */
export const RadioCard = forwardRef<HTMLButtonElement, RadioCardProps>(
  ({ className, direction = "row", size = "md", children, ...props }, ref) => {
    return (
      <RadixRadioGroup.Item
        ref={ref}
        className={cn(
          "ds-tf-radio-card relative flex w-full border-[1.5px] border-line-light bg-white text-left font-sans",
          size === "md" ? "rounded-lg p-4" : "rounded-md p-3",
          direction === "row" ? "items-center gap-3" : "flex-col",
          className
        )}
        {...props}
      >
        {direction === "column" && (
          <span className="absolute right-4 top-4">
            <RadioDot />
          </span>
        )}
        <span className={direction === "row" ? "flex flex-1 items-center gap-3" : undefined}>
          {children}
        </span>
        {direction === "row" && <RadioDot />}
      </RadixRadioGroup.Item>
    );
  }
);

RadioCard.displayName = "RadioCard";

function RadioDot() {
  return (
    <span className="ds-tf-radio-card-dot inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line-dark bg-white">
      <RadixRadioGroup.Indicator className="ds-tf-radio-indicator" />
    </span>
  );
}
