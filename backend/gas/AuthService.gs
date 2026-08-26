/**
 * NANYANG ARTISTS SOCIETY — GAS AUTHENTICATION & RBAC SERVICE
 * Protects administrative routes and verifies role-based access permissions.
 */

var AuthService = {
  /**
   * Retrieves the configured Admin Secret Key from Script Properties
   * @return {string}
   */
  getAdminSecret: function() {
    var props = PropertiesService.getScriptProperties();
    return props.getProperty("ADMIN_API_KEY") || "NAS_DEFAULT_DEV_SECRET_2026";
  },

  /**
   * Verifies that the provided request contains a valid admin token
   * @param {Object} e - Event parameter from doGet/doPost
   * @return {Object} { isAuthorized: boolean, role: string, user: string }
   */
  verifyAdmin: function(e) {
    var token = (e && e.parameter && e.parameter.apiKey) || 
                (e && e.headers && e.headers['Authorization']) || '';

    if (token.indexOf('Bearer ') === 0) {
      token = token.slice(7).trim();
    }

    var expectedSecret = this.getAdminSecret();

    if (!token || token !== expectedSecret) {
      return {
        isAuthorized: false,
        role: "unauthorized",
        user: "anonymous"
      };
    }

    // Role passed or default to Super Admin
    var requestedRole = (e && e.parameter && e.parameter.role) || "super_admin";

    return {
      isAuthorized: true,
      role: requestedRole,
      user: (e && e.parameter && e.parameter.user) || "Admin Secretariat"
    };
  },

  /**
   * Verifies if the active role has permission for a specific action
   * @param {string} role
   * @param {string} permission
   * @return {boolean}
   */
  hasPermission: function(role, permission) {
    var permissions = {
      super_admin: ['all'],
      chief_editor: ['read', 'write:courses', 'write:news', 'write:events', 'write:history'],
      registrar: ['read', 'write:registrations', 'write:exams', 'verify:certificates'],
      media_manager: ['read', 'write:media', 'write:gallery']
    };

    var allowed = permissions[role] || [];
    if (allowed.indexOf('all') !== -1) return true;
    return allowed.indexOf(permission) !== -1;
  }
};
