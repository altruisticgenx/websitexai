# Accessibility Guidelines

This document outlines the accessibility standards and best practices implemented in this project to meet **WCAG 2.1 Level AA** compliance.

## Table of Contents

- [Overview](#overview)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Touch Targets](#touch-targets)
- [Typography & Readability](#typography--readability)
- [Color Contrast](#color-contrast)
- [Focus Management](#focus-management)
- [Component Library](#component-library)
- [Testing](#testing)

## Overview

All components in this project follow WCAG 2.1 Level AA guidelines, ensuring:
- **Perceivable**: Content is presented in ways users can perceive
- **Operable**: Interface components are operable by all users
- **Understandable**: Information and interface are understandable
- **Robust**: Content works with current and future technologies

## Keyboard Navigation

### Requirements
- ✅ All interactive elements are keyboard accessible
- ✅ Logical tab order throughout the application
- ✅ Focus trap in modals and dialogs
- ✅ Skip-to-content link for bypassing navigation
- ✅ Escape key closes modals and overlays

### Implementation
Use the `useKeyboardTrap` hook for modals:
```tsx
import { useKeyboardTrap } from "@/hooks/use-keyboard-trap";

function Modal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null);
  useKeyboardTrap(modalRef, isOpen, onClose);
  
  return <div ref={modalRef}>...</div>;
}
```

Add skip-to-content at the top of your layout:
```tsx
import { SkipToContent } from "@/components/ui/skip-to-content";

<body>
  <SkipToContent />
  <header>...</header>
  <main id="main-content">
    {children}
  </main>
</body>
```

## Screen Reader Support

### ARIA Labels
All interactive elements have proper ARIA labels:
- Icon-only buttons include `aria-label`
- Form inputs have associated `<label>` elements
- Loading states announce with `aria-live="polite"`
- Error messages use `role="alert"`

### Examples
```tsx
// Icon button
<AccessibleButton aria-label="Close menu">
  <X />
</AccessibleButton>

// Form input
<AccessibleInput
  label="Email address"
  error={errors.email}
  helperText="We'll never share your email"
/>

// Live region
<div aria-live="polite" role="status">
  Loading content...
</div>
```

## Touch Targets

### Minimum Sizes (WCAG 2.5.5)
- **Mobile**: Minimum 44×44px for all touch targets
- **Desktop**: Minimum 24×24px (automatically scales up on mobile)

### Implementation
All buttons automatically meet minimum touch target requirements:
```tsx
// Automatically 44×44px on mobile
<AccessibleButton>Click me</AccessibleButton>

// Force larger touch target
<AccessibleButton size="lg">Large button</AccessibleButton>
```

Use `.touch-target` utility class for custom elements:
```tsx
<a href="..." className="touch-target">
  Custom link
</a>
```

## Typography & Readability

### Font Sizes (WCAG 1.4.4)
- **Minimum body text**: 12px (0.75rem)
- **Recommended**: 14px (0.875rem) or larger
- **All text is scalable**: No absolute units that prevent scaling

### Mobile-First Typography Classes
```css
.body-sm    /* 12px → 14px */
.body-base  /* 12px → 14px */
.body-lg    /* 14px → 16px */
.body-xl    /* 16px → 18px */
```

### Line Height
- Body text: `line-height: 1.5` (minimum)
- Headings: `line-height: 1.2-1.3`

## Color Contrast

### WCAG AA Requirements
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18px+): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

### Design System Colors
All semantic colors in `index.css` meet WCAG AA standards:
- `--foreground` on `--background`: ✅ 12.7:1
- `--primary` on `--background`: ✅ 7.3:1
- `--muted-foreground` on `--background`: ✅ 4.8:1

## Focus Management

### Visual Focus Indicators
All interactive elements have visible focus rings:
```css
.focus-ring {
  @apply focus-visible:outline-none 
         focus-visible:ring-2 
         focus-visible:ring-primary 
         focus-visible:ring-offset-2;
}
```

Applied automatically to:
- Buttons
- Links
- Form inputs
- Custom interactive elements

### Focus Trap
Use in modals, dropdowns, and mobile menus:
```tsx
import { useKeyboardTrap } from "@/hooks/use-keyboard-trap";

const menuRef = useRef<HTMLDivElement>(null);
useKeyboardTrap(menuRef, isOpen, closeMenu);
```

## Component Library

### Mobile-First Accessible Components

#### AccessibleButton
```tsx
<AccessibleButton 
  variant="default" 
  size="default"
  aria-label="Submit form"
>
  Submit
</AccessibleButton>
```

**Features**:
- Automatic 44×44px touch targets on mobile
- Haptic feedback
- Focus rings
- Loading states support

#### AccessibleInput
```tsx
<AccessibleInput
  label="Email"
  type="email"
  required
  error={errors.email}
  helperText="Enter your work email"
/>
```

**Features**:
- Associated labels (never placeholder-only)
- Error announcements with `aria-live`
- Helper text for context
- 44×44px minimum height

#### AccessibleCard
```tsx
<AccessibleCard interactive aria-label="Project card">
  <AccessibleCardHeader>
    <AccessibleCardTitle as="h2">Project Name</AccessibleCardTitle>
    <AccessibleCardDescription>Brief description</AccessibleCardDescription>
  </AccessibleCardHeader>
  <AccessibleCardContent>
    Card content here
  </AccessibleCardContent>
</AccessibleCard>
```

**Features**:
- Proper heading hierarchy
- Interactive state management
- Keyboard navigation when `interactive={true}`

#### AccessibleLink
```tsx
<AccessibleLink 
  to="/about" 
  variant="button"
  external
  aria-label="Learn more about our mission"
>
  Learn More
</AccessibleLink>
```

**Features**:
- External link announcements
- Haptic feedback
- Focus management
- Multiple style variants

## Testing

### Automated Testing
Run the mobile audit script:
```bash
node scripts/mobile-audit-test.js
```

Checks for:
- Touch target sizes
- Font legibility
- Focus indicators
- Horizontal scroll issues

### Manual Testing Checklist

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Shift+Tab works in reverse
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals
- [ ] Focus trap works in modals

#### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with TalkBack (Android)

#### Visual Testing
- [ ] Check focus indicators on all elements
- [ ] Verify color contrast ratios
- [ ] Test at 200% zoom
- [ ] Test with reduced motion enabled

#### Mobile Testing
- [ ] Test on 360px width (Galaxy S20)
- [ ] Test on 390px width (iPhone 12)
- [ ] Test on 414px width (iPhone 14 Pro Max)
- [ ] Verify no horizontal scroll
- [ ] Confirm all touch targets are 44×44px

### Browser DevTools

#### Check Color Contrast
```javascript
// In browser console
const checkContrast = (fg, bg) => {
  // Paste contrast checking code
};
```

#### Count Small Touch Targets
```javascript
[...document.querySelectorAll('button, a[href]')].filter(el => {
  const r = el.getBoundingClientRect();
  return r.height < 44 || r.width < 44;
}).length; // Should be 0
```

#### Count Small Fonts
```javascript
[...document.querySelectorAll('*')].filter(el => 
  parseFloat(getComputedStyle(el).fontSize) < 12 && 
  el.textContent.trim().length > 0
).length; // Should be 0
```

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Support

For accessibility questions or issues, please:
1. Check this documentation
2. Review the component examples
3. Test with the automated audit script
4. File an issue with [a11y] tag if problems persist
