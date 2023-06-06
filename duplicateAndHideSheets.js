function duplicateAndHideSheets() {
  const templateSheetName = 'Template';
  const spreadsheetId = 'SPREADSHEET-ID';
  
  const ss = SpreadsheetApp.openById(spreadsheetId);
  const templateSheet = ss.getSheetByName(templateSheetName);
  
  // Calculate today's date
  const today = new Date();
  
  // Duplicate template for the next 14 days
  for (let i = 0; i < 14; i++) {
    let newDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1); // +1 to start from tomorrow
    let newDateString = Utilities.formatDate(newDate, Session.getScriptTimeZone(), "dd-MMMM");
    
    // Check if the sheet already exists
    if (!sheetExists(newDateString, ss)) {
      templateSheet.copyTo(ss).setName(newDateString);
    }
  }

  // Hide sheets older than two weeks
  const twoWeeksAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14);
  const allSheets = ss.getSheets();
  
  for (let i = 0; i < allSheets.length; i++) {
    let sheet = allSheets[i];
    if (sheet.getName() != templateSheetName) {
      let sheetDateParts = sheet.getName().split('-');
      let sheetDate = new Date(today.getFullYear(), getMonthNumber(sheetDateParts[1]) - 1, parseInt(sheetDateParts[0]));
      
      if (sheetDate < twoWeeksAgo) {
        sheet.hideSheet();
      }
    }
  }
}

// Helper function to get month number from month name
function getMonthNumber(monthName) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.indexOf(monthName) + 1;
}

// Helper function to check if a sheet exists
function sheetExists(sheetName, spreadsheet) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  return sheet != null;
}
