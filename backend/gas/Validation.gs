/**
 * NANYANG ARTISTS SOCIETY — GAS INPUT VALIDATION & ANTI-SPAM SERVICE
 * Sanitizes input data, enforces required fields, checks honeypots, and verifies formats.
 */

var Validation = {
  /**
   * Validates an email address
   * @param {string} email
   * @return {boolean}
   */
  isValidEmail: function(email) {
    if (!email || typeof email !== 'string') return false;
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  },

  /**
   * Validates Singapore phone numbers (+65 or 8 digits)
   * @param {string} phone
   * @return {boolean}
   */
  isValidPhone: function(phone) {
    if (!phone || typeof phone !== 'string') return false;
    var cleaned = phone.replace(/[\s\-()]/g, '');
    return /^(?:\+65|65)?[3689]\d{7}$/.test(cleaned) || cleaned.length >= 8;
  },

  /**
   * Checks for honeypot traps and rapid form submission spam
   * @param {Object} payload
   * @return {Object} { isValid: boolean, reason: string }
   */
  checkAntiSpam: function(payload) {
    if (!payload) return { isValid: false, reason: "Empty payload" };

    // 1. Honeypot Trap
    if (payload.website_url_trap && payload.website_url_trap.trim() !== '') {
      return { isValid: false, reason: "Honeypot triggered" };
    }

    // 2. Submission Timing Heuristic
    if (payload._form_render_ts) {
      var elapsed = Date.now() - parseInt(payload._form_render_ts, 10);
      if (elapsed < 2000) {
        return { isValid: false, reason: "Suspicious submission speed (< 2s)" };
      }
    }

    return { isValid: true, reason: null };
  },

  /**
   * Sanitizes string values to prevent injection
   * @param {*} val
   * @return {*}
   */
  sanitize: function(val) {
    if (typeof val === 'string') {
      return val
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim();
    }
    return val;
  },

  /**
   * Validates that all required fields are present in the object
   * @param {Object} obj
   * @param {Array<string>} requiredFields
   * @return {Object} { isValid: boolean, missing: Array<string> }
   */
  validateRequired: function(obj, requiredFields) {
    var missing = [];
    if (!obj) return { isValid: false, missing: requiredFields };

    for (var i = 0; i < requiredFields.length; i++) {
      var field = requiredFields[i];
      if (obj[field] === undefined || obj[field] === null || obj[field] === '') {
        missing.push(field);
      }
    }

    return {
      isValid: missing.length === 0,
      missing: missing
    };
  }
};
