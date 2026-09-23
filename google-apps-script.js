/**
 * Dohar Car Repair — Contact Form Backend (Google Apps Script)
 * SECURITY NOTE: The previous version of this script exposed getMessages,
 * updateStatus and deleteMessage as unauthenticated GET/POST actions, and the
 * public admin.html/admin.js called them directly with a hardcoded password
 * that was visible to anyone who viewed the page source. Both admin.html and
 * admin.js have been removed from the website. This script now ONLY accepts
 * new form submissions (doPost) and writes them to the Sheet. Manage and
 * review leads directly in Google Sheets, where Google's own account-level
 * access control protects the data.
 *
 * Deploy this file (Extensions > Apps Script) and redeploy the Web App for
 * this security fix to take effect — updating the file in this repo alone
 * does not change the already-deployed script.
 */

const SHEET_NAME = 'Leads'; // update if your sheet tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Basic server-side validation
    const name = String(data.name || '').trim().slice(0, 100);
    const email = String(data.email || '').trim().slice(0, 150);
    const phone = String(data.phone || '').trim().slice(0, 30);
    const message = String(data.message || '').trim().slice(0, 2000);
    const service = String(data.service || '').trim().slice(0, 100);
    const honeypot = String(data.website || '').trim(); // hidden field, should stay empty

    if (honeypot) {
      // Likely a bot — silently accept without writing, so the bot thinks it worked
      return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!name || (!email && !phone)) {
      return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Name and at least one contact method are required.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status']);
    }
    sheet.appendRow([new Date(), name, email, phone, service, message, 'New']);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Server error, please try again or call/WhatsApp us directly.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // No public read access. Admin/lead review happens directly in the Google Sheet.
  return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Not available.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
