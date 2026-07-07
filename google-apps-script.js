// Google Apps Script for collecting contact form submissions into a Google Sheet
// 1. Open Google Apps Script: https://script.google.com/
// 2. Create a new project and paste this code.
// 3. Replace SPREADSHEET_ID and SHEET_NAME with your sheet details.
// 4. Deploy as a Web App and copy the web app URL into VITE_CONTACT_FORM_ENDPOINT.

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Sheet1';

function doGet() {
  return ContentService.createTextOutput('Contact form endpoint is running.').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const payload = e.parameter || {};
    const name = payload.name || '';
    const email = payload.email || '';
    const message = payload.message || '';
    const subject = payload._subject || '';

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];

    const lastColumn = Math.max(4, sheet.getLastColumn());
    const headers = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];

    if (headers.every((header) => !header)) {
      sheet.getRange(1, 1, 1, 4).setValues([['Timestamp', 'your name', 'Your Email', 'your question']]);
    }

    const normalizedHeaders = headers.map((header) => String(header).toLowerCase());
    const timestampIndex = normalizedHeaders.findIndex((header) => header.includes('timestamp') || header.includes('date'));
    const nameIndex = normalizedHeaders.findIndex((header) => header.includes('name'));
    const emailIndex = normalizedHeaders.findIndex((header) => header.includes('email'));
    const messageIndex = normalizedHeaders.findIndex((header) => header.includes('question') || header.includes('message') || header.includes('comment'));

    const row = Array.from({ length: Math.max(lastColumn, 4) }, () => '');
    row[0] = new Date().toISOString();
    if (nameIndex >= 0) row[nameIndex] = name;
    if (emailIndex >= 0) row[emailIndex] = email;
    if (messageIndex >= 0) row[messageIndex] = message;
    if (timestampIndex >= 0) row[timestampIndex] = new Date().toISOString();

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
