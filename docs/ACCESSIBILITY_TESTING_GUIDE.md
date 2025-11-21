# Accessibility Testing Guide

## 📋 Overview

This guide provides comprehensive instructions for testing keyboard navigation, screen reader compatibility, and WCAG 2.1 Level AA compliance across all components.

---

## ✅ Code Review Findings

### **Well Implemented**

#### 1. **Accessible Components Library**
- ✅ `AccessibleButton` with haptic feedback and proper ARIA labels
- ✅ `AccessibleInput` with visible/hidden labels and error announcements
- ✅ `AccessibleCard` with interactive states and heading levels
- ✅ `AccessibleLink` with external link indicators

#### 2. **Touch Targets**
- ✅ Minimum 44×44px on mobile for all interactive elements
- ✅ 48×48px for primary CTAs (Book Intro button)
- ✅ `touch-manipulation` class applied consistently

#### 3. **Focus Management**
- ✅ Global `.focus-ring` utility class implemented
- ✅ Custom focus trap hook for mobile menu (`use-keyboard-trap`)
- ✅ Focus restoration when closing modals/menus
- ✅ Escape key handling in mobile menu

#### 4. **ARIA Implementation**
- ✅ `aria-label` on all icon-only buttons
- ✅ `aria-expanded` on dropdown toggles
- ✅ `aria-current="page"` for active navigation
- ✅ `role="navigation"` and `aria-label` on nav elements
- ✅ `aria-live="polite"` for form errors

#### 5. **Skip Links**
- ✅ Skip to main content link implemented
- ✅ Visually hidden but keyboard accessible

#### 6. **Font Legibility**
- ✅ Minimum 12px font size enforced globally
- ✅ Responsive scaling (body-xs, body-sm, body-base)

---

## 🔍 Areas for Improvement

### **1. Form Validation**
**Current State:** Basic error messages  
**Recommendation:** Add real-time validation announcements

```tsx
// Example improvement for ContactForm
<div role="status" aria-live="polite" className="sr-only">
  {error && `Error: ${error}`}
</div>
```

### **2. Loading States**
**Current State:** "Submitting..." text changes  
**Recommendation:** Add `aria-busy` and live region announcements

```tsx
<form aria-busy={isSubmitting}>
  {isSubmitting && (
    <div role="status" aria-live="polite" className="sr-only">
      Submitting your application, please wait
    </div>
  )}
</form>
```

### **3. PilotCard Links**
**Current State:** Nested interactive elements (Link wrapper + role="button" div)  
**Issue:** Can cause keyboard navigation confusion  
**Fix:** Remove the inner role="button" div since the Link already handles interaction

```tsx
// Remove this from PilotCard.tsx (line 110-122)
<div role="button" ...>
  View case study →
</div>

// Replace with simple div (Link handles interaction)
<div className="...">
  View case study →
</div>
```

### **4. Carousel Navigation**
**Current State:** Mouse/touch interaction only  
**Recommendation:** Add keyboard controls (Arrow keys, Home, End)

---

## 🧪 Manual Testing Checklist

### **Keyboard Navigation (Tab, Shift+Tab, Enter, Space, Escape)**

#### **Desktop Navigation**
- [ ] **Tab through header navigation**
  - Skip link appears and works (Tab → Enter)
  - Logo receives focus with visible ring
  - "home", "lab", "2026 snapshot" links are reachable
  - Dropdown menus (Work, Solutions) open with Enter/Space
  - Within dropdowns, Tab moves to submenu items
  - Escape closes dropdowns and returns focus to trigger
  - "Book Intro" CTA is reachable and activates with Enter

#### **Mobile Menu**
- [ ] **Hamburger menu button** (≥44×44px touch target)
  - Opens menu with Enter/Space
  - Shows `aria-expanded="true"` when open
- [ ] **Menu panel focus trap**
  - Tab/Shift+Tab stays within menu
  - All links are reachable
  - Escape closes menu and returns focus to hamburger button
- [ ] **Menu links** (all ≥44×44px)
  - Home, lab, 2026 snapshot, Work section, Solutions section
  - "Book Intro" CTA at bottom

