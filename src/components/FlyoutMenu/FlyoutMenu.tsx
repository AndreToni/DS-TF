import { forwardRef, type ReactNode } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { Badge } from "../Badge/Badge";
import { cn } from "../../lib/cn";

export const FlyoutMenu = RadixPopover.Root;
export const FlyoutMenuTrigger = RadixPopover.Trigger;
export const FlyoutMenuClose = RadixPopover.Close;

export interface FlyoutMenuContentProps {
  /** Main content — free slot. Compose it from `FlyoutMenuItem`s, a
   * multi-column `<div className="grid ...">`, article cards, whatever the
   * mega-menu needs (Content Slots philosophy — no built-in layout
   * variants). */
  children?: ReactNode;
  /** Footer row pinned to the bottom, full-bleed — e.g. the "Enterprise" upsell banner. */
  footer?: ReactNode;
  align?: "start" | "center" | "end";
  /** `"sm"` (280px) | `"md"` (360px, default) | `"lg"` (640px, multi-column mega-menus). */
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * DS-TF FlyoutMenu — a dismissible dropdown panel (click-outside/Escape to
 * close, auto-positioned) built on `@radix-ui/react-popover`. Pair with a
 * `HeaderNavLink` (via `FlyoutMenuTrigger asChild`) to reproduce the
 * "Fly-Out Navigation" mega-menu from the design reference — the menu's
 * *content* (icon+description rows, simple link lists, article cards,
 * icon grids) is left entirely to `children`/`footer` composition.
 *
 * @example
 * <FlyoutMenu>
 *   <FlyoutMenuTrigger asChild><HeaderNavLink hasFlyout>Products</HeaderNavLink></FlyoutMenuTrigger>
 *   <FlyoutMenuContent
 *     size="lg"
 *     footer={<div className="flex items-center justify-between px-4 py-3">
 *       <span><Badge tone="accent" appearance="subtle" size="sm">New</Badge> Enterprise</span>
 *       <a href="#">Learn more →</a>
 *     </div>}
 *   >
 *     <FlyoutMenuItem icon={<Icon />} title="Solutions" description="..." isNew />
 *     <FlyoutMenuItem icon={<Icon />} title="Documentation" description="..." />
 *   </FlyoutMenuContent>
 * </FlyoutMenu>
 */
export const FlyoutMenuContent = forwardRef<HTMLDivElement, FlyoutMenuContentProps>(
  ({ children, footer, align = "start", size = "md", className }, ref) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        align={align}
        sideOffset={10}
        className={cn(
          "ds-tf-flyout-content z-50 overflow-hidden rounded-xl border border-line-light bg-white font-sans shadow-lg",
          size === "sm" && "w-[280px]",
          size === "md" && "w-[360px]",
          size === "lg" && "w-[640px]",
          className
        )}
      >
        {children && <div className="ds-tf-flyout-body p-3">{children}</div>}
        {footer && <div className="ds-tf-flyout-footer border-t border-line-light bg-surface-light">{footer}</div>}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  )
);

FlyoutMenuContent.displayName = "FlyoutMenuContent";

export interface FlyoutMenuItemProps {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Shows a "New" `Badge` next to the title (real `Badge`, not a bespoke tag). */
  isNew?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * DS-TF FlyoutMenuItem — the icon + title (+ optional "New" `Badge`) +
 * description row repeated throughout the mega-menu examples in the design
 * reference (e.g. "Solutions", "Documentation"). Use inside
 * `FlyoutMenuContent`; stack a few for a simple list, or drop them into a
 * `grid grid-cols-2` for the icon-grid layout.
 */
export const FlyoutMenuItem = forwardRef<HTMLAnchorElement, FlyoutMenuItemProps>(
  ({ icon, title, description, isNew, href, onClick, className }, ref) => {
    const Comp = (href ? "a" : "button") as "a";
    return (
      <Comp
        ref={ref}
        href={href}
        type={href ? undefined : ("button" as const)}
        onClick={onClick}
        className={cn(
          "ds-tf-flyout-item flex w-full items-start gap-3 rounded-lg p-2 text-left no-underline outline-none transition-colors hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg",
          className
        )}
      >
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-medium text-ink-secondary [&_svg]:h-4 [&_svg]:w-4">
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-ink-primary">{title}</span>
            {isNew && (
              <Badge tone="accent" appearance="subtle" size="sm" className="h-auto px-1.5 py-px text-[10px] uppercase tracking-wide">
                New
              </Badge>
            )}
          </span>
          {description && <span className="mt-0.5 block text-xs leading-snug text-ink-secondary">{description}</span>}
        </span>
      </Comp>
    );
  }
);

FlyoutMenuItem.displayName = "FlyoutMenuItem";
