import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface NavMenuProps {
  /** Rendered above `children`, outside the scrolling item list — e.g. a
   * logo row, a `SidebarSwitcher`, or a search `TextField`. Not indented
   * like `NavItem`s. */
  header?: ReactNode;
  /** Rendered below `children`, pinned to the bottom via `mt-auto` (fills
   * any remaining height first) — e.g. a "+ New Page" `NavItem`/`Button`
   * and a `SidebarSwitcher` for the account menu. */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * DS-TF NavMenu — a lightweight sidebar/menu container: fixed width,
 * padding, border and background, matching the assembled menu examples
 * (Dashboard/Projects/…, Pill Menu, Secondary Menu) in the design
 * reference. Compose it with `NavGroup` and `NavItem`; `header`/`footer`
 * are free slots for the full "Sidebar Nav" pattern (logo + switcher up
 * top, a pinned account switcher at the bottom).
 *
 * @example
 * <NavMenu
 *   header={<SidebarSwitcher title="Google Team" subtitle="@google" icon={<TeamIcon />} />}
 *   footer={<SidebarSwitcher title="Kianna Press" subtitle="@kianna" avatar={<Avatar size="sm" initials="KP" />} />}
 * >
 *   <NavItem icon={<HomeIcon />} label="Dashboard" selected />
 *   <NavItem icon={<FolderIcon />} label="Projects" />
 *   <NavGroup label="Secondary Menu">
 *     <NavItem label="Settings" />
 *   </NavGroup>
 * </NavMenu>
 */
export function NavMenu({ header, footer, children, className }: NavMenuProps) {
  return (
    <nav
      className={cn(
        "ds-tf-nav-menu flex w-60 flex-col gap-0.5 rounded-xl border border-line-light bg-white p-2 font-sans",
        className
      )}
    >
      {header && <div className="ds-tf-nav-menu-header mb-1">{header}</div>}
      {children}
      {footer && <div className="ds-tf-nav-menu-footer mt-auto pt-1">{footer}</div>}
    </nav>
  );
}
