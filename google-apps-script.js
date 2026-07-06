// ============================================
// Google Apps Script Backend
// Deploy this as a Web App in Google Apps Script
// ============================================

// Configuration
const SHEET_NAME = 'ContactMessages'; // Name of your Google Sheet
const ADMIN_EMAIL = 'your-email@example.com'; // Change to your admin email

/**
 * Main doGet handler for fetching messages and admin actions
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getMessages') {
      return getMessages();
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Main doPost handler for form submissions and admin actions
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'updateStatus') {
      return updateStatus(data);
    } else if (action === 'deleteMessage') {
      return deleteMessage(data);
    } else if (!action) {
      // Regular form submission
      return handleFormSubmission(data);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid action'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle form submission
 */
function handleFormSubmission(data) {
  const sheet = getOrCreateSheet();
  
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status']);
  }
  
  // Add new row
  const timestamp = new Date();
  const row = [
    timestamp,
    data.name || '',
    data.email || '',
    data.phone || '',
    data.subject || '',
    data.message || '',
    'New'
  ];
  
  sheet.appendRow(row);
  
  // Send email notification
  sendEmailNotification(data, timestamp);
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Message saved successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get all messages from the sheet
 */
function getMessages() {
  const sheet = getOrCreateSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      messages: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const messages = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    messages.push({
      timestamp: row[0] ? new Date(row[0]).toISOString() : '',
      name: row[1] || '',
      email: row[2] || '',
      phone: row[3] || '',
      subject: row[4] || '',
      message: row[5] || '',
      status: row[6] || 'New'
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    messages: messages
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Update message status
 */
function updateStatus(data) {
  const sheet = getOrCreateSheet();
  const dataRange = sheet.getDataRange().getValues();
  
  // Find the row with matching timestamp
  for (let i = 1; i < dataRange.length; i++) {
    const rowTimestamp = dataRange[i][0];
    if (rowTimestamp && new Date(rowTimestamp).toISOString() === data.timestamp) {
      // Update status in column 6 (index 5)
      sheet.getRange(i + 1, 7).setValue(data.status);
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Status updated successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Delete a message
 */
function deleteMessage(data) {
  const sheet = getOrCreateSheet();
  const dataRange = sheet.getDataRange().getValues();
  
  // Find the row with matching timestamp
  for (let i = 1; i < dataRange.length; i++) {
    const rowTimestamp = dataRange[i][0];
    if (rowTimestamp && new Date(rowTimestamp).toISOString() === data.timestamp) {
      // Delete the row
      sheet.deleteRow(i + 1);
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Message deleted successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get or create the sheet
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status']);
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 7);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
  
  return sheet;
}

/**
 * Send email notification to admin
 */
function sendEmailNotification(data, timestamp) {
  try {
    const subject = `New Contact Form Submission - ${data.subject || 'No Subject'}`;
    const body = `
New contact form submission received:

Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Phone: ${data.phone || 'N/A'}
Subject: ${data.subject || 'N/A'}
Message: ${data.message || 'N/A'}
Timestamp: ${timestamp}

---
This is an automated email from Ali Car Services contact form.
    `;
    
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't fail the request if email fails
  }
}

/**
 * Test function - can be run manually to test the script
 */
function testScript() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

