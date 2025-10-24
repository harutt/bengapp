# Bengi's 50th Birthday RSVP - Setup Guide

## Google Sheets Integration Setup

Follow these steps to connect your RSVP form to Google Sheets:

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Bengi's 50th Birthday RSVPs" (or any name you prefer)
4. In the first row, add these column headers:
   - `Name`
   - `Email`
   - `Phone`
   - `Guests`
   - `GuestDetails`
   - `Timestamp`

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Create a new row with the data
    var row = [
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.guestDetails,
      data.timestamp
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'RSVP recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
5. Name your project (e.g., "Birthday RSVP Handler")

### Step 3: Deploy the Script

1. Click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description**: "RSVP Form Handler" (or any description)
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Review permissions:
   - Click **Authorize access**
   - Select your Google account
   - Click **Advanced** > **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** - this is important!
   - It will look like: `https://script.google.com/macros/s/[LONG_ID]/exec`

### Step 4: Update Your Website

1. Open `script.js` in your website folder
2. Find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web App URL from Step 3
4. Save the file

### Step 5: Test Your Form

1. Open `index.html` in a web browser
2. Fill out the form with test data
3. Submit the form
4. Check your Google Sheet - you should see a new row with your test data!

---

## Hosting Your Website

To make your RSVP page accessible online, you can use one of these free hosting options:

### Option 1: GitHub Pages (Recommended)

1. Create a GitHub account if you don't have one
2. Create a new repository named `bengi-50th-rsvp`
3. Upload all your files (index.html, styles.css, script.js)
4. Go to **Settings** > **Pages**
5. Under "Source", select **main branch**
6. Your site will be live at: `https://[your-username].github.io/bengi-50th-rsvp`

### Option 2: Netlify

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up for a free account
3. Drag and drop your folder into Netlify
4. Your site will be live immediately with a random URL (you can customize it)

### Option 3: Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Sign up for a free account
3. Import your project or drag and drop your files
4. Your site will be deployed automatically

---

## Troubleshooting

### Form submissions aren't appearing in Google Sheets

1. Check that you've copied the correct Web App URL
2. Make sure you deployed the script as "Anyone" can access
3. Check the Apps Script execution logs:
   - Go to your Apps Script project
   - Click **Executions** (clock icon on the left)
   - Look for any errors

### "Google Script URL not configured" error

This means you haven't updated the `GOOGLE_SCRIPT_URL` in `script.js`. Follow Step 4 above.

### Need to make changes?

If you modify the Google Apps Script:
1. Make your changes in the script editor
2. Save the changes
3. Go to **Deploy** > **Manage deployments**
4. Click the pencil icon (✏️) to edit
5. Change the version to "New version"
6. Click **Deploy**
7. The URL stays the same - no need to update your website!

---

## Viewing RSVPs

Simply open your Google Sheet to see all RSVPs in real-time. You can:
- Sort by any column
- Filter guests
- Export to CSV or PDF
- Share with other organizers
- Create charts and summaries

---

## Support

If you have any issues, check:
1. Browser console for JavaScript errors (Press F12)
2. Apps Script execution logs for backend errors
3. Make sure all files are in the same folder
4. Test with a simple submission first

Happy planning! 🎉
