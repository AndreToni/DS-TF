import { forwardRef } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";
import "./Avatar.css";

export const avatarVariants = cva(
  "ds-tf-avatar relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-medium text-ink-secondary font-sans font-semibold",
  {
    variants: {
      shape: {
        circular: "rounded-full",
        rectangular: "rounded-md",
      },
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-24 w-24 text-3xl",
      },
    },
    defaultVariants: {
      shape: "circular",
      size: "md",
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Image URL. When it fails to load (or is omitted), falls back to initials or the placeholder icon. */
  src?: string;
  alt?: string;
  /** Shown when there's no (working) image. */
  initials?: string;
  /** Small status dot in the bottom-right corner. */
  badge?: "success" | "error" | "none";
  className?: string;
}

/**
 * DS-TF Avatar — represents a user or entity via photo, initials, or a
 * generic placeholder. Built on `@radix-ui/react-avatar`, so image loading
 * and the photo → initials → placeholder fallback chain is handled for you.
 *
 * SSR note: Radix determines image-load status inside an effect, so on a
 * server-rendered pass (before hydration) the Fallback content is briefly
 * absent. This is expected Radix behavior, not a bug — it resolves as soon
 * as the client hydrates. If that flash is a problem for your app, render
 * `initials` (no `src`) for the SSR pass and swap in the photo after mount.
 *
 * @example
 * <Avatar src="/jane.jpg" initials="JD" size="lg" badge="success" />
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt = "", initials, shape, size, badge = "none", className }, ref) => {
    return (
      <RadixAvatar.Root
        ref={ref}
        className={cn(avatarVariants({ shape, size }), className)}
      >
        {src && <RadixAvatar.Image src={src} alt={alt} className="h-full w-full object-cover" />}
        <RadixAvatar.Fallback
          delayMs={src ? 400 : 0}
          className="flex h-full w-full items-center justify-center"
        >
          {initials ? (
            <span className="bg-accent-primary text-white flex h-full w-full items-center justify-center">
              {initials}
            </span>
          ) : (
            <PlaceholderIcon className="h-[56%] w-[56%]" />
          )}
        </RadixAvatar.Fallback>
        {badge !== "none" && (
          <span
            className={cn(
              "ds-tf-avatar__badge",
              badge === "success" ? "bg-success-primary" : "bg-error-primary"
            )}
          />
        )}
      </RadixAvatar.Root>
    );
  }
);

Avatar.displayName = "Avatar";

function PlaceholderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="currentColor" />
    </svg>
  );
}
