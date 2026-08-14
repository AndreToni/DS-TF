import { createContext, forwardRef, useContext } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../../lib/cn";
import "./Tabs.css";

export const Tabs = RadixTabs.Root;

type Variant = "line" | "pill";
type Density = "default" | "dense";

const TabsListContext = createContext<{ variant: Variant; density: Density; fullWidth: boolean }>({
  variant: "line",
  density: "default",
  fullWidth: false,
});

export interface TabsListProps extends RadixTabs.TabsListProps {
  /** `"line"` (default): underline indicator. `"pill"`rounded segmented look. */
  variant?: Variant;
  /** `"dense"` reduces font size/padding for tab-heavy toolbars. */
  density?: Density;
  /** Distributes items evenly across the full width (only meaningful with `variant="line"`). */
  fullWidth?: boolean;
}

/**
 * DS-TF Tabs — built on `@radix-ui/react-tabs`.
 *
 * @example
 * <Tabs defaultValue="overview">
 *   <TabsList variant="line">
 *     <TabsTrigger value="overview">Overview</TabsTrigger>
 *     <TabsTrigger value="activity">Activity</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="overview">...</TabsContent>
 *   <TabsContent value="activity">...</TabsContent>
 * </Tabs>
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "line", density = "default", fullWidth, ...props }, ref) => {
    return (
      <TabsListContext.Provider value={{ variant, density, fullWidth: !!fullWidth }}>
        <RadixTabs.List
          ref={ref}
          className={cn(
            "flex",
            variant === "line" && ["border-b border-line-light", fullWidth ? "gap-0" : "gap-6.5"],
            variant === "pill" && "inline-flex gap-1 rounded-full bg-surface-medium p-1",
            className
          )}
          {...props}
        />
      </TabsListContext.Provider>
    );
  }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps extends RadixTabs.TabsTriggerProps {}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, density, fullWidth } = useContext(TabsListContext);
    return (
      <RadixTabs.Trigger
        ref={ref}
        className={cn(
          "ds-tf-tab-trigger inline-flex items-center gap-1.5 whitespace-nowrap font-sans font-semibold text-ink-secondary",
          variant === "line" && [
            "ds-tf-tab-trigger--line border-b-2 border-transparent pb-3",
            density === "dense" ? "text-[12.5px] pb-2" : "text-sm",
          ],
          variant === "pill" && [
            "ds-tf-tab-trigger--pill rounded-full",
            density === "dense" ? "px-3 py-1.5 text-[12.5px]" : "px-3.5 py-1.5 text-[13.5px]",
          ],
          fullWidth && "flex-1 justify-center",
          className
        )}
        {...props}
      >
        {children}
      </RadixTabs.Trigger>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = RadixTabs.Content;
