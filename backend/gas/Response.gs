/**
 * NANYANG ARTISTS SOCIETY — GAS STANDARD JSON RESPONSE FORMATTER
 * Consistent JSON envelope across all public and administrative API routes.
 */

var Response = {
  /**
   * Formats a successful API response
   * @param {*} data - Response payload
   * @param {string} message - Optional user-facing message
   * @param {string} code - Optional status code
   * @return {GoogleAppsScript.Content.TextOutput}
   */
  success: function(data, message, code) {
    var payload = {
      success: true,
      data: data || null,
      error: null,
      code: code || "OK_200",
      message: message || "Operation completed successfully",
      timestamp: new Date().toISOString()
    };

    return ContentService.createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON);
  },

  /**
   * Formats an error API response
   * @param {string} errorMessage - Error description
   * @param {string} code - Error code identifier
   * @param {*} details - Optional error details
   * @return {GoogleAppsScript.Content.TextOutput}
   */
  error: function(errorMessage, code, details) {
    var payload = {
      success: false,
      data: null,
      error: {
        message: errorMessage || "An unexpected error occurred",
        details: details || null
      },
      code: code || "ERR_500",
      message: errorMessage || "An error occurred during request processing",
      timestamp: new Date().toISOString()
    };

    return ContentService.createTextOutput(JSON.stringify(payload))
      .setMimeType(ContentService.MimeType.JSON);
  }
};