#### **Forms**
- [ ] **ContactForm** (`/`)
  - Tab through: Name → Email → Project Type → Message → Submit
  - Error messages announced when validation fails
  - Focus moves to first error field
  - Submit with Enter key when focused on button

- [ ] **PilotApplicationForm** (`/solutions/future-proofing`)
  - Tab to email input
  - Tab to "Apply for 2025-2026" button
  - Hidden label is read by screen readers
  - Error states work with keyboard-only interaction

#### **Cards & Interactive Elements**
- [ ] **PilotCard** (`/` → #builds section)
  - Entire card is keyboard focusable (Link wrapper)
  - Enter/Space activates navigation to case study
  - Focus ring visible on entire card
  - No double-activation issue (nested button removed)

- [ ] **Collapsible sections** (e.g., Organization Types dropdowns)
  - Tab to button
  - Enter/Space toggles open/closed
  - `aria-expanded` reflects state

---

## 🔊 Screen Reader Testing

### **Recommended Tools**
- **Windows:** NVDA (free), JAWS
- **macOS:** VoiceOver (built-in: Cmd+F5)
- **Linux:** Orca
- **Mobile:** iOS VoiceOver, Android TalkBack

### **Testing Scenarios**

#### **1. Page Structure**
**Test:** Navigate by headings (H key in NVDA/JAWS)
- [ ] Heading hierarchy is logical (H1 → H2 → H3)
- [ ] No skipped heading levels
- [ ] Hero section announces H1 correctly

#### **2. Navigation Landmarks**
**Test:** Navigate by landmarks (D key in NVDA/JAWS)
- [ ] `<nav>` announces as "navigation" landmark
- [ ] `aria-label="Main navigation"` is read
- [ ] Mobile menu has `aria-label="Mobile navigation"`

#### **3. Skip Link**
**Test:** Tab once from page load
- [ ] "Skip to main content" is announced
- [ ] Pressing Enter jumps to main content
- [ ] Focus indicator is visible when focused

#### **4. Form Inputs**
**Test:** Tab through ContactForm
- [ ] Each input announces its label
- [ ] Required fields announce "required"
- [ ] Error messages are read immediately (aria-live)
- [ ] Placeholder text is not confused with actual input

**Example Expected Announcement:**
```
"Email address, required, edit text, blank"
(After error): "Error: Please enter a valid email address"
```

#### **5. Buttons & Links**
**Test:** Tab through navigation and CTAs
- [ ] Button purpose is clear ("Book a 30-minute introduction call, link")
- [ ] External links announce "opens in new tab"
- [ ] Icon-only buttons have descriptive labels

**Example Expected Announcement:**
```
"Book Intro, link, opens in new tab"
"Toggle mobile menu, button, collapsed"
```

#### **6. Dynamic Content**
**Test:** Submit a form
- [ ] Success/error toasts are announced (check Sonner implementation)
- [ ] Loading states are announced ("Submitting your application")
- [ ] Focus is managed correctly after submission

#### **7. Cards & Carousels**
**Test:** Navigate through PilotCard grid
- [ ] Each card announces as "Case study: [Title] - [Sector] pilot project"
- [ ] Heading level (h3) is correct
- [ ] "View case study" link purpose is clear

---

## 🤖 Automated Testing

### **Browser DevTools**
1. **Lighthouse Accessibility Audit**
   ```
   Chrome DevTools → Lighthouse → Accessibility → Generate Report
   ```
   - Target: Score ≥95
   - Check for color contrast, ARIA, and form labels

2. **axe DevTools Extension**
   - Install: [axe DevTools](https://www.deque.com/axe/devtools/)
   - Run scan on each page
   - Fix all Critical and Serious issues

### **Custom Audit Script**
Use the mobile audit script from `/scripts/mobile-audit-test.js`:
```javascript
// In browser console
// Run the script to check:
// - Touch target sizes
// - Font sizes
// - Focus indicators
// - Color contrast
```

---

## 📱 Mobile-Specific Testing

### **iOS VoiceOver**
1. Enable: Settings → Accessibility → VoiceOver
2. Gestures:
   - Swipe right: Next element
   - Swipe left: Previous element
   - Double-tap: Activate
   - Two-finger scrub: Go back

**Test:**
- [ ] All navigation items are swipe-accessible
- [ ] Buttons have descriptive labels
- [ ] Form inputs announce correctly
- [ ] Toast notifications are announced

### **Android TalkBack**
1. Enable: Settings → Accessibility → TalkBack
2. Gestures:
   - Swipe right: Next element
   - Swipe left: Previous element
   - Double-tap: Activate

**Test:**
- [ ] Mobile menu focus trap works
- [ ] Form validation errors are announced
- [ ] External links indicate new tab opening

---

## 🎯 WCAG 2.1 Level AA Quick Checklist

### **Perceivable**
- [ ] **1.4.3 Contrast:** Text has ≥4.5:1 contrast ratio (3:1 for large text)
- [ ] **1.4.4 Resize Text:** Text scales to 200% without loss of content
- [ ] **1.4.10 Reflow:** Content reflows at 320px width without horizontal scroll
- [ ] **1.4.11 Non-text Contrast:** UI components have ≥3:1 contrast

### **Operable**
- [ ] **2.1.1 Keyboard:** All functionality available via keyboard
- [ ] **2.1.2 No Keyboard Trap:** Focus can move away from all components
- [ ] **2.4.3 Focus Order:** Tab order is logical
- [ ] **2.4.7 Focus Visible:** Keyboard focus indicator is visible
- [ ] **2.5.5 Target Size:** Touch targets are ≥44×44px (Level AAA, but implemented)

### **Understandable**
- [ ] **3.2.1 On Focus:** Focus doesn't trigger unexpected context changes
- [ ] **3.2.2 On Input:** Input doesn't trigger unexpected context changes
- [ ] **3.3.1 Error Identification:** Errors are clearly described
- [ ] **3.3.2 Labels or Instructions:** Form fields have labels

### **Robust**
- [ ] **4.1.2 Name, Role, Value:** All UI components have correct ARIA
- [ ] **4.1.3 Status Messages:** Status updates are announced (aria-live)

---

## 🛠️ Debugging Tips

### **Focus Not Visible?**
Check if `.focus-ring` utility is applied:
```css
/* Should be in index.css */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
}
```

### **Screen Reader Not Announcing Changes?**
Ensure `aria-live` regions exist:
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

### **Touch Targets Too Small?**
Verify minimum sizes in Tailwind:
```tsx
className="min-h-[44px] min-w-[44px]"  // Mobile
className="min-h-[48px] min-w-[48px]"  // Primary CTAs
```

### **Dropdown Focus Lost?**
Check focus trap implementation:
```tsx
const dropdownRef = useFocusTrap(isOpen);
```

---

## 📊 Testing Record Template

Use this template to document your findings:

```markdown
## Test Session: [Date]
**Tester:** [Name]
**Tools:** [Browser, Screen Reader, Device]

### Keyboard Navigation
- ✅ Desktop nav: PASS
- ⚠️ Mobile menu: ISSUE - Focus escapes trap on [specific action]
- ✅ Forms: PASS

### Screen Reader
- ✅ VoiceOver: All labels announced correctly
- ❌ NVDA: Error messages not announced (missing aria-live)

### Mobile Touch
- ✅ All buttons ≥44px
- ⚠️ Carousel controls hard to tap (38px, needs resize)

### Issues Found
1. [Description] - Severity: [Critical/High/Medium/Low]
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
```

---

## 🚀 Quick Start Testing Workflow

1. **Run Lighthouse Audit** (5 min)
2. **Tab through all pages** (10 min)
3. **Test with VoiceOver/NVDA** (15 min)
4. **Mobile touch testing** (10 min)
5. **Document findings** (5 min)

**Total: ~45 minutes for comprehensive test**

---

## 📚 Additional Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Accessible Forms Guide](https://www.w3.org/WAI/tutorials/forms/)
- [Keyboard Navigation Best Practices](https://webaim.org/techniques/keyboard/)

---

**Last Updated:** 2025-01-XX  
**Next Review:** After next major feature release
