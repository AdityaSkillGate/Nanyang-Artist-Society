/**
 * NANYANG ARTISTS SOCIETY — GAS GOOGLE SHEETS REPOSITORY LAYER
 * Generic ORM & Data Access mapping Google Sheets tables to JavaScript object collections.
 */

var Repository = {
  /**
   * Retrieves all rows from a sheet as an array of objects
   * @param {string} sheetName
   * @return {Array<Object>}
   */
  getAll: function(sheetName) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) return [];

      var data = sheet.getDataRange().getValues();
      if (data.length <= 1) return [];

      var headers = data[0];
      var results = [];

      for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var item = {};
        var hasContent = false;

        for (var j = 0; j < headers.length; j++) {
          var header = headers[j];
          var val = row[j];
          if (val !== undefined && val !== null && val !== '') {
            hasContent = true;
          }
          item[header] = val;
        }

        if (hasContent) {
          results.push(item);
        }
      }

      return results;
    } catch (err) {
      console.error("[Repository] Error in getAll for " + sheetName + ":", err);
      return [];
    }
  },

  /**
   * Finds a single item by id from a sheet
   * @param {string} sheetName
   * @param {string} id
   * @return {Object|null}
   */
  getById: function(sheetName, id) {
    var items = this.getAll(sheetName);
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id || items[i].slug === id || items[i].certNumber === id) {
        return items[i];
      }
    }
    return null;
  },

  /**
   * Appends an object as a new row to the specified sheet
   * @param {string} sheetName
   * @param {Object} rowObject
   * @return {Object}
   */
  append: function(sheetName, rowObject) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        var initialHeaders = Object.keys(rowObject);
        sheet.appendRow(initialHeaders);
      }

      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var row = [];

      for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        var val = rowObject[header] !== undefined ? rowObject[header] : '';
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        row.push(val);
      }

      sheet.appendRow(row);
      return rowObject;
    } catch (err) {
      console.error("[Repository] Error in append for " + sheetName + ":", err);
      throw err;
    }
  },

  /**
   * Updates an existing row in a sheet matching id
   * @param {string} sheetName
   * @param {string} id
   * @param {Object} updatedFields
   * @return {boolean}
   */
  update: function(sheetName, id, updatedFields) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) return false;

      var data = sheet.getDataRange().getValues();
      var headers = data[0];
      var idIndex = headers.indexOf('id');
      if (idIndex === -1) idIndex = headers.indexOf('certNumber');
      if (idIndex === -1) return false;

      for (var i = 1; i < data.length; i++) {
        if (data[i][idIndex] === id) {
          for (var key in updatedFields) {
            var colIndex = headers.indexOf(key);
            if (colIndex !== -1) {
              sheet.getRange(i + 1, colIndex + 1).setValue(updatedFields[key]);
            }
          }
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error("[Repository] Error in update for " + sheetName + ":", err);
      return false;
    }
  }
};
