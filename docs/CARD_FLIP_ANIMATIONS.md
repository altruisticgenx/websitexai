# Card Flip Animations

This document describes the 3D card flip animation feature implemented for the pilot project cards.

## Overview

The pilot project cards now feature an interactive 3D flip animation that reveals additional project details on the back side when clicked. This creates an engaging user experience while keeping the initial view compact and focused.

## Features

### Front Side (Default View)
- **Who it's for**: Target audience badge
- **Project title**: Clear, bold heading
- **Sector**: Category/industry
- **Problem**: Brief description of the challenge
- **Outcome**: Key metric or result
- **Time to demo**: Development timeline
- **Visual cue**: "Click to flip" indicator

### Back Side (Revealed on Click)
- **Key Features**: Up to 3 main features/capabilities
- **Tech Stack**: Technologies used (shows 4 + overflow indicator)
- **Full case study link**: Direct navigation to detailed page
- **Close button**: Return to front view

## Implementation Details

### Component Structure

```tsx
<div perspective="1000px">
  <motion.div rotateY={isFlipped ? 180 : 0}>
    {/* Front Face */}
    <article backfaceVisibility="hidden">
      {/* Front content */}
    </article>
    
    {/* Back Face */}
    <div backfaceVisibility="hidden" transform="rotateY(180deg)">
      {/* Back content */}
    </div>
  </motion.div>
</div>
```

### Animation Properties

- **Duration**: 0.6s spring animation
- **Stiffness**: 100 (smooth, natural feel)
- **Hover lift**: -8px vertical translation
- **3D Effects**: Maintained on both sides
- **Gradients**: Sector-specific colors preserved

### Interaction Methods

1. **Click/Tap**: Primary interaction - flips the card
2. **Close button**: Returns to front view
3. **View Case Study button**: Navigates to detail page (prevents flip)

## Usage

### In RecentBuilds Section

```tsx
<PilotCard
  id={project.id}
  title={project.title}
  sector={project.sector}
  whoFor={getSectorAudience(project.sector)}
  problem={getProjectProblem(project.id)}
  outcome={getProjectOutcome(project.id)}
  timeToDemo={getTimeToDemo(project.id)}
  tag={project.tag}
  technologies={getProjectTechnologies(project.id)}
  keyFeatures={getProjectKeyFeatures(project.id)}
/>
```

### Data Structure

#### Technologies Array
```typescript
const technologies = [
  "React",
  "TypeScript",
  "OpenAI GPT-4",
  "Python",
  "Supabase"
];
```

#### Key Features Array
```typescript
const keyFeatures = [
  "AI-powered lead scoring with GPT-4",
  "Automated follow-up sequences",
  "Real-time sentiment analysis",
  "Gmail & CRM integration"
];
```

## Visual Design

### Color Schemes by Sector

- **Education Nonprofit**: Blue gradients with blue glow
- **Founder-Backed Startup**: Emerald/teal gradients with emerald glow
- **Solo Founder**: Amber/orange gradients with amber glow
- **Climate & Energy**: Lime/green gradients with lime glow

### Typography

- **Front side**:
  - Title: 11-12px (bold)
  - Labels: 9px (semibold)
  - Body text: 9px (regular)
  - Badges: 8-9px

- **Back side**:
  - Title: 11-12px (bold)
  - Section headers: 9px (semibold)
  - Body text: 8px (regular)
  - Tech badges: 7px

### Spacing

- Card padding: 12px (0.75rem)
- Internal spacing: 8px (0.5rem)
- Gap between elements: 4-8px

## Accessibility

### Keyboard Navigation
- Cards are keyboard focusable
- Enter/Space to flip
- Tab to navigate between cards

### Screen Readers
- Semantic HTML structure
- ARIA labels on interactive elements
- Alt text for close button

### Touch Devices
- Large touch targets (minimum 44x44px for buttons)
- No hover-dependent functionality
- Click/tap works reliably

## Performance Considerations

### Optimizations

1. **CSS 3D transforms**: Hardware-accelerated
2. **backface-visibility: hidden**: Prevents rendering of hidden face
3. **Spring animation**: Natural, physics-based motion
4. **Memoization**: Component prevents unnecessary re-renders
5. **Lazy state**: Flip state stored locally, no global state needed

### Metrics

- **Animation FPS**: 60fps on modern devices
- **Initial render**: No performance impact (both faces rendered once)
- **Memory**: Minimal overhead (local state only)
- **Bundle size**: No additional dependencies

## Responsive Behavior

### Mobile (< 640px)
- 2 columns grid
- Smaller text sizes maintained
- Touch-optimized interactions
- Full flip functionality

### Tablet (640px - 1024px)
- 2 columns grid
- Slightly larger text
- Hover effects on supported devices

### Desktop (> 1024px)
- 4 columns grid
- Full hover effects
- Optimal card size for readability

## Customization

### Adding New Projects

1. Add project data to the database/data source
2. Define technologies in `getProjectTechnologies()`
3. Define key features in `getProjectKeyFeatures()`
4. Ensure sector has color scheme defined

### Modifying Flip Duration

```tsx
// In PilotCard.tsx
animate={{ rotateY: isFlipped ? 180 : 0 }}
transition={{ 
  duration: 0.6, // Change this value
  type: "spring", 
  stiffness: 100 
}}
```

### Changing Flip Trigger

Currently: Click
Options:
- Hover: Replace `onClick` with `onMouseEnter`/`onMouseLeave`
- Long press: Add touch event handlers
- Button only: Add dedicated flip button

## Browser Support

- **Chrome/Edge**: Full support (88+)
- **Firefox**: Full support (78+)
- **Safari**: Full support (14+)
- **Mobile browsers**: Full support on iOS 14+ and Android Chrome 88+

### Fallbacks

If 3D transforms are not supported:
- Cards remain functional
- Flip reveals back content without 3D effect
- All functionality preserved

## Testing

### Manual Testing Checklist

- [ ] Click card to flip
- [ ] Click close button to return
- [ ] Click "View Full Case Study" navigates correctly
- [ ] Hover lift works on front and back
- [ ] All text is readable on both sides
- [ ] Colors match sector on both sides
- [ ] Animations are smooth (60fps)
- [ ] Works on mobile touch devices
- [ ] Keyboard navigation functions
- [ ] Screen reader announces content

### Automated Tests

```typescript
// Example test
test('card flips on click', () => {
  render(<PilotCard {...mockProps} />);
  const card = screen.getByRole('button');
  fireEvent.click(card);
  expect(screen.getByText('Key Features')).toBeVisible();
});
```

## Future Enhancements

- [ ] Add flip animation sound effect (optional)
- [ ] Implement double-click to navigate
- [ ] Add swipe gesture for mobile flip
- [ ] Include mini preview/thumbnail on back
- [ ] Add "Share" button on back side
- [ ] Implement flip on hover (optional setting)
- [ ] Add analytics tracking for flip interactions

## Troubleshooting

### Card doesn't flip
- Check `isFlipped` state is updating
- Verify `onClick` handler is attached
- Ensure CSS transform properties are applied

### Content misaligned on back
- Check `backfaceVisibility: hidden`
- Verify `transform: rotateY(180deg)` on back face
- Ensure both faces have same dimensions

### Animation stutters
- Check for unnecessary re-renders
- Verify hardware acceleration is active
- Reduce complexity during animation

### Touch not working on mobile
- Ensure `cursor: pointer` is set
- Check touch event propagation
- Verify no conflicting touch handlers

## Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [CSS 3D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [React Performance](https://react.dev/learn/render-and-commit)
