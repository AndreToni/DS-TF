import { createContext, forwardRef, useContext, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import "./Breadcrumbs.css";

type Appearance = "text" | "contained";
type Size = "sm" | "md";

const BreadcrumbsContext = createContext<{ appearance: Appearance; size: Size }>({
  appearance: "text",
  size: "md",
});

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** `"text"` (default): plain links separated by a chevron. `"contained"`: each item is a pill. */
  appearance?: Appearance;
  size?: Size;
}

/**
 * DS-TF Breadcrumbs — shows the user's location within a navigation
 * hierarchy. Wrap `BreadcrumbItem`s as children; a chevron separator is
 * inserted automatically between them via CSS.
 *
 * @example
 * <Breadcrumbs>
 *   <BreadcrumbItem href="/" leadIcon={<HomeIcon />}>Home</BreadcrumbItem>
 *   <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
 *   <BreadcrumbItem current>Settings</BreadcrumbItem>
 * </Breadcrumbs>
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ className, appearance = "text", size = "md", children, ...props }, ref) => {
    return (
      <BreadcrumbsContext.Provider value={{ appearance, size }}>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn(
            "ds-tf-breadcrumbs flex flex-wrap items-center gap-1.5 font-sans",
            size === "sm" ? "text-[12.5px]" : "text-sm",
            className
          )}
          {...props}
        >
          <ol className="flex flex-wrap items-center gap-1.5">{children}</ol>
        </nav>
      </BreadcrumbsContext.Provider>
    );
  }
);

Breadcrumbs.displayName = "Breadcrumbs";

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks this as the current page: renders a non-interactive `<span aria-current="page">` instead of a link. */
  current?: boolean;
  leadIcon?: ReactNode;
  children: ReactNode;
}

export const BreadcrumbItem = forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ className, current, leadIcon, children, ...props }, ref) => {
    const { appearance, size } = useContext(BreadcrumbsContext);

    const sharedClasses = cn(
      "inline-flex items-center gap-1.5 font-semibold",
      appearance === "contained" && [
        "rounded-full",
        size === "sm" ? "px-2.5 py-[3px]" : "px-3 py-[5px]",
        current ? "bg-accent-bg text-accent-primary" : "bg-surface-medium text-ink-primary hover:bg-line-light",
      ],
      appearance === "text" &&
        (current ? "text-ink-primary" : "text-ink-secondary hover:text-ink-primary"),
      className
    );

    return (
      <li className="ds-tf-breadcrumb-item inline-flex items-center">
        {current ? (
          <span aria-current="page" className={sharedClasses}>
            {leadIcon}
            {children}
          </span>
        ) : (
          <a ref={ref} className={cn(sharedClasses, "cursor-pointer no-underline")} {...props}>
            {leadIcon}
            {children}
          </a>
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = "BreadcrumbItem";
