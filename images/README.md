# Images Directory

Place your heritage walk photos here. 

## Recommended Image Specifications

### Gallery Images
- **Dimensions**: 1200x800px (3:2 aspect ratio)
- **Format**: JPEG for photos, PNG for graphics with transparency
- **File Size**: Under 500KB each (compress using TinyPNG or similar)
- **Naming**: Use descriptive names with hyphens
  - `mubarak-mandi-palace-exterior.jpg`
  - `old-city-jammu-street-view.jpg`
  - `traditional-architecture-detail.jpg`

### Current Placeholder Files
Replace these placeholder references in `index.html`:
- `placeholder-1.jpg` → Your Mubarak Mandi photo
- `placeholder-2.jpg` → Your Old City Jammu photo  
- `placeholder-3.jpg` → Your traditional architecture photo

## Image Optimization Tips

1. **Compress images** before uploading (aim for under 500KB)
2. **Use descriptive filenames** for SEO benefits
3. **Update alt text** in HTML for accessibility
4. **Consider WebP format** for even better compression (optional)

## Adding New Images

1. Add image files to this directory
2. Update the gallery grid in `index.html`:
   ```html
   <div class="gallery-item">
       <img src="images/your-image.jpg" alt="Descriptive alt text" loading="lazy">
       <div class="gallery-overlay">
           <p>Image Caption</p>
       </div>
   </div>
   ```

The gallery will automatically handle the responsive layout and lazy loading.