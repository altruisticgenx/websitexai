/**
 * Mobile Performance Audit Test Script
 * Paste this into your browser console to run automated checks
 * 
 * Usage:
 * 1. Open DevTools (F12)
 * 2. Navigate to Console tab
 * 3. Paste this entire script
 * 4. Press Enter
 * 5. Review results
 */

console.clear();
console.log('%c🔍 Mobile Performance Audit', 'font-size: 24px; font-weight: bold; color: #10b981;');
console.log('%c─────────────────────────────────────', 'color: #6b7280;');

const results = {
  touchTargets: { pass: [], fail: [] },
  fontSizes: { pass: [], fail: [] },
  focusStates: { pass: [], fail: [] },
  colorContrast: { pass: [], fail: [] }
};

// ============================================
// TEST 1: Touch Target Size (44×44px minimum)
// ============================================
console.log('\n%c📏 TEST 1: Touch Target Sizes', 'font-size: 16px; font-weight: bold; color: #3b82f6;');

const interactiveElements = document.querySelectorAll(
  'button, a[href], [role="button"], input[type="submit"], input[type="button"], [tabindex]:not([tabindex="-1"])'
);

interactiveElements.forEach((el, index) => {
  const rect = el.getBoundingClientRect();
  const id = el.id || el.className || `element-${index}`;
  
  if (rect.width >= 44 && rect.height >= 44) {
    results.touchTargets.pass.push({ element: el, width: rect.width, height: rect.height, id });
  } else {
    results.touchTargets.fail.push({ element: el, width: rect.width, height: rect.height, id });
  }
});

console.log(`✅ Pass: ${results.touchTargets.pass.length} elements`);
console.log(`❌ Fail: ${results.touchTargets.fail.length} elements`);

if (results.touchTargets.fail.length > 0) {
  console.group('%c⚠️ Touch targets smaller than 44×44px:', 'color: #ef4444; font-weight: bold;');
  results.touchTargets.fail.forEach(({ element, width, height, id }) => {
    console.log(`  • ${id}: ${Math.round(width)}×${Math.round(height)}px`, element);
  });
  console.groupEnd();
}

// ============================================
// TEST 2: Font Size Legibility (12px minimum)
// ============================================
console.log('\n%c🔤 TEST 2: Font Size Legibility', 'font-size: 16px; font-weight: bold; color: #8b5cf6;');

const textElements = [...document.querySelectorAll('p, span, a, button, li, td, th, label, input, textarea')]
  .filter(el => el.textContent.trim().length > 0 && window.getComputedStyle(el).display !== 'none');

textElements.forEach((el, index) => {
  const fontSize = parseFloat(window.getComputedStyle(el).fontSize);
  const text = el.textContent.trim().substring(0, 50);
  const id = el.id || el.className || `text-${index}`;
  
  if (fontSize >= 12) {
    results.fontSizes.pass.push({ element: el, fontSize, text, id });
  } else {
    results.fontSizes.fail.push({ element: el, fontSize, text, id });
  }
});

console.log(`✅ Pass: ${results.fontSizes.pass.length} elements`);
console.log(`❌ Fail: ${results.fontSizes.fail.length} elements`);

if (results.fontSizes.fail.length > 0) {
  console.group('%c⚠️ Text smaller than 12px:', 'color: #ef4444; font-weight: bold;');
  results.fontSizes.fail.slice(0, 20).forEach(({ element, fontSize, text, id }) => {
    console.log(`  • ${id}: ${fontSize.toFixed(1)}px - "${text}..."`, element);
  });
  if (results.fontSizes.fail.length > 20) {
    console.log(`  ... and ${results.fontSizes.fail.length - 20} more`);
  }
  console.groupEnd();
}

// ============================================
// TEST 3: Focus Indicators
// ============================================
console.log('\n%c🎯 TEST 3: Focus Indicators', 'font-size: 16px; font-weight: bold; color: #f59e0b;');

const focusableElements = document.querySelectorAll(
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
);

focusableElements.forEach((el, index) => {
  const id = el.id || el.className || `focusable-${index}`;
  
  // Simulate focus
  el.focus();
  const styles = window.getComputedStyle(el);
  const outline = styles.outline;
  const outlineWidth = styles.outlineWidth;
  const boxShadow = styles.boxShadow;
  const ringVisible = boxShadow && boxShadow !== 'none' && boxShadow.includes('rgb');
  const outlineVisible = outline && outline !== 'none' && outlineWidth !== '0px';
  
  if (ringVisible || outlineVisible) {
    results.focusStates.pass.push({ element: el, id });
  } else {
    results.focusStates.fail.push({ element: el, id });
  }
  
  // Remove focus
  el.blur();
});

console.log(`✅ Pass: ${results.focusStates.pass.length} elements`);
console.log(`❌ Fail: ${results.focusStates.fail.length} elements`);

if (results.focusStates.fail.length > 0) {
  console.group('%c⚠️ Interactive elements without visible focus:', 'color: #ef4444; font-weight: bold;');
  results.focusStates.fail.slice(0, 15).forEach(({ element, id }) => {
    console.log(`  • ${id}`, element);
  });
  if (results.focusStates.fail.length > 15) {
    console.log(`  ... and ${results.focusStates.fail.length - 15} more`);
  }
  console.groupEnd();
}

// ============================================
// TEST 4: Horizontal Scroll Check
// ============================================
console.log('\n%c↔️ TEST 4: Horizontal Scroll', 'font-size: 16px; font-weight: bold; color: #ec4899;');

