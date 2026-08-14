import { useId, useState, type ReactNode } from "react";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { cn } from "../../lib/cn";
import "./CommentInput.css";

export interface CommentInputProps {
  avatarSrc?: string;
  avatarInitials?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Called with the current text when Send is clicked (or Enter, in `"compact"`). Uncontrolled usage clears the field automatically after sending. */
  onSend?: (value: string) => void;
  placeholder?: string;
  helperText?: ReactNode;
  disabled?: boolean;
  /** `"compact"` (default): single-line pill with an icon-only send button.
   * `"expanded"`: multi-line box with attach/emoji icons and a "Send" text
   * button on a row below — matches the two Comment variants in the design
   * reference. */
  variant?: "compact" | "expanded";
  className?: string;
}

/**
 * DS-TF CommentInput — the "Comment" composite from the design
 * reference: an `Avatar` next to a text input preconfigured with attach and
 * emoji actions and a Send control.
 *
 * Scope note: the attach/emoji buttons are decorative slots here (no file
 * picker or emoji panel wired up) — pass your own `onAttach`/`onEmoji`-style
 * handlers by wrapping this component, or extend it, if you need real
 * attachment/emoji picking behavior.
 *
 * @example
 * <CommentInput avatarInitials="JD" variant="expanded" onSend={handleSend} helperText="Helper Text" />
 * <CommentInput avatarSrc="/jane.jpg" variant="compact" onSend={handleSend} />
 */
export function CommentInput({
  avatarSrc,
  avatarInitials,
  value,
  defaultValue,
  onChange,
  onSend,
  placeholder = "Text Input",
  helperText,
  disabled,
  variant = "compact",
  className,
}: CommentInputProps) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const id = useId();

  const update = (next: string) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const canSend = current.trim().length > 0 && !disabled;

  const handleSend = () => {
    if (!canSend) return;
    onSend?.(current);
    if (value === undefined) setInternal("");
  };

  return (
    <div className={cn("ds-tf-comment flex w-full flex-col gap-1.5 font-sans", className)}>
      <div className="flex items-start gap-2.5">
        <Avatar src={avatarSrc} initials={avatarInitials} size="sm" className="mt-0.5 shrink-0" />
        {variant === "expanded" ? (
          <div
            data-disabled={disabled ? "true" : undefined}
            className="ds-tf-comment-box flex flex-1 flex-col gap-2 rounded-2xl border-[1.5px] border-line-dark bg-white p-3"
          >
            <textarea
              id={id}
              rows={2}
              disabled={disabled}
              placeholder={placeholder}
              value={current}
              onChange={(e) => update(e.target.value)}
              className="ds-tf-comment-textarea w-full resize-none border-0 bg-transparent text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" aria-label="Attach" disabled={disabled} className="ds-tf-comment-icon-btn flex items-center justify-center">
                  <AttachIcon />
                </button>
                <button type="button" aria-label="Emoji" disabled={disabled} className="ds-tf-comment-icon-btn flex items-center justify-center">
                  <EmojiIcon />
                </button>
              </div>
              <Button type="button" size="sm" onClick={handleSend} disabled={!canSend} className="rounded-full">
                Send
              </Button>
            </div>
          </div>
        ) : (
          <div
            data-disabled={disabled ? "true" : undefined}
            className="ds-tf-comment-row flex flex-1 items-center gap-2 rounded-full border-[1.5px] border-line-dark bg-white py-1.5 pl-4 pr-1.5"
          >
            <input
              id={id}
              disabled={disabled}
              placeholder={placeholder}
              value={current}
              onChange={(e) => update(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="ds-tf-comment-input min-w-0 flex-1 bg-transparent text-sm text-ink-primary focus:outline-none disabled:cursor-not-allowed"
            />
            <button type="button" aria-label="Attach" disabled={disabled} className="ds-tf-comment-icon-btn flex items-center justify-center">
              <AttachIcon />
            </button>
            <button type="button" aria-label="Emoji" disabled={disabled} className="ds-tf-comment-icon-btn flex items-center justify-center">
              <EmojiIcon />
            </button>
            <button
              type="button"
              aria-label="Send"
              onClick={handleSend}
              disabled={!canSend}
              className="ds-tf-comment-send-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-primary text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon />
            </button>
          </div>
        )}
      </div>
      {helperText && (
        <p className="pl-[42px] text-[11.5px] text-ink-secondary">{helperText}</p>
      )}
    </div>
  );
}

function AttachIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path
        d="M8 12l6.5-6.5a3 3 0 114.24 4.24L11 17.5a5 5 0 11-7.07-7.07L12.5 2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 14c.8 1.2 2 2 3.5 2s2.7-.8 3.5-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[14px] w-[14px]">
      <path d="M3 12l18-8-8 18-2.5-7.5L3 12z" fill="currentColor" />
    </svg>
  );
}
