import { forwardRef } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "../../lib/cn";
import "./Toggle.css";

export interface ToggleProps extends Omit<RadixSwitch.SwitchProps, "asChild"> {
  /** Shows "ON"/"OFF" text inside the track (widens it to fit). Ignored at `size="short"`. */
  label?: boolean;
  /** Shows a small × mark inside the thumb. */
  icon?: boolean;
  /** `"default"` (34px track) | `"short"` (28px track, narrower — matches
   * the "Short Toggle" atom; `label` has no effect at this size). */
  size?: "default" | "short";
  className?: string;
}

/**
 * DS-TF Toggle — an on/off switch built on `@radix-ui/react-switch`,
 * matching the "Toggle" / "Short Toggle" atoms from the design reference:
 * optional ON/OFF track text (`label`) and an optional × mark on the thumb
 * (`icon`), combinable, plus a narrower `size="short"` track.
 *
 * @example
 * <Toggle checked={on} onCheckedChange={setOn} />
 * <Toggle checked={on} onCheckedChange={setOn} label icon />
 * <Toggle checked={on} onCheckedChange={setOn} size="short" icon />
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, label, icon, size = "default", ...props }, ref) => {
    const isShort = size === "short";
    const isWide = !isShort && !!label;

    return (
      <RadixSwitch.Root
        ref={ref}
        className={cn(
          "ds-tf-toggle relative inline-flex shrink-0 items-center rounded-full",
          isShort && "ds-tf-toggle--short h-4 w-7",
          !isShort && !isWide && "ds-tf-toggle--default h-5 w-9",
          isWide && "ds-tf-toggle--wide h-6 w-14",
          className
        )}
        {...props}
      >
        {isWide && (
          <>
            <span className="ds-tf-toggle-label ds-tf-toggle-label--on">ON</span>
            <span className="ds-tf-toggle-label ds-tf-toggle-label--off">OFF</span>
          </>
        )}
        <RadixSwitch.Thumb
          className={cn(
            "ds-tf-toggle-thumb relative z-10 flex items-center justify-center rounded-full",
            isShort && "h-3 w-3",
            !isShort && !isWide && "h-4 w-4",
            isWide && "h-[18px] w-[18px]"
          )}
        >
          {icon && <XIcon short={isShort} />}
        </RadixSwitch.Thumb>
      </RadixSwitch.Root>
    );
  }
);

Toggle.displayName = "Toggle";

function XIcon({ short }: { short?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={short ? "h-[7px] w-[7px]" : "h-[9px] w-[9px]"}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