const hasHorizontalScroll = document.body.scrollWidth > window.innerWidth;
const overflowingElements = [...document.querySelectorAll('*')].filter(el => {
  return el.scrollWidth > el.clientWidth && 
         window.getComputedStyle(el).overflowX === 'visible' &&
         el.scrollWidth - el.clientWidth > 1; // Allow 1px tolerance
});

if (hasHorizontalScroll) {
  console.log(`❌ Page has horizontal scroll`);
  console.log(`   Body width: ${document.body.scrollWidth}px`);
  console.log(`   Viewport: ${window.innerWidth}px`);
  console.log(`   Overflow: ${document.body.scrollWidth - window.innerWidth}px`);
} else {
  console.log(`✅ No horizontal scroll detected`);
}

if (overflowingElements.length > 0) {
  console.group('%c⚠️ Elements causing overflow:', 'color: #ef4444; font-weight: bold;');
  overflowingElements.slice(0, 10).forEach(el => {
    const id = el.id || el.className || el.tagName;
    console.log(`  • ${id}: ${el.scrollWidth}px (viewport: ${el.clientWidth}px)`, el);
  });
  console.groupEnd();
}

// ============================================
// TEST 5: Color Contrast (Basic Check)
// ============================================
console.log('\n%c🎨 TEST 5: Color Contrast (Simplified)', 'font-size: 16px; font-weight: bold; color: #14b8a6;');

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(...rgb1);
  const l2 = getLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseRGB(rgbString) {
  const match = rgbString.match(/\d+/g);
  return match ? match.map(Number) : [0, 0, 0];
}

const contrastElements = [...document.querySelectorAll('p, a, button, span, h1, h2, h3, h4, h5, h6')]
  .filter(el => el.textContent.trim().length > 0);

contrastElements.slice(0, 50).forEach((el, index) => {
  const styles = window.getComputedStyle(el);
  const color = parseRGB(styles.color);
  const bgColor = parseRGB(styles.backgroundColor);
  const fontSize = parseFloat(styles.fontSize);
  const fontWeight = parseFloat(styles.fontWeight);
  
  const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
  const requiredRatio = isLargeText ? 3 : 4.5;
  const ratio = getContrastRatio(color, bgColor);
  const id = el.id || el.className || `contrast-${index}`;
  
  if (ratio >= requiredRatio || bgColor.every(c => c === 0)) {
    results.colorContrast.pass.push({ element: el, ratio, id });
  } else {
    results.colorContrast.fail.push({ element: el, ratio, required: requiredRatio, id });
  }
});

console.log(`✅ Pass: ${results.colorContrast.pass.length} elements`);
console.log(`❌ Fail: ${results.colorContrast.fail.length} elements`);

if (results.colorContrast.fail.length > 0) {
  console.group('%c⚠️ Insufficient contrast:', 'color: #ef4444; font-weight: bold;');
  results.colorContrast.fail.slice(0, 10).forEach(({ element, ratio, required, id }) => {
    console.log(`  • ${id}: ${ratio.toFixed(2)}:1 (needs ${required}:1)`, element);
  });
  console.groupEnd();
}

// ============================================
// SUMMARY REPORT
// ============================================
console.log('\n%c📊 SUMMARY REPORT', 'font-size: 20px; font-weight: bold; color: #10b981; background: #064e3b; padding: 8px 16px; border-radius: 4px;');
console.log('%c─────────────────────────────────────', 'color: #6b7280;');

const totalTests = 5;
const passedTests = [
  results.touchTargets.fail.length === 0,
  results.fontSizes.fail.length === 0,
  results.focusStates.fail.length === 0,
  !hasHorizontalScroll && overflowingElements.length === 0,
  results.colorContrast.fail.length === 0
].filter(Boolean).length;

const score = Math.round((passedTests / totalTests) * 100);
const scoreColor = score >= 90 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444';

console.log(`%c🎯 Overall Score: ${score}/100`, `font-size: 18px; font-weight: bold; color: ${scoreColor};`);
console.log('\n');
console.log(`${results.touchTargets.fail.length === 0 ? '✅' : '❌'} Touch Targets: ${results.touchTargets.fail.length} issues`);
console.log(`${results.fontSizes.fail.length === 0 ? '✅' : '❌'} Font Legibility: ${results.fontSizes.fail.length} issues`);
console.log(`${results.focusStates.fail.length === 0 ? '✅' : '❌'} Focus Indicators: ${results.focusStates.fail.length} issues`);
console.log(`${!hasHorizontalScroll && overflowingElements.length === 0 ? '✅' : '❌'} Horizontal Scroll: ${overflowingElements.length} issues`);
console.log(`${results.colorContrast.fail.length === 0 ? '✅' : '❌'} Color Contrast: ${results.colorContrast.fail.length} issues`);

console.log('\n%c💡 Recommendation:', 'font-weight: bold; color: #3b82f6;');
if (score >= 90) {
  console.log('Excellent! Minor improvements may still be possible.');
} else if (score >= 70) {
  console.log('Good foundation. Address the failing tests to improve mobile UX.');
} else {
  console.log('Needs improvement. Review MOBILE_PERFORMANCE_AUDIT.md for detailed fixes.');
}

console.log('\n%c📖 See MOBILE_PERFORMANCE_AUDIT.md for detailed recommendations', 'color: #6b7280; font-style: italic;');
console.log('%c─────────────────────────────────────', 'color: #6b7280;');

// Export results for further analysis
window.mobileAuditResults = results;
console.log('\n%c💾 Results saved to window.mobileAuditResults', 'color: #8b5cf6;');
