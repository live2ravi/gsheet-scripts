function onEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var value = range.getValue();
  
  // Check if the edited cell is in column B and its value is 'Option B'
  if(range.getColumn() == 2 && value == 'Option B') {
    // Merge cells from column B to the second last column in the row and align to center
    sheet.getRange(range.getRow(), 2, 1, sheet.getLastColumn() - 3).mergeAcross().setHorizontalAlignment('center');
  } else if(range.getColumn() == 2) {
    // Unmerge cells and reset alignment if the value is not 'Option B'
    sheet.getRange(range.getRow(), 2, 1, sheet.getLastColumn() - 3).breakApart().setHorizontalAlignment('left');
  }
}
