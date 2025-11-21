# Image Optimization Guide

This document outlines best practices for image handling and lazy loading in the AltruisticX AI project.

## Components

### LazyImage Component

The primary component for loading images with lazy loading, intersection observer, and placeholder support.

#### Basic Usage

```tsx
import { LazyImage } from '@/components/LazyImage';

<LazyImage
  src="/path/to/image.jpg"
  alt="Description of image"
  className="w-full h-auto"
/>
```

#### With Placeholder

```tsx
<LazyImage
  src="/path/to/high-res.jpg"
  placeholderSrc="/path/to/thumbnail.jpg"
  alt="Description"
  aspectRatio="video"
/>
```

#### With Aspect Ratio

```tsx
<LazyImage
  src="/path/to/image.jpg"
  alt="Square image"
  aspectRatio="square" // Options: square, video, portrait, wide
/>
```

#### With Load Callback

```tsx
<LazyImage
  src="/path/to/image.jpg"
  alt="Image"
  onLoadComplete={() => console.log('Image loaded!')}
/>
```

### Background Image Hook

For components that need lazy-loaded background images:

```tsx
import { useLazyBackgroundImage } from '@/components/LazyImage';

function HeroSection() {
  const { elementRef, loadedImageUrl, isLoading } = useLazyBackgroundImage(
    '/path/to/hero-bg.jpg'
  );
  
  return (
    <section
      ref={elementRef}
      style={{
        backgroundImage: loadedImageUrl ? `url(${loadedImageUrl})` : 'none',
        backgroundColor: isLoading ? '#1e293b' : 'transparent',
      }}
    >
      {/* Content */}
    </section>
  );
}
```

### OptimizedIcon Component

For rendering Lucide icons with performance optimizations:

```tsx
import { Mail } from 'lucide-react';
import { OptimizedIcon } from '@/components/OptimizedIcon';

<OptimizedIcon
  icon={Mail}
  size={20}
  strokeWidth={2}
  aria-label="Email"
  className="text-primary"
/>
```

## Utilities

### Image Optimization Utilities

Located in `src/utils/imageOptimization.ts`:

#### Preload Critical Images

```tsx
import { preloadImage, preloadImages } from '@/utils/imageOptimization';

// Single image
await preloadImage('/hero-image.jpg');

// Multiple images
await preloadImages([
  '/logo.svg',
  '/hero-image.jpg',
  '/feature-1.png'
]);
```

#### Generate Placeholder

```tsx
import { generatePlaceholderDataUrl } from '@/utils/imageOptimization';

const placeholder = generatePlaceholderDataUrl(100, 100, '#1e293b');
// Use as placeholder in LazyImage
```

#### Check Connection Quality

```tsx
import { shouldLazyLoad } from '@/utils/imageOptimization';

if (shouldLazyLoad()) {
  // Use LazyImage
} else {
  // Load images immediately (slow connection)
}
```

## Best Practices

### 1. Always Provide Alt Text

```tsx
// ✅ Good
<LazyImage src="/product.jpg" alt="Wireless headphones in black color" />

// ❌ Bad
<LazyImage src="/product.jpg" alt="" />
```

### 2. Use Appropriate Aspect Ratios

```tsx
// For hero sections
<LazyImage aspectRatio="wide" src="/hero.jpg" alt="Hero" />

// For profile pictures
<LazyImage aspectRatio="square" src="/avatar.jpg" alt="User avatar" />

// For blog post thumbnails
<LazyImage aspectRatio="video" src="/post.jpg" alt="Post thumbnail" />
```

### 3. Optimize Image Sizes

- Use modern formats (WebP, AVIF) when possible
- Serve appropriately sized images for different viewports
- Compress images before uploading (aim for <100KB for most images)

### 4. Preload Critical Images

For above-the-fold content:

```tsx
useEffect(() => {
  preloadImages([
    '/hero-background.jpg',
    '/logo.svg',
    '/cta-image.jpg'
  ]);
}, []);
```

### 5. Monitor Performance

```tsx
import { trackImageLoad } from '@/utils/imageOptimization';

<LazyImage
  src="/large-image.jpg"
  alt="Large image"
  onLoadComplete={() => {
    const loadTime = performance.now();
    trackImageLoad('/large-image.jpg', loadTime);
  }}
/>
```

## Performance Checklist

- [ ] All images use `LazyImage` component (except critical above-the-fold images)
- [ ] Alt text provided for all images
- [ ] Critical images are preloaded
- [ ] Appropriate aspect ratios set
- [ ] Images optimized and compressed
- [ ] Modern image formats used (WebP/AVIF with fallbacks)
- [ ] Loading states handled gracefully
- [ ] Error states handled (failed image loads)

## Testing

Test lazy loading behavior:

1. Open Chrome DevTools → Network tab
2. Throttle to "Fast 3G" or "Slow 3G"
3. Scroll page slowly
4. Verify images load only when entering viewport
5. Check that placeholders display correctly
6. Verify smooth transition from placeholder to full image

## Browser Support

- **LazyImage**: Works in all modern browsers with IntersectionObserver
- **Native lazy loading**: Supported in Chrome 76+, Firefox 75+, Safari 15.4+
- **Fallback**: For older browsers, all images load normally

## Migration Guide

### Replacing Standard Images

Before:
```tsx
<img src="/image.jpg" alt="Description" className="w-full" />
```

After:
```tsx
<LazyImage
  src="/image.jpg"
  alt="Description"
  className="w-full"
/>
```

### Replacing Background Images

Before:
```tsx
<div style={{ backgroundImage: 'url(/bg.jpg)' }}>
  Content
</div>
```

After:
```tsx
function Component() {
  const { elementRef, loadedImageUrl } = useLazyBackgroundImage('/bg.jpg');
  
  return (
    <div
      ref={elementRef}
      style={{ backgroundImage: loadedImageUrl ? `url(${loadedImageUrl})` : 'none' }}
    >
      Content
    </div>
  );
}
```

## Future Enhancements

- [ ] Add support for responsive images (srcset)
- [ ] Implement blur-up technique with low-quality placeholders
- [ ] Add image CDN integration
- [ ] Progressive image loading
- [ ] Automatic format detection and conversion
