/**
 * NANYANG ARTISTS SOCIETY — GAS AUDIT LOGGER SERVICE
 * Records administrative and critical transactional events to the ActivityLogs sheet.
 */

var LoggerService = {
  /**
   * Logs an action to the ActivityLogs sheet
   * @param {string} user - User identifier or session name
   * @param {string} role - RBAC role
   * @param {string} action - Action description
   * @param {string} entity - Target entity or sheet
   * @param {string} ip - Client IP or origin
   */
  log: function(user, role, action, entity, ip) {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName("ActivityLogs");
      if (!sheet) {
        sheet = ss.insertSheet("ActivityLogs");
        sheet.appendRow(["Log ID", "Timestamp", "User", "Role", "Entity", "Action Description", "IP Address"]);
      }

      var logId = "LOG-" + Utilities.getUuid().slice(0, 8).toUpperCase();
      var timestamp = new Date().toISOString();

      sheet.appendRow([
        logId,
        timestamp,
        user || "Anonymous / Public",
        role || "Public",
        entity || "System",
        action || "No description",
        ip || "127.0.0.1"
      ]);
    } catch (err) {
      console.error("[LoggerService] Failed to record log:", err);
    }
  }
};
