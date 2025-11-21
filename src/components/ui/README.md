# Mobile-First Accessible Component Library

A collection of pre-built, WCAG 2.1 Level AA compliant, touch-friendly UI components designed for mobile-first development.

## Components

### AccessibleButton
Touch-friendly button component with haptic feedback and focus management.

```tsx
import { AccessibleButton } from "@/components/ui/accessible-button";

<AccessibleButton 
  variant="default" 
  size="default"
  aria-label="Submit form"
  onClick={handleSubmit}
>
  Submit
</AccessibleButton>
```

**Props:**
- `variant`: `default` | `destructive` | `outline` | `secondary` | `ghost` | `link`
- `size`: `default` | `sm` | `lg` | `icon`
- `aria-label`: Required for icon-only buttons
- All standard button props

**Features:**
- ✅ Minimum 44×44px touch targets on mobile
- ✅ Automatic haptic feedback
- ✅ Global focus rings
- ✅ Active/pressed states

### AccessibleInput
Form input with proper labeling and error handling.

```tsx
import { AccessibleInput } from "@/components/ui/accessible-input";

<AccessibleInput
  label="Email address"
  type="email"
  required
  error={errors.email}
  helperText="We'll never share your email"
  hideLabel={false}
/>
```

**Props:**
- `label`: Required visible or screen-reader-only label
- `error`: Error message to display
- `helperText`: Helper text below input
- `hideLabel`: Visually hide label (still accessible)
- All standard input props

**Features:**
- ✅ Always has associated label
- ✅ Error announcements with `aria-live`
- ✅ 44×44px minimum height
- ✅ Touch-optimized
- ✅ Required field indicators

### AccessibleCard
Semantic card component with optional interactive states.

```tsx
import { 
  AccessibleCard,
  AccessibleCardHeader,
  AccessibleCardTitle,
  AccessibleCardDescription,
  AccessibleCardContent,
  AccessibleCardFooter
} from "@/components/ui/accessible-card";

<AccessibleCard interactive aria-label="Project card">
  <AccessibleCardHeader>
    <AccessibleCardTitle as="h2">
      Project Name
    </AccessibleCardTitle>
    <AccessibleCardDescription>
      Brief description
    </AccessibleCardDescription>
  </AccessibleCardHeader>
  
  <AccessibleCardContent>
    Main card content
  </AccessibleCardContent>
  
  <AccessibleCardFooter>
    <AccessibleButton>Action</AccessibleButton>
  </AccessibleCardFooter>
</AccessibleCard>
```

**Props:**
- `interactive`: Makes card focusable and clickable
- `headingLevel`: Semantic heading level
- `aria-label`: Required if interactive without visible label

**Features:**
- ✅ Proper semantic HTML
- ✅ Keyboard navigation when interactive
- ✅ Hover/focus states
- ✅ Touch-optimized scaling

### AccessibleLink
Navigation link with external link handling and variants.

```tsx
import { AccessibleLink } from "@/components/ui/accessible-link";

// Internal link
<AccessibleLink to="/about" variant="button">
  Learn More
</AccessibleLink>

// External link
<AccessibleLink 
  to="https://example.com" 
  external
  variant="outline"
  aria-label="Visit our documentation (opens in new tab)"
>
  Docs
</AccessibleLink>
```

**Props:**
- `variant`: `default` | `button` | `ghost` | `outline`
- `size`: `default` | `sm` | `lg`
- `external`: Adds new tab behavior and screen reader announcement
- `aria-label`: Optional clarity for link purpose
- All React Router Link props

**Features:**
- ✅ External link announcements
- ✅ Haptic feedback
- ✅ Focus management
- ✅ Multiple style variants
- ✅ Automatic "opens in new tab" announcement

### SkipToContent
Skip-to-main-content link for keyboard navigation.

```tsx
import { SkipToContent } from "@/components/ui/skip-to-content";

<body>
  <SkipToContent contentId="main-content" />
  <header>...</header>
  <main id="main-content">
    {children}
  </main>
</body>
```

**Props:**
- `contentId`: ID of main content container (default: "main-content")
- `label`: Custom label text
- `className`: Additional styling

**Features:**
- ✅ Only visible on keyboard focus
- ✅ WCAG 2.1 Level A requirement
- ✅ Customizable target
- ✅ High z-index for visibility

## Hooks

### useKeyboardTrap
Trap keyboard focus within a container (modals, menus).

```tsx
import { useKeyboardTrap } from "@/hooks/use-keyboard-trap";

function Modal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);
  useKeyboardTrap(modalRef, isOpen, onClose);
  
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
}
```

**Parameters:**
- `containerRef`: Ref to container element
- `isActive`: Whether trap is active
- `onEscape`: Callback for Escape key

**Features:**
- ✅ Cycles Tab focus within container
- ✅ Shift+Tab reverses direction
- ✅ Escape key support
- ✅ Auto-focuses first element

## Global Utilities

### CSS Classes

#### Typography
```css
.body-sm     /* 12px → 14px */
.body-base   /* 12px → 14px */
.body-lg     /* 14px → 16px */
.body-xl     /* 16px → 18px */
```

#### Touch Targets
```css
.touch-target     /* 44×44px minimum */
.touch-target-lg  /* 48×48px minimum */
```

#### Accessibility
```css
.focus-ring       /* Global focus indicator */
.interactive      /* Touch manipulation + active states */
.sr-only          /* Screen reader only */
```

### Mobile Enforcement
All buttons automatically meet 44×44px minimum on mobile:
```css
@media (max-width: 768px) {
  button:not(.touch-exception) {
    min-h: 44px;
    min-w: 44px;
  }
}
```

## Best Practices

### Always Include Labels
```tsx
// ❌ Bad: Placeholder only
<input type="email" placeholder="Email" />

// ✅ Good: Visible label
<AccessibleInput label="Email" type="email" />

// ✅ Good: Hidden label (if design requires)
<AccessibleInput label="Email" type="email" hideLabel />
```

### Icon Buttons Need ARIA Labels
```tsx
// ❌ Bad: No label
<AccessibleButton><X /></AccessibleButton>

// ✅ Good: Has aria-label
<AccessibleButton aria-label="Close menu">
  <X />
</AccessibleButton>
```

### Use Semantic HTML
```tsx
// ❌ Bad: Div with onClick
<div onClick={handleClick}>Click me</div>

// ✅ Good: Actual button
<AccessibleButton onClick={handleClick}>
  Click me
</AccessibleButton>
```

### Heading Hierarchy
```tsx
// ❌ Bad: Skipped levels
<h1>Page Title</h1>
<h3>Section</h3>

// ✅ Good: Proper nesting
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

### External Links
```tsx
// ❌ Bad: No indication
<a href="https://example.com" target="_blank">Link</a>

// ✅ Good: Announced to screen readers
<AccessibleLink to="https://example.com" external>
  Link
</AccessibleLink>
```

## Testing

Run the mobile audit script:
```bash
node scripts/mobile-audit-test.js
```

Manual testing checklist:
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Touch targets are minimum 44×44px on mobile
- [ ] All text is minimum 12px
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Screen reader announces content correctly
- [ ] No horizontal scroll at 360px width

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Accessibility Documentation](../docs/ACCESSIBILITY.md)
- [Mobile Performance Audit](../MOBILE_PERFORMANCE_AUDIT.md)
