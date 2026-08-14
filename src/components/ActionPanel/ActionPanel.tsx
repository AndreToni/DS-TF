import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import "./ActionPanel.css";

export interface ActionPanelProps {
  /** Leading icon or logo, shown before the title. Pass a plain icon for an
   * inline look (see "Subscribe to Newsletter"), or wrap it in
   * `<span className="ds-tf-action-panel-icon-chip">` for the rounded
   * chip treatment (see "Action Panel" / "Figma"). Omit entirely for a
   * title-only header (see "Upgrade to Premium Today!"). */
  icon?: ReactNode;
  title: ReactNode;
  /** Right side of the header — a `Switch`, a close button, a `Button`, or
   * any combination via a Fragment. Fully free, same idea as Dialog's
   * `headerActions`. */
  headerAction?: ReactNode;
  description?: ReactNode;
  /** Footer content — two buttons, a link, an inline form (`TextField` +
   * `Button`), or any composition. Omit for a header-only panel. */
  children?: ReactNode;
  /** `"solid"` (white, bordered — default) | `"subtle"` (shaded background, no border). */
  surface?: "solid" | "subtle";
  className?: string;
}

/**
 * DS-TF ActionPanel — a static (non-modal) card for a titled message
 * plus a flexible action area. Unlike `Dialog`/`SlideOver`, it renders
 * inline wherever you place it — no overlay, no portal.
 *
 * @example
 * <ActionPanel
 *   icon={<span className="ds-tf-action-panel-icon-chip"><InfoIcon /></span>}
 *   title="Action Panel"
 *   headerAction={<Switch defaultChecked />}
 *   description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
 * >
 *   <Button>Button</Button>
 *   <Button variant="secondary">Button</Button>
 * </ActionPanel>
 *
 * @example
 * // Newsletter-style inline form footer
 * <ActionPanel icon={<MailIcon className="h-4 w-4" />} title="Subscribe to Newsletter" description="...">
 *   <TextField placeholder="Email Address" className="flex-1" />
 *   <Button>Button</Button>
 * </ActionPanel>
 */
export const ActionPanel = forwardRef<HTMLDivElement, ActionPanelProps>(
  ({ icon, title, headerAction, description, children, surface = "solid", className }, ref) => {
    return (
      <div
        ref={ref}
        data-surface={surface}
        className={cn("ds-tf-action-panel rounded-xl p-5 font-sans", className)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {icon}
            <h3 className="text-[15px] font-semibold leading-tight text-ink-primary">{title}</h3>
          </div>
          {headerAction && <div className="flex shrink-0 items-center gap-1">{headerAction}</div>}
        </div>
        {description && (
          <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">{description}</p>
        )}
        {children && <div className="mt-4 flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    );
  }
);

ActionPanel.displayName = "ActionPanel";
