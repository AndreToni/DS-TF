import { forwardRef, useState, type ReactNode } from "react";
import { SlideOver, SlideOverTrigger, SlideOverContent } from "../SlideOver/SlideOver";
import { cn } from "../../lib/cn";

export interface HeaderProps {
  /** Logo/wordmark, left-aligned. */
  logo: ReactNode;
  /** Nav links — e.g. a row of `HeaderNavLink`s (optionally paired with a
   * `FlyoutMenu` for dropdown items). Hidden below the `md` breakpoint in
   * favor of the mobile drawer. */
  nav?: ReactNode;
  /** Right-aligned content — auth buttons, search, user menu. Hidden below
   * the `md` breakpoint in favor of the mobile drawer. */
  actions?: ReactNode;
  /** Content rendered inside the mobile drawer when the hamburger is
   * tapped. Defaults to `nav` then `actions` stacked if omitted. */
  mobileMenu?: ReactNode;
  /** Kept visible next to the hamburger on mobile even though `actions` is
   * hidden there — e.g. a single "Get Started" CTA. */
  stickyAction?: ReactNode;
  bordered?: boolean;
  className?: string;
}

/**
 * DS-TF Header — a responsive top navbar: `logo` + `nav` + `actions` slots
 * on desktop, collapsing below the `md` (768px) breakpoint into a hamburger
 * button that opens a real `SlideOver` drawer (reusing the existing
 * component instead of a second, parallel drawer implementation).
 *
 * Pair `nav` items with a `FlyoutMenu` to reproduce the "Fly-Out Navigation"
 * dropdown/mega-menu from the design reference.
 *
 * **Scope note:** the search bar, user-avatar dropdown, and the various
 * mobile "signed-in" account menus shown in the design reference are not
 * separate DS-TF components — compose them from `TextField`, `Avatar`,
 * `FlyoutMenu`/`FlyoutMenuItem`, and `Button` inside `actions`/`mobileMenu`,
 * per the Content Slots philosophy.
 *
 * @example
 * <Header
 *   logo={<Logo />}
 *   nav={<>
 *     <FlyoutMenu>
 *       <FlyoutMenuTrigger asChild><HeaderNavLink hasFlyout>Products</HeaderNavLink></FlyoutMenuTrigger>
 *       <FlyoutMenuContent size="lg">...</FlyoutMenuContent>
 *     </FlyoutMenu>
 *     <HeaderNavLink href="#">Pricing</HeaderNavLink>
 *   </>}
 *   actions={<><Button variant="secondary">Log In</Button><Button>Sign Up</Button></>}
 * />
 */
export function Header({ logo, nav, actions, mobileMenu, stickyAction, bordered = true, className }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const hasMobileContent = !!(nav || actions || mobileMenu);

  return (
    <header
      className={cn(
        "ds-tf-header flex items-center justify-between gap-4 bg-white px-5 py-3 font-sans",
        bordered && "border-b border-line-light",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-8">
        <div className="flex shrink-0 items-center">{logo}</div>
        {nav && <nav className="hidden items-center gap-6 md:flex">{nav}</nav>}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {actions && <div className="hidden items-center gap-3 md:flex">{actions}</div>}
        {stickyAction && <div className="flex items-center md:hidden">{stickyAction}</div>}

        {hasMobileContent && (
          <SlideOver open={open} onOpenChange={setOpen}>
            <SlideOverTrigger asChild>
              <button
                type="button"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                className="flex h-9 w-9 items-center justify-center rounded-md text-ink-primary outline-none hover:bg-surface-medium focus-visible:ring-2 focus-visible:ring-accent-bg md:hidden"
              >
                <MenuIcon open={open} />
              </button>
            </SlideOverTrigger>
            <SlideOverContent size="sm" title="Menu">
              <div className="flex flex-col gap-1">
                {mobileMenu ?? (
                  <>
                    {nav}
                    {actions}
                  </>
                )}
              </div>
            </SlideOverContent>
          </SlideOver>
        )}
      </div>
    </header>
  );
}

export interface HeaderNavLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Shows a trailing chevron — pair with a `FlyoutMenu` for a dropdown item. */
  hasFlyout?: boolean;
  /** Rotates the chevron to point up (use while its paired `FlyoutMenu` is open). */
  flyoutOpen?: boolean;
  active?: boolean;
  className?: string;
}

/**
 * DS-TF HeaderNavLink — a single horizontal top-nav item for `Header`'s
 * `nav` slot: plain link/button, optional "active" underline state, and an
 * optional trailing chevron for items that open a `FlyoutMenu`.
 */
export const HeaderNavLink = forwardRef<HTMLAnchorElement, HeaderNavLinkProps>(
  ({ children, href, onClick, hasFlyout, flyoutOpen, active, className, ...rest }, ref) => {
    const Comp = (href ? "a" : "button") as "a";
    return (
      <Comp
        ref={ref}
        href={href}
        type={href ? undefined : ("button" as const)}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={cn(
          "ds-tf-header-nav-link inline-flex items-center gap-1 bg-transparent text-sm font-semibold no-underline outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-bg rounded-md",
          active ? "text-ink-primary" : "text-ink-secondary hover:text-ink-primary",
          className
        )}
        {...rest}
      >
        {children}
        {hasFlyout && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={cn("h-3.5 w-3.5 shrink-0 transition-transform", flyoutOpen && "rotate-180")}
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Comp>
    );
  }
);

HeaderNavLink.displayName = "HeaderNavLink";

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
