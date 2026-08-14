import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface NavMenuProps {
  children: ReactNode;
  className?: string;
}

/**
 * DS-TF NavMenu — a lightweight sidebar/menu container: fixed width,
 * padding, border and background, matching the assembled menu examples
 * (Dashboard/Projects/…, Pill Menu, Secondary Menu) in the design
 * reference. Compose it with `NavGroup` and `NavItem`.
 *
 * @example
 * <NavMenu>
 *   <NavItem icon={<HomeIcon />} label="Dashboard" selected />
 *   <NavItem icon={<FolderIcon />} label="Projects" />
 *   <NavGroup label="Secondary Menu">
 *     <NavItem label="Settings" />
 *   </NavGroup>
 * </NavMenu>
 */
export function NavMenu({ children, className }: NavMenuProps) {
  return (
    <nav
      className={cn(
        "ds-tf-nav-menu flex w-60 flex-col gap-0.5 rounded-xl border border-line-light bg-white p-2 font-sans",
        className
      )}
    >
      {children}
    </nav>
  );
}
