# ds-tf-ds

React + Tailwind component library generated from the **DS-TF v1.1 (Light)** Figma design tokens. Built on [Radix UI](https://www.radix-ui.com/) primitives for real accessibility (keyboard, focus, ARIA) and [class-variance-authority](https://cva.style/) for variant styling.

Each component lives in its own folder with a separated `.tsx` (structure/behavior) and `.css` (the handful of things Tailwind utilities can't express — focus rings driven by Radix `data-state`, the switch thumb slide, etc.). Everything else is styled with Tailwind utility classes that read from the tokens below, so the whole system stays traceable back to a single source of truth.

```
src/
  styles/tokens.css        ← CSS custom properties (source of truth for color/shadow/radius)
  tokens/                  ← same values as typed JS/TS objects (for canvas, charts, etc.)
  lib/cn.ts                ← clsx + tailwind-merge helper used by every component
  components/
    ActionPanel/     ActionPanel.tsx     ActionPanel.css     index.ts
    ActivityFeed/    ActivityFeed.tsx                        index.ts
    Alert/           Alert.tsx                               index.ts
    AmountField/     AmountField.tsx     AmountField.css     index.ts
    Avatar/          Avatar.tsx          Avatar.css          index.ts
    Badge/           Badge.tsx           Badge.css           index.ts
    Breadcrumbs/     Breadcrumbs.tsx     Breadcrumbs.css     index.ts
    Button/          Button.tsx          Button.css          index.ts
    Card/            Card.tsx                                index.ts
    Chart/           Chart.tsx                                index.ts
    Checkbox/        Checkbox.tsx        Checkbox.css        index.ts
    CommentInput/    CommentInput.tsx    CommentInput.css    index.ts
    DatePicker/      DatePicker.tsx                          index.ts
    Dialog/          Dialog.tsx          Dialog.css          index.ts
    Divider/         Divider.tsx         Divider.css         index.ts
    FilterButton/    FilterButton.tsx                        index.ts
    FlyoutMenu/      FlyoutMenu.tsx                          index.ts
    Header/          Header.tsx                              index.ts
    Message/         Message.tsx                             index.ts
    NavGroup/        NavGroup.tsx                            index.ts
    NavItem/         NavItem.tsx         NavItem.css         index.ts
    NavMenu/         NavMenu.tsx                             index.ts
    Pagination/      Pagination.tsx                          index.ts
    PasswordField/   PasswordField.tsx                       index.ts
    PaymentCardField/PaymentCardField.tsx PaymentCardField.css index.ts
    Progress/        Progress.tsx                            index.ts
    RadioCard/       RadioCard.tsx       RadioCard.css       index.ts
    RadioGroup/      RadioGroup.tsx      RadioGroup.css      index.ts
    Reaction/        Reaction.tsx                            index.ts
    SectionHeader/   SectionHeader.tsx                       index.ts
    Select/          Select.tsx          Select.css          index.ts
    SidebarSwitcher/ SidebarSwitcher.tsx                     index.ts
    SlideOver/       SlideOver.tsx       SlideOver.css       index.ts
    Slider/          Slider.tsx          Slider.css          index.ts
    Stat/            Stat.tsx                                index.ts
    Steps/           Steps.tsx                               index.ts
    Switch/          Switch.tsx          Switch.css          index.ts
    Table/           Table.tsx                               index.ts
    Tabs/            Tabs.tsx            Tabs.css            index.ts
    TextArea/        TextArea.tsx        TextArea.css        index.ts
    TextField/       TextField.tsx       TextField.css       index.ts
    Toggle/          Toggle.tsx          Toggle.css          index.ts
    Tooltip/         Tooltip.tsx         Tooltip.css         index.ts
  index.ts                 ← barrel export
tailwind-preset.cjs         ← extends your Tailwind theme with DS-TF tokens
```

> **Status:** all 43 components documented in the design-token reference are now implemented as real React components — ActionPanel, the Activity Feed family (ActivityFeed, ActivityItem, ActivityIcon, ActivityAttachment), Alert/RichAlert, Card/CardHeader/CardFooter, BarChart/LineChart, DatePicker, FilterButton, Header/HeaderNavLink, FlyoutMenu/FlyoutMenuContent/FlyoutMenuItem, Message/MessagePhotoGrid, Reaction/ReactionAddButton, Pagination/SimplePagination/PaginationSummary, ProgressBar/ProgressRing, SectionHeader/SectionHeaderMenuButton, SidebarSwitcher/SidebarRailButton, StatCard/StatDelta/StatMetric, Steps/BulletSteps, the Table family (Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, TableCheckboxCell, TableGroupRow), Avatar, Badge, Breadcrumbs, Button, Checkbox, Dialog/DialogTrigger/DialogContent, Divider, the Navigation family (NavMenu, NavGroup, NavItem), RadioGroup/RadioGroupItem, RadioCard, Select/SelectItem, SlideOver/SlideOverTrigger/SlideOverContent, Slider, Switch, Tabs, Toggle, Tooltip, the Text Field family (TextField, PasswordField, AmountField, PaymentCardField), and the Text Area family (TextArea, CommentInput).

## Install

```bash
npm install github:AndreToni/DS-TF
# peer deps, if your project doesn't already have them
npm install react react-dom
```

## Set up Tailwind

**1. Extend your `tailwind.config.js`** with the DS-TF preset, and add the package's `dist` folder to `content` so Tailwind's scanner doesn't purge the classes used inside the pre-built components:

```js
// tailwind.config.js
module.exports = {
  presets: [require("ds-tf-ds/tailwind-preset")],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/ds-tf-ds/dist/**/*.{js,mjs}", // required
  ],
};
```

**2. Import the tokens + component styles once**, at the root of your app (e.g. `main.tsx` / `App.tsx` / `layout.tsx`):

```ts
import "ds-tf-ds/tokens.css"; // CSS custom properties (--color-accent-primary, etc.)
import "ds-tf-ds/styles.css"; // component-specific CSS (focus rings, switch thumb, ...)
```

## Use

```tsx
import { Button, Badge, Avatar, Checkbox, Switch } from "ds-tf-ds";

function Example() {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials="JD" size="md" badge="success" />
      <Button variant="primary" size="md">
        Save
      </Button>
      <Badge tone="success" appearance="subtle" dot>
        Online
      </Badge>
      <Checkbox defaultChecked />
      <Switch defaultChecked />
    </div>
  );
}
```

Every component accepts a `className` prop; it's merged with the built-in classes via `tailwind-merge`, so overriding a default (e.g. `<Button className="rounded-none">`) just works without specificity fights.

## Components

| Component  | Built on                        | Notes |
|---|---|---|
| `ActionPanel` | `<div>` | Static (non-modal) card — icon/logo, title, `headerAction` (Switch, close button, Button, or a combination), description, and a free-form footer (`children`: buttons, a link, an inline form). `surface="solid"` (white, bordered — default) \| `"subtle"` (shaded, borderless). Same "free slot" philosophy as Dialog — no dedicated sub-components for header/footer content |
| `ActivityFeed` / `ActivityItem` / `ActivityIcon` / `ActivityAttachment` | `<div>` | Notification/activity list — also covers the "Comment" thread pattern (avatar + name + text + `Reaction`/Reply row) from the Message design reference, no separate comment component needed. `ActivityFeed` just adds dividers between `ActivityItem` rows. Each `ActivityItem` takes `icon` (an `ActivityIcon` for system events, or an `Avatar` for person-authored activity), `name`, `description`, `timestamp`, an optional `headerAction` (e.g. a "⋯" menu button), and a free `children` body (quoted comment, `ActivityAttachment` file chip, `Reaction`, Reply/Dismiss actions via `Button`). `ActivityIcon` has 6 tones, same system as `Badge` |
| `Alert` | `<div>` | Compact single-line status banner — icon + bold `message` + muted `description`, plus a free trailing `action` slot (a "Details →" link, a close button, or both). `tone` (`neutral \| info \| warning \| error \| success`) × `appearance` (`plain \| subtle \| filled`), same system as `Badge`. Default icon per tone, overridable via `icon` |
| `RichAlert` | `<div>` | Card-style alert — icon, optional `onDismiss` close button, bold `title`, `description` paragraph, and a free `footer` (buttons or links). Same `tone`/`appearance` system as `Alert` |
| `Card` / `CardHeader` / `CardFooter` | `<div>` | Bordered container with free `header`/`footer` slots around a `children` content area. `CardHeader` takes an optional `icon` (e.g. an `ActivityIcon`), `title`/`description` + a free `action` slot (search `TextField`, `Button`s, a `Badge`...) and an optional `onDismiss` close button. `CardFooter` takes free `children`, `justify="end" \| "between"`. `size="sm" \| "md" \| "lg"` on `Card` constrains width. No hard-coded title/button/badge markup anywhere — pure "Content Slots" composition |
| `BarChart` | `<div>` + `Tooltip` | One bar per `data` entry (`{ label, value, tooltip? }`), scaled to `max` (or the tallest value). Hover/focus each bar to see its value — reuses the real `Tooltip` component, no bespoke tooltip markup. Same 6-tone system as `Badge`/`Alert` |
| `LineChart` | `<svg>` | Sparkline from a `number[]`, optional soft gradient fill (`filled`, default `true`). Same 6-tone system as `Badge`/`Alert` |
| `DatePicker` | native `<button>` grid | Month calendar with prev/next nav, "today" dot, `mode="single" \| "range"`, `minDate`/`maxDate`. Free `footer` slot (Confirm/Dismiss `Button`s, or an "Enter Date" `TextField`). **Scope note:** no dual-month side-by-side view (compose two instances sharing state instead); adjacent-month days don't jump the calendar on click; day grid is Tab-through, not roving-tabindex arrow-key navigation |
| `FilterButton` | `<div>` + `<button>` × 1-2 + `Badge` | Filter-bar chip: `variant="filter" \| "add" \| "date" \| "sort"` picks a default trailing icon, `count` shows a real `Badge`, `onClear` renders a separate sibling "×" `<button>` (never nested inside the main trigger). `selected` gives the outlined "active" look |
| `Header` / `HeaderNavLink` | `<header>` + `SlideOver` | Responsive top navbar — free `logo`/`nav`/`actions` slots, collapsing below the `md` (768px) breakpoint into a hamburger button that opens a real `SlideOverContent` (`mobileMenu` slot, defaults to `nav`+`actions` stacked). `HeaderNavLink` is a plain horizontal nav item with an optional trailing chevron for `FlyoutMenu` pairing. **Scope note:** search bar, user-avatar dropdown, and "signed-in" mobile account menus aren't dedicated components — compose them from `TextField`/`Avatar`/`FlyoutMenuItem` inside `actions`/`mobileMenu` |
| `FlyoutMenu` / `FlyoutMenuTrigger` / `FlyoutMenuContent` / `FlyoutMenuItem` | `@radix-ui/react-popover` | Dismissible dropdown panel (click-outside/Escape, auto-positioned) for the "Fly-Out Navigation" mega-menu — pair `FlyoutMenuTrigger asChild` with a `HeaderNavLink`. `FlyoutMenuContent` has free `children`/`footer` slots (`size="sm" \| "md" \| "lg"`); `FlyoutMenuItem` is the repeated icon+title+description row (optional `isNew` `Badge`). Mega-menu layout (columns, article cards, icon grids) is left entirely to composition — no built-in layout variants |
| `Message` / `MessagePhotoGrid` | `<div>` | Chat bubble — `align="left"` (received, neutral) \| `"right"` (sent, accent), with free `sender`/`children`/`attachment`/`timestamp`/`reactions` slots. Pass a real `ActivityAttachment` as `attachment` for a file share, or a `MessagePhotoGrid` (`images`, "+N" overlay past `maxVisible`) for a photo share. The "Send Message" composer at the bottom of a thread reuses the existing `CommentInput`, not a new input |
| `Reaction` / `ReactionAddButton` | native `<button>` | Toggle pill: `avatar` (e.g. `Avatar size="xs"`) + `count`, `selected` for the "you reacted" outlined look. `ReactionAddButton` is the dashed circular trigger for opening your own emoji picker |
| `Pagination` / `PaginationSummary` / `SimplePagination` | `<nav>`/native `<button>` + `@radix-ui/react-popover` + `Button` | `Pagination` is the numbered page list — windows around `page` via `siblingCount`/`boundaryCount`, and its "..." opens a popover (same Radix Popover as `FlyoutMenu`) listing every hidden page to jump to. `PaginationSummary` renders "Showing X to Y of Z results." or "Page X of Y". `SimplePagination` is just Previous/Next (`variant="text"` reuses the real `Button`, `variant="icon"` is chevron-only; `grouped` merges them into one shared-border control). Label placement relative to the buttons is left to your own layout — no built-in `layout` prop |
| `ProgressBar` / `ProgressRing` | `<div>` / `<svg>` | Linear (`ProgressBar`) and circular (`ProgressRing`) progress indicators — same 6-tone system as `BarChart`, reusing its exact tone → color map (now exported from `Chart.tsx`) instead of a redefinition. `ProgressBar`'s `label` prop places the "X%" text `"none" \| "trailing" \| "top"` (floating chip) `\| "bottom-start" \| "bottom-end"`. `ProgressRing` draws the arc with `stroke-dashoffset`, same hand-computed-SVG technique as `LineChart`; `children` overrides the centered "X%" text, `label` adds a caption below |
| `SectionHeader` / `SectionHeaderMenuButton` | `<div>` | Page/section-level header — explicitly distinct from `CardHeader` per the design reference's own copy. `icon` + `title` + `description`, a free `breadcrumb` slot above (pass a real `Breadcrumbs`), a free `tabs` slot below (pass a real `Tabs`, gets a top divider), and a free `actions` row (search `TextField`, `FilterButton`s, a primary `Button`, `SectionHeaderMenuButton`) that wraps on narrow viewports via plain flex-wrap — no dedicated breakpoint prop. Pairs with `Table` for the "Team Members"-style page header seen in the design reference |
| `SidebarSwitcher` / `SidebarRailButton` | native `<button>` | `SidebarSwitcher` is the trigger row for a sidebar's workspace/team switcher or account menu — `icon` (in a 44px `iconTone="accent" \| "success" \| "neutral"` tinted chip) or `avatar` + `title` + `subtitle` + a trailing `"sort"` (↕, the "Select" dropdown — flat switchable list) \| `"chevron"` (single arrow, rotates via the `open` prop — the "Menu" dropdown, a richer panel with header/upsell/actions) \| `"kebab"` \| `"none"` icon. Verified against the real Figma workspace-switcher node: the two dropdown flavors are genuinely different content, not just icon swaps, so both are documented as separate `FlyoutMenuContent` compositions (plain `<button>` rows for "Menu"'s action list, not `FlyoutMenuItem`, since those rows have no icon/description). It's just the trigger; wrap it in `FlyoutMenuTrigger asChild` for the dropdown (reuses `FlyoutMenu`, not a new popover). `SidebarRailButton` is a single icon-only square for a collapsed rail — no dedicated rail container, stack them in a plain flex column with free `Divider`s between groups. Building a full "Sidebar Nav" screen is composition: `NavMenu`'s `header`/`footer` slots hold the switchers, `NavItem`'s `countTone` prop colors an urgent count red, `shortcut` renders a "⌘1"-style keycap, nested `children` get an automatic connector line, and the "storage almost full" card is just an `ActionPanel` with a `ProgressBar` inside it — no dedicated sidebar-shell component was built |
| `StatCard` / `StatDelta` / `StatMetric` | `<div>` / `<span>` | Dashboard stat pieces. `StatDelta` is the small "↗ 2%" trend indicator — plain colored text (not a `Badge`), tone implied by `direction` (`"up"`→success, `"down"`→error, `"flat"`→neutral) or overridden via `tone` (same `ChartTone` system as `BarChart`). `StatMetric` is a label/value(/delta) triple for grids like "Multi-Column Stat" — arrange a few yourself, no dedicated grid component. `StatCard` is deliberately just the value + delta + trend-chart body (`layout="stacked" \| "inline"`) — no header, menu, or footer of its own, since `CardHeader` (now with an `icon` slot) and `CardFooter` already cover that; compose `StatCard` as a `Card`'s `children` |
| `Steps` / `BulletSteps` | `<ol>`/`<div>` | `Steps` is one data-driven component (`items` + `currentStep`) covering horizontal steps, vertical steps with a `description` per item (the "mega" layout), and a labelless "circle only" variant (just omit `label`) — status (`"complete" \| "current" \| "upcoming"`) and connector-line coloring are computed from each item's index vs. `currentStep`, with a per-item `status` override available. `BulletSteps` is the separate minimal "Step 2 of 3" + progress-dot-row pattern for onboarding/carousel flows. **Scope note:** the compact dot-row-with-chevron "Stepper (M)" atom (reads like a dropdown step switcher) wasn't built as its own component |
| `Table` / `TableHeader` / `TableBody` / `TableRow` / `TableHeaderCell` / `TableCell` / `TableCheckboxCell` / `TableGroupRow` | native `<table>` + React Context | The "Base Table Cell Component" system — small composable pieces instead of one data-driven table. `Table`'s `dense` prop flows to every `TableCell`/`TableHeaderCell` via context (same pattern as `Breadcrumbs`' `appearance`/`size`), overridable per-cell. `TableHeaderCell` takes `sortable`/`sortDirection`/`onSort` for a sort arrow. `TableCheckboxCell` wraps the real `Checkbox` (`as="th"` for the header "select all"). `TableRow`'s `selected` tints the row; hover-reveal actions (e.g. View/Edit links, icon buttons) are just `group`/`group-hover` Tailwind classes — no dedicated prop. `TableGroupRow` is a full-width `colSpan` label row for sectioned tables (e.g. "Design Team"/"Engineering"). Everything else — avatars, badges, buttons, search/sort controls, pagination, the "Card Table" wrapper — is composition with `Avatar`/`Badge`/`Button`/`FilterButton`/`SimplePagination`/`PaginationSummary`/`Card`. **Scope note:** collapsing/expanding a `TableGroupRow`'s rows is left to your own state — the component doesn't track expand/collapse itself |
| `Button`   | native `<button>` + `cva`       | 5 variants (primary/secondary/outlined/transparent/destructive) × 3 sizes, `leadIcon`/`tailIcon` slots |
| `Badge`    | `<span>` + `cva`                | 6 tones × 3 appearances (filled/subtle/outline) × 3 sizes, optional `dot` |
| `Avatar`   | `@radix-ui/react-avatar`        | Handles the photo → initials → placeholder fallback chain automatically. **SSR note:** the fallback (initials/placeholder) only appears after client hydration — Radix resolves image-load status in an effect. |
| `Checkbox` | `@radix-ui/react-checkbox`      | Supports `checked`, `"indeterminate"`, `disabled`, full keyboard support |
| `Switch`   | `@radix-ui/react-switch`        | Controlled/uncontrolled, full keyboard support |
| `Breadcrumbs` / `BreadcrumbItem` | `<nav>`/`<ol>` + React Context | `current` prop renders the active crumb as non-interactive text (`aria-current="page"`); shared `appearance`/`size` flow from `Breadcrumbs` to each `BreadcrumbItem` |
| `Divider`  | `@radix-ui/react-separator`     | Plain line, or pass `children` (text/icon/Button) for a labeled divider; `align="center" \| "start"` |
| `RadioGroup` / `RadioGroupItem` | `@radix-ui/react-radio-group` | Standard radio list; `RadioGroupItem` accepts a `label` prop for native click-to-select |
| `RadioCard` | `@radix-ui/react-radio-group` (`Item`) | Card-style radio alternative — the whole card is the control; `direction="row" \| "column"`, `size="md" \| "sm"` |
| `Select` / `SelectItem` | `@radix-ui/react-select`  | Single-value select. `renderValue` prop lets you customize the trigger's display (e.g. avatar + name, formatted date) once a value is chosen. **Scope note:** true multi-select and date-range picking aren't implemented — compose `renderValue` for custom single-value display instead. |
| `Slider`   | `@radix-ui/react-slider`        | Pass a 1- or 2-entry array to `value`/`defaultValue` for single or range mode; optional `ticks` labels below the track. **Scope note:** "Multi Range" (3+ independently colored segments) isn't supported — Radix only fills one continuous range color. |
| `Tabs` / `TabsList` / `TabsTrigger` / `TabsContent` | `@radix-ui/react-tabs` | `variant="line" \| "pill"`, `density="default" \| "dense"`, `fullWidth` on `TabsList` |
| `TextField` | native `<input>` | Label + helper text + `leading`/`trailing` composition slots. Covers Basic, "with clear icon", Search, Web Address, Phone Number, and Transfer via composition (e.g. `leading="http://"`, `leading={<Chip/>}`, `trailing={<button>…</button>}`) |
| `PasswordField` | `TextField` wrapper | Built-in show/hide toggle + lock icon; `forgotPasswordAction` slot for a "Forgot Password?" link |
| `AmountField` | `TextField` wrapper | Leading `"$"` + either a static `currency` chip or a `stepper` (decrement/increment buttons); stepper works controlled or uncontrolled |
| `PaymentCardField` | native `<input>` × 3 | Two-row composite (card number, then MM/YY + CCV) styled as one control; auto-formats as you type. **Scope note:** brand badge (Visa/Mastercard) is a first-digit heuristic for visual purposes, not real BIN validation |
| `TextArea` | native `<textarea>` | Label + helper text, resizable vertically by default (`resize="none" \| "vertical" \| "both"`) |
| `CommentInput` | `Avatar` + native input | Avatar next to a text field preconfigured with attach/emoji icons and Send; `variant="compact"` (pill, inline) or `"expanded"` (box, actions row below). **Scope note:** attach/emoji buttons are decorative slots — no real file picker or emoji panel wired up |
| `Toggle` | `@radix-ui/react-switch` | On/off switch with optional `label` (ON/OFF track text) and `icon` (× on the thumb), combinable; `size="default" \| "short"` |
| `Tooltip` / `TooltipProvider` | `@radix-ui/react-tooltip` | Pass `content` for the simple text tooltip, or `title`/`description`/`action` for the "Rich Tooltip" layout; `side`, `align`, `appearance="dark" \| "light"`. "Tooltip Icon" is the same component with an icon as `children`. Each instance self-wraps in its own Provider — use `TooltipProvider` at your app root instead if you want Radix's cross-tooltip delay grouping |
| `NavItem` | `<a>`/`<button>` | Icon + label + `count` badge (`countTone` picks its color, e.g. `"error"` for an urgent count) + `isNew` tag + `description` (mega item) + expand/collapse `children`; `appearance="default" \| "pill"` for the selected state. `shortcut` renders a muted keycap chip (e.g. `"⌘1"`) instead of `count` — the two are mutually exclusive slots. Nested `children` get an automatic vertical connector line, with a solid accent segment behind whichever nested item is `selected` — verified against the real Figma "Projects" sub-nav pattern, no extra prop needed |
| `NavGroup` | `<div>` | Optional uppercase section header above a cluster of `NavItem`s (e.g. "Secondary Menu"). **Scope note:** the "Group Headline" atom's own hover/selected states (suggesting a clickable switcher) aren't built as an interactive component here — compose `Tabs` separately if you need that |
| `NavMenu` | `<nav>` | Sidebar container (width, padding, border) to compose `NavGroup`/`NavItem` into — `header`/`footer` are free slots outside the scrolling item list (`footer` pins to the bottom via `margin-top: auto`), for a `SidebarSwitcher` and a "+ New Page"-style row |
| `Dialog` / `DialogTrigger` / `DialogContent` / `DialogClose` | `@radix-ui/react-dialog` | Modal overlay. `DialogContent` takes `title` (renders a bordered header + optional `headerActions`, and skips the floating `×` unless you also pass it), `footer` (free-form slot — Back/Next buttons or a single full-width CTA), and `size="sm" \| "md" \| "lg"`. Omit `title` for the headerless "Content Slot" variant (floating `×` close button instead). Body content is just `children` — compose full forms directly, no special "slot" component needed |
| `SlideOver` / `SlideOverTrigger` / `SlideOverContent` / `SlideOverClose` | `@radix-ui/react-dialog` | Full-height panel that slides in from the right edge — same header/footer/`size` API as `Dialog`, but body scrolls independently while the footer stays pinned to the bottom. Use for longer forms that don't fit comfortably in a centered modal. **Scope note:** only the right-side slide-in is implemented — no `side="left" \| "bottom"` prop |

## Develop

```bash
npm install
npm run dev     # tsup --watch
npm run build   # emits dist/ (esm + cjs + d.ts + index.css)
npm run typecheck
```

## Design tokens

Raw values are also exported as typed objects for non-Tailwind use (canvas, SVG, charts, emails):

```ts
import { colors, spacing, elevation, typography } from "ds-tf-ds";

colors.accent.primary; // "#2563EB"
spacing[16];            // 64
elevation.md;            // "0px 0px 4px 0px rgba(0,0,0,0.04), ..."
```
