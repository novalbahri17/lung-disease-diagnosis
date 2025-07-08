# Public Assets

This directory contains static assets that are served directly by Next.js.

## Structure

```
public/
├── images/          # Application images
│   ├── logo.svg     # Application logo
│   ├── hero-bg.jpg  # Hero section background
│   └── samples/     # Sample X-ray images for demo
├── favicon.ico      # Browser favicon
├── manifest.json    # PWA manifest
└── robots.txt       # SEO robots file
```

## Usage

Files in this directory are served from the root URL. For example:
- `public/images/logo.svg` → `/images/logo.svg`
- `public/favicon.ico` → `/favicon.ico`

## Image Guidelines

### Formats
- Use WebP for photographs when possible
- Use SVG for icons and logos
- Use PNG for images with transparency
- Use JPEG for photographs without transparency

### Optimization
- Compress images before adding to public folder
- Use appropriate dimensions (avoid oversized images)
- Consider using Next.js Image component for automatic optimization

### Naming Convention
- Use kebab-case for file names
- Be descriptive: `chest-xray-sample.jpg` not `img1.jpg`
- Include dimensions in name if multiple sizes: `logo-32x32.png`

## Adding New Assets

1. Place files in appropriate subdirectories
2. Update this README if adding new categories
3. Ensure proper file permissions
4. Test loading in development before committing

## Sample X-ray Images

The `samples/` directory can contain demo X-ray images for:
- User interface examples
- Loading placeholders
- Demo/tutorial purposes

**Note**: Never include real patient data or identifiable medical information.
