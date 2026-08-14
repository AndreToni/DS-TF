import { forwardRef } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "../../lib/cn";
import "./Slider.css";

export interface SliderProps extends Omit<RadixSlider.SliderProps, "asChild"> {
  /** `"md"` (default) | `"sm"` track thickness. */
  size?: "md" | "sm";
  /** Marks the track/thumb in the error color. */
  error?: boolean;
  /** Optional tick labels rendered evenly spaced below the track. Purely
   * presentational — it does not snap thumb values to these positions. */
  ticks?: string[];
  className?: string;
}

/**
 * DS-TF Slider — built on `@radix-ui/react-slider`. Pass a single-entry
 * array to `value`/`defaultValue` for a single handle, or a two-entry array
 * for a range slider — Radix renders one thumb per value automatically.
 *
 * Scope note: a true "Multi Range" mode (3+ independently colored track
 * segments) is not supported here — Radix's `Slider.Range` only fills one
 * continuous color between the lowest and highest thumb. For that pattern,
 * compose multiple absolutely-positioned bars on top of a custom track.
 *
 * @example
 * <Slider defaultValue={[40]} max={100} step={1} />
 * <Slider defaultValue={[20, 80]} max={100} step={1} /> // range
 * <Slider defaultValue={[50]} max={100} ticks={["0", "50", "100"]} />
 */
export const Slider = forwardRef<HTMLSpanElement, SliderProps>(
  ({ className, size = "md", error, ticks, value, defaultValue, disabled, ...props }, ref) => {
    const count = (value ?? defaultValue ?? [0]).length;
    return (
      <div className="ds-tf-slider-wrap w-full">
        <RadixSlider.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          data-error={error ? "true" : undefined}
          className={cn(
            "ds-tf-slider relative flex w-full touch-none select-none items-center",
            size === "sm" ? "h-4" : "h-5",
            disabled && "opacity-40",
            className
          )}
          {...props}
        >
          <RadixSlider.Track
            className={cn(
              "ds-tf-slider-track relative grow rounded-full bg-line-light",
              size === "sm" ? "h-1" : "h-1.5"
            )}
          >
            <RadixSlider.Range className="ds-tf-slider-range absolute h-full rounded-full" />
          </RadixSlider.Track>
          {Array.from({ length: count }).map((_, i) => (
            <RadixSlider.Thumb
              key={i}
              className="ds-tf-slider-thumb block rounded-full bg-white"
            />
          ))}
        </RadixSlider.Root>
        {ticks && ticks.length > 0 && (
          <div className="ds-tf-slider-ticks mt-1.5 flex justify-between">
            {ticks.map((t) => (
              <span key={t} className="text-xs text-ink-secondary">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
