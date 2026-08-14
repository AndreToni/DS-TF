import { forwardRef, type ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "../../lib/cn";
import "./Select.css";

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Marks the trigger in the error color. */
  error?: boolean;
  /** `"md"` (default) | `"sm"` trigger height. */
  size?: "md" | "sm";
  name?: string;
  /** Custom rendering for the selected value (e.g. avatar + name for a
   * "Select User", or a formatted date for a "Select Date"). Only applies
   * once a value is selected/controlled — falls back to the matching
   * `SelectItem`'s text otherwise. */
  renderValue?: (value: string) => ReactNode;
  children: ReactNode;
  className?: string;
  /** Forwarded to the trigger button. */
  id?: string;
  "aria-label"?: string;
}

/**
 * DS-TF Select — built on `@radix-ui/react-select`. Compose it with
 * `SelectItem` children, similar to a native `<select>`/`<option>` pair.
 *
 * Scope note: this wraps Radix's single-value select. It does not implement
 * true multi-select or a date-range picker — for "Select Date" or
 * "Select User" style triggers, use the `renderValue` prop to customize how
 * the chosen value is displayed while keeping single-value semantics.
 *
 * @example
 * <Select value={country} onValueChange={setCountry} placeholder="Selecione...">
 *   <SelectItem value="br">Brasil</SelectItem>
 *   <SelectItem value="us">Estados Unidos</SelectItem>
 * </Select>
 */
export function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  error,
  size = "md",
  name,
  renderValue,
  children,
  className,
  id,
  "aria-label": ariaLabel,
}: SelectProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger
        id={id}
        aria-label={ariaLabel}
        data-error={error ? "true" : undefined}
        className={cn(
          "ds-tf-select-trigger inline-flex w-full items-center justify-between gap-2 rounded-lg border-[1.5px] border-line-dark bg-white font-sans text-ink-primary",
          size === "sm" ? "h-8 px-2.5 text-[13px]" : "h-10 px-3 text-sm",
          className
        )}
      >
        <RadixSelect.Value placeholder={placeholder} className="truncate text-left">
          {renderValue && value != null ? renderValue(value) : undefined}
        </RadixSelect.Value>
        <RadixSelect.Icon className="ds-tf-select-chevron shrink-0 text-ink-secondary">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={6}
          className="ds-tf-select-content z-50 overflow-hidden rounded-lg border border-line-light bg-white shadow-md"
        >
          <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

export interface SelectItemProps extends Omit<RadixSelect.SelectItemProps, "asChild"> {
  className?: string;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RadixSelect.Item
        ref={ref}
        className={cn(
          "ds-tf-select-item flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 font-sans text-sm text-ink-primary outline-none",
          className
        )}
        {...props}
      >
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
        <RadixSelect.ItemIndicator className="ml-auto flex items-center">
          <CheckIcon />
        </RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[13px] w-[13px]">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
