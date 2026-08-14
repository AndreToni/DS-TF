import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface MessageProps {
  /** Sender name, shown above the bubble — typically omitted on `align="right"` (your own messages). */
  sender?: ReactNode;
  /** `"left"` (received, neutral bubble) | `"right"` (sent, accent bubble). @default "left" */
  align?: "left" | "right";
  /** Bubble text. Omit to render only `attachment` (e.g. a photo grid with no caption). */
  children?: ReactNode;
  /** Free slot inside the bubble, below the text — e.g. an `ActivityAttachment` file chip. */
  attachment?: ReactNode;
  timestamp?: ReactNode;
  /** Row below the timestamp — compose `Reaction` pills + a `ReactionAddButton`. */
  reactions?: ReactNode;
  className?: string;
}

/**
 * DS-TF Message — a single chat bubble for the "Message" pattern from the
 * design reference: sender name, a left/right-aligned bubble (`children`
 * text + a free `attachment` slot), timestamp, and a `reactions` row.
 *
 * For text-only threads with replies (the "Comment" pattern in the same
 * reference), reuse the existing `ActivityFeed`/`ActivityItem` — it already
 * covers avatar + name + description + a free actions row; no separate
 * comment component was built here to avoid duplicating that.
 *
 * @example
 * <Message sender="Jessica Moon" attachment={<ActivityAttachment name="File Name" size="54 kB" />}>
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * </Message>
 * <Message align="right" timestamp="12:45 am" reactions={<><Reaction avatar={<Avatar size="xs" />} count={3} /><ReactionAddButton /></>}>
 *   Okay. Let me find some gradients.
 * </Message>
 */
export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ sender, align = "left", children, attachment, timestamp, reactions, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ds-tf-message flex max-w-[380px] flex-col gap-1 font-sans",
        align === "right" ? "items-end self-end" : "items-start",
        className
      )}
    >
      {sender && <span className="px-1 text-[13px] font-semibold text-ink-primary">{sender}</span>}
      {(children || attachment) && (
        <div
          className={cn(
            "ds-tf-message-bubble flex flex-col gap-2 rounded-2xl px-4 py-3 text-[13.5px] leading-snug",
            align === "right" ? "bg-accent-primary text-white" : "bg-surface-medium text-ink-primary"
          )}
        >
          {children}
          {attachment}
        </div>
      )}
      {timestamp && <span className="px-1 text-xs text-ink-secondary">{timestamp}</span>}
      {reactions && <div className="flex items-center gap-1.5 px-1">{reactions}</div>}
    </div>
  )
);

Message.displayName = "Message";

export interface MessagePhotoGridProps {
  /** Thumbnail image URLs. */
  images: string[];
  /** Caption above the grid, e.g. "12 Photos". */
  label?: ReactNode;
  size?: ReactNode;
  /** Thumbnails rendered before collapsing the rest into a "+N" overlay on the last visible cell. @default 3 */
  maxVisible?: number;
  className?: string;
}

/**
 * DS-TF MessagePhotoGrid — the neutral bordered card holding a small
 * thumbnail grid (with a "+N" overlay once `images.length > maxVisible`),
 * used as a `Message`'s `attachment` for photo shares. Same bordered-card
 * treatment as `ActivityAttachment`, for a photo instead of a file.
 */
export const MessagePhotoGrid = forwardRef<HTMLDivElement, MessagePhotoGridProps>(
  ({ images, label, size, maxVisible = 3, className }, ref) => {
    const visible = images.slice(0, maxVisible);
    const overflow = images.length - visible.length;

    return (
      <div
        ref={ref}
        className={cn(
          "ds-tf-message-photo-grid w-full max-w-[220px] overflow-hidden rounded-lg border border-line-light bg-white",
          className
        )}
      >
        <div className="grid grid-cols-2 gap-0.5 bg-line-light p-0.5">
          {visible.map((src, i) => {
            const isLast = i === visible.length - 1;
            return (
              <div key={i} className="relative aspect-square overflow-hidden bg-surface-medium">
                <img src={src} alt="" className="h-full w-full object-cover" />
                {isLast && overflow > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                    +{overflow}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {(label || size) && (
          <div className="flex items-center justify-between px-3 py-2">
            {label && <span className="text-[13px] font-semibold text-ink-primary">{label}</span>}
            {size && <span className="text-xs text-ink-secondary">{size}</span>}
          </div>
        )}
      </div>
    );
  }
);

MessagePhotoGrid.displayName = "MessagePhotoGrid";
