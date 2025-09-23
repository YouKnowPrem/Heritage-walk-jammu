# Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up with GitHub
3. Click "New Project" and import your repository
4. Deploy automatically - your site will be live in minutes
5. Get a free `.vercel.app` domain or connect your custom domain

### Option 2: GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" and choose `main`
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 3: Netlify
1. Drag and drop your project folder to [netlify.com/drop](https://netlify.com/drop)
2. Or connect your GitHub repository for automatic deployments
3. Get a free `.netlify.app` domain

## Pre-Deployment Checklist

### 1. Update Content
- [ ] Replace placeholder images in `/images/` folder
- [ ] Update contact email and phone in `index.html`
- [ ] Add your Google Form link for photography competition
- [ ] Update sponsor names and details
- [ ] Verify map coordinates for Jammu location

### 2. Image Optimization
- [ ] Compress all images (use [TinyPNG](https://tinypng.com))
- [ ] Ensure images are under 500KB each
- [ ] Update alt text for all images
- [ ] Use descriptive filenames

### 3. SEO & Meta Tags
- [ ] Update page title and meta description
- [ ] Add Open Graph tags for social sharing (optional)
- [ ] Verify all internal links work
- [ ] Test on mobile devices

### 4. Form Configuration
- [ ] Set up contact form backend (see options below)
- [ ] Test photography competition form link
- [ ] Configure form validation

## Contact Form Setup Options

Since this is a static site, you'll need a form handling service:

### Option 1: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Update form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Netlify Forms (if using Netlify)
1. Add `netlify` attribute to form:
   ```html
   <form name="contact" netlify>
   ```

### Option 3: EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Follow their JavaScript integration guide
3. Update the form handling in `script.js`

## Custom Domain Setup

### For Vercel:
1. Go to your project dashboard
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed

### For GitHub Pages:
1. Add a `CNAME` file with your domain name
2. Update DNS records to point to GitHub Pages
3. Enable HTTPS in repository settings

## Performance Optimization

### Image Optimization
```bash
# Install imagemin-cli globally
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant

# Optimize images
imagemin images/*.jpg --out-dir=images --plugin=mozjpeg
imagemin images/*.png --out-dir=images --plugin=pngquant
```

### Testing
- Test on multiple devices and browsers
- Check loading speed with Google PageSpeed Insights
- Verify accessibility with WAVE or similar tools
- Test all forms and links

## Maintenance

### Regular Updates
- Update sponsor information as needed
- Add new gallery images regularly
- Monitor form submissions
- Update contact information if changed

### Analytics (Optional)
Add Google Analytics by including this before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Troubleshooting

### Common Issues
- **Images not loading**: Check file paths and names
- **Form not working**: Verify form action URL
- **Mobile layout issues**: Test responsive design
- **Slow loading**: Optimize and compress images

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages Guide](https://pages.github.com)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)