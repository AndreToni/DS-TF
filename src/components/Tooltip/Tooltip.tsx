import { type ReactNode } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../../lib/cn";
import "./Tooltip.css";

export interface TooltipProps {
  /** The element that triggers the tooltip on hover/focus — e.g. a
   * `<button>` or an info icon (matches the "Tooltip Icon" pattern). */
  children: ReactNode;
  /** Simple text/content tooltip. Ignored if `title` is set. */
  content?: ReactNode;
  /** Setting this switches to the "Rich Tooltip" layout (wider box, optional description + action). */
  title?: ReactNode;
  description?: ReactNode;
  /** e.g. a `<Button size="sm">` — rendered below the description in the Rich Tooltip layout. */
  action?: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  /** `"dark"` (default) | `"light"`. */
  appearance?: "dark" | "light";
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/**
 * DS-TF Tooltip — built on `@radix-ui/react-tooltip`. Pass `content` for
 * the simple text tooltip, or `title` (+ optional `description`/`action`)
 * for the "Rich Tooltip" layout — both matching the design reference,
 * including the arrow, all 4 sides, and the "Tooltip Icon" pattern (just
 * wrap an icon as `children`).
 *
 * Each instance wraps itself in its own `Tooltip.Provider` for zero-config
 * use. If you show many tooltips and want Radix's "skip delay" grouping
 * between them, wrap your app in one `<TooltipProvider>` instead — an outer
 * provider takes precedence over each instance's own.
 *
 * @example
 * <Tooltip content="Tooltip"><button>Hover me</button></Tooltip>
 *
 * <Tooltip
 *   title="Tooltip with a description"
 *   description="This is a tooltip with a description paragraph."
 *   action={<Button size="sm">Button</Button>}
 *   appearance="light"
 * >
 *   <InfoIcon />
 * </Tooltip>
 */
export function Tooltip({
  children,
  content,
  title,
  description,
  action,
  side = "top",
  align = "center",
  appearance = "dark",
  delayDuration = 200,
  open,
  defaultOpen,
  onOpenChange,
  className,
}: TooltipProps) {
  const isRich = !!title;

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={8}
            data-appearance={appearance}
            className={cn(
              "ds-tf-tooltip-content font-sans",
              isRich ? "w-64 rounded-xl p-4" : "rounded-lg px-3 py-1.5 text-xs font-medium",
              className
            )}
          >
            {isRich ? (
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">{title}</p>
                {description && (
                  <p className="ds-tf-tooltip-desc text-[13px] leading-snug">{description}</p>
                )}
                {action && <div className="mt-1">{action}</div>}
              </div>
            ) : (
              content
            )}
            <RadixTooltip.Arrow className="ds-tf-tooltip-arrow" width={10} height={5} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

/** Re-exported for apps that want one shared provider (delay grouping) around several `Tooltip`s. */
export const TooltipProvider = RadixTooltip.Provider;
