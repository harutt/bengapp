# Bengi's 50th Birthday RSVP Website

A beautiful, elegant RSVP web app for collecting guest responses for Bengi's 50th birthday party. Design inspired by Partiful with:
- Full-screen animated gradient background
- Two-column layout (event details + photo)
- Libre Baskerville serif typography
- Modal RSVP form
- Google Sheets integration

## Event Details

- **Date**: Friday, November 28
- **Time**: 10:00pm GMT
- **Location**: London, England
- **Host**: HARUT

## Features

- **Stunning Partiful-inspired design** with animated gradient background
- **Two-column layout**: Event details on left, photo + CTA on right
- **Modal RSVP form** that appears when clicking "Get on the list"
- **Collects guest information**:
  - Name
  - Email
  - Phone number with country code selector (55+ countries)
  - Number of guests (+1s)
  - Guest names (conditional field that appears when bringing guests)
- **Google Sheets integration** for easy RSVP management
- **Interactive elements**: Timezone buttons, remind me later, etc.
- **Location reveal system**: Full venue details appear after RSVP
- **Persistent state**: Location stays revealed using localStorage
- **Fully responsive** - adapts beautifully to mobile, tablet, and desktop
- **Success/error message handling** with automatic modal closing
- **Keyboard shortcuts** - Press ESC to close modal

## Files Included

- `index.html` - Main RSVP page
- `styles.css` - Styling and design
- `script.js` - Form handling and Google Sheets integration
- `SETUP.md` - Detailed setup instructions
- `README.md` - This file

## Quick Start

1. **Set up Google Sheets integration** (required):
   - Follow the detailed instructions in `SETUP.md`
   - This takes about 5-10 minutes

2. **Test locally**:
   - Open `index.html` in a web browser
   - Test the form submission

3. **Deploy online** (optional):
   - Use GitHub Pages, Netlify, or Vercel (free options)
   - Instructions in `SETUP.md`

## Customization

You can easily customize:

- **Event details**: Edit `index.html` to change date, time, location
- **Photo**: Replace `bengiunsal.jpg` with your own image (recommended 300x300px or larger)
- **Colors**: Modify the gradient in `styles.css` (line 11)
- **Typography**: Change the Google Fonts import in `styles.css` (line 1) to use a different font
- **Form fields**: Add/remove fields in `index.html` and update the JavaScript accordingly

## Need Help?

Check `SETUP.md` for:
- Step-by-step Google Sheets setup
- Troubleshooting guide
- Hosting options

---

Made with ❤️ for Bengi's 50th Birthday
