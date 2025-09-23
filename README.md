# Heritage Walks Jammu - Static Website

A minimal, heritage-inspired static website for Heritage Walks in Mubarak Mandi and Old City, Jammu.

## Features

- **Responsive Design**: Mobile-friendly with heritage-inspired color palette
- **Fast Loading**: Optimized images with lazy loading
- **SEO Optimized**: Proper meta tags, alt text, and semantic HTML
- **Accessible**: Good contrast ratios and keyboard navigation
- **Easy to Edit**: Simple HTML/CSS structure for easy content updates

## Sections

1. **Home**: Introduction to Heritage Walks and Symposium
2. **Gallery**: Photo gallery of Mubarak Mandi and Old City
3. **Photography Competition**: Info and Google Form link
4. **Sponsors**: Acknowledgment of local and national sponsors
5. **Contact**: Contact form, details, and map embed

## Quick Start

1. Replace placeholder images in the `images/` folder
2. Update contact information in `index.html`
3. Replace the Google Form link in the competition section
4. Update sponsor names in the sponsors section
5. Customize the map embed coordinates if needed

## Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Custom domain support available

## Image Guidelines

- **Gallery Images**: 1200x800px recommended, JPEG format
- **File Naming**: Use descriptive names (e.g., `mubarak-mandi-palace.jpg`)
- **Alt Text**: Update alt attributes in HTML for accessibility
- **Optimization**: Compress images before uploading (use tools like TinyPNG)

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D2B48C;
    --accent-color: #CD853F;
    /* ... */
}
```

### Content
- Main content: Edit `index.html`
- Styling: Modify `styles.css`
- Functionality: Update `script.js`

### Google Form Integration
Replace the form URL in the competition section:
```html
<a href="https://forms.google.com/your-actual-form-link" target="_blank">
```

### Map Customization
Update the iframe src with correct coordinates for Mubarak Mandi and Old City Jammu.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Performance

- Lazy loading for images
- Optimized CSS and JavaScript
- Minimal external dependencies
- Fast loading times

## License

This project is open source and available under the MIT License.