# Ali - Scrap, Damaged & Junk Car Services Website

A professional, modern, SEO-optimized business website for Ali car services in Qatar.

## 🚀 Features

- **4 Main Pages**: Home, About Us, Contact, Blog
- **Admin Panel**: Password-protected dashboard for managing contact messages
- **Google Sheets Integration**: Contact form data stored in Google Sheets
- **Responsive Design**: Mobile-first, works on all devices
- **Modern Animations**: Smooth scroll-based animations
- **SEO Optimized**: Proper meta tags, semantic HTML
- **WhatsApp Integration**: Floating button on all pages

## 📁 Project Structure

```
├── index.html              # Home page
├── about.html              # About Us page
├── contact.html            # Contact page
├── blog.html               # Blog page
├── admin.html              # Admin panel (password protected)
├── css/
│   ├── style.css          # Main stylesheet
│   ├── animations.css     # Animation styles
│   └── admin.css          # Admin panel styles
├── js/
│   ├── main.js            # Main JavaScript (navigation, animations)
│   ├── sliders.js         # Team & testimonials sliders
│   ├── contact.js         # Contact form handler
│   ├── counters.js        # Animated counters
│   └── admin.js           # Admin panel functionality
├── google-apps-script.js   # Google Apps Script backend code
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Google Sheets Setup

1. Create a new Google Sheet
2. Name it "ContactMessages" (or update `SHEET_NAME` in the script)
3. The script will automatically create columns: Timestamp, Name, Email, Subject, Message, Status

### 2. Google Apps Script Setup

1. Open [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the contents of `google-apps-script.js` into the script editor
4. Update the configuration:
   - `SHEET_NAME`: Your Google Sheet name
   - `ADMIN_EMAIL`: Your email address for notifications
5. Save the project
6. Deploy as Web App:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - Copy the Web App URL

### 3. Update Website URLs

1. Open `js/contact.js`
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your Web App URL

3. Open `js/admin.js`
4. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your Web App URL

### 4. Admin Password

1. Open `js/admin.js`
2. Change `ADMIN_PASSWORD` to your secure password (default: `admin123`)

### 5. Contact Information

Update contact details in:
- `index.html` (footer)
- `about.html` (footer)
- `contact.html` (contact info panel)
- `blog.html` (footer)
- WhatsApp button links (all pages)

### 6. Deployment

#### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Deploy automatically

#### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts

## 📱 Pages Overview

### Home Page (`index.html`)
- Hero section with full-screen background
- Services grid (6 services)
- Team horizontal slider
- CTA section
- Client testimonials slider
- Footer

### About Us Page (`about.html`)
- SEO-optimized content
- Animated statistics counters
- Services overview
- Why choose us section
- Team grid
- Google Maps embed
- CTA section

### Contact Page (`contact.html`)
- Animated contact form
- Form validation
- Google Sheets integration
- Contact info panel with icons
- Success message display

### Blog Page (`blog.html`)
- 8 SEO-optimized blog posts
- Professional layout
- H1, H2, H3 structure
- Keywords: scrap car Qatar, damaged car Doha, etc.

### Admin Panel (`admin.html`)
- Password-protected login
- Dashboard with statistics
- Chart.js analytics
- Message table with pagination
- Search and filter functionality
- Mark as Done / Delete actions
- Email & WhatsApp reply buttons
- CSV export

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #f59e0b;
    /* ... */
}
```

### Images
Replace placeholder images:
- Hero background: Update in `index.html` hero section
- Team images: Update `src` in team cards
- Blog images: Update `src` in blog cards

### Content
- Update all text content in HTML files
- Modify services descriptions
- Update testimonials
- Edit blog post content

## 🔒 Security Notes

1. **Admin Password**: Change the default password in `js/admin.js`
2. **Google Apps Script**: Keep your Web App URL secure
3. **CORS**: The script uses `no-cors` mode for form submissions. For production, consider proper CORS setup.

## 📊 Google Sheets Structure

The contact form creates rows with:
- **Timestamp**: Auto-generated date/time
- **Name**: User's name
- **Email**: User's email
- **Subject**: Selected service
- **Message**: User's message
- **Status**: "New" (default) or "Done"

## 🐛 Troubleshooting

### Contact form not submitting
- Check Google Apps Script Web App URL is correct
- Verify Web App is deployed and accessible
- Check browser console for errors

### Admin panel not loading messages
- Verify Google Apps Script URL is correct
- Check sheet name matches in script
- Ensure Web App has proper permissions

### Email notifications not working
- Update `ADMIN_EMAIL` in Google Apps Script
- Check Google Apps Script execution logs
- Verify email quota not exceeded

## 📝 License

This project is ready for commercial use. Update contact information and customize as needed.

## 🆘 Support

For issues or questions:
1. Check Google Apps Script execution logs
2. Verify all URLs are correctly configured
3. Test form submission in browser console
4. Check network tab for API calls

---

**Built with**: HTML5, CSS3, Vanilla JavaScript, Google Apps Script
**Deployment Ready**: Netlify / Vercel compatible

