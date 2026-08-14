import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface NavGroupProps {
  /** Small uppercase section header (e.g. "SECONDARY MENU", "GROUP HEADLINE"). */
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * DS-TF NavGroup — an optional section header above a cluster of
 * `NavItem`s, matching the "SECONDARY MENU" / "GROUP HEADLINE" pattern from
 * the design reference.
 *
 * Scope note: the design reference also shows a "Group Headline" atom with
 * its own hover/selected states, suggesting a clickable group switcher —
 * this component only covers the static section-header usage seen in the
 * assembled menu examples. Build a tab-like switcher separately (e.g. with
 * `Tabs`) if you need that interaction.
 *
 * @example
 * <NavGroup label="Secondary Menu">
 *   <NavItem label="Settings" />
 *   <NavItem label="Billing" />
 * </NavGroup>
 */
export function NavGroup({ label, children, className }: NavGroupProps) {
  return (
    <div className={cn("ds-tf-nav-group flex flex-col gap-0.5", className)}>
      {label && (
        <div className="px-3 pb-1 pt-3 text-[10.5px] font-bold uppercase tracking-wide text-ink-secondary">
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
