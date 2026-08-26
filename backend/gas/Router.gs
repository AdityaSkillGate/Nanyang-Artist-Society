/**
 * NANYANG ARTISTS SOCIETY — GAS ROUTE DISPATCHER
 * Maps incoming action parameters to public and administrative controllers.
 */

var Router = {
  /**
   * Handles GET requests
   * @param {Object} e - Event parameter
   * @return {GoogleAppsScript.Content.TextOutput}
   */
  handleGet: function(e) {
    var action = (e && e.parameter && e.parameter.action) || 'ping';

    switch (action) {
      case 'ping':
        return Response.success({ status: "online", version: "2.4.0", timestamp: new Date().toISOString() }, "Nanyang Artists Society API Online");

      case 'getCourses':
        return PublicController.getCourses(e);

      case 'getCourseById':
        return PublicController.getCourseById(e);

      case 'getPeople':
        return PublicController.getPeople(e);

      case 'getArtistById':
        return PublicController.getArtistById(e);

      case 'getDisciplines':
        return PublicController.getDisciplines(e);

      case 'getGradeLevels':
        return PublicController.getGradeLevels(e);

      case 'getTestCentres':
        return PublicController.getTestCentres(e);

      case 'verifyCertificate':
        return PublicController.verifyCertificate(e);

      case 'getCompetitions':
        return PublicController.getCompetitions(e);

      case 'getWinners':
        return PublicController.getWinners(e);

      case 'getArtworks':
        return PublicController.getArtworks(e);

      case 'getNews':
        return PublicController.getNews(e);

      case 'getEvents':
        return PublicController.getEvents(e);

      default:
        return Response.error("Unknown action: " + action, "BAD_REQUEST_400");
    }
  },

  /**
   * Handles POST requests
   * @param {Object} e - Event parameter
   * @return {GoogleAppsScript.Content.TextOutput}
   */
  handlePost: function(e) {
    var payload = {};
    try {
      if (e && e.postData && e.postData.contents) {
        payload = JSON.parse(e.postData.contents);
      } else if (e && e.parameter) {
        payload = e.parameter;
      }
    } catch (err) {
      return Response.error("Invalid JSON payload", "BAD_REQUEST_400", err.toString());
    }

    var action = (e && e.parameter && e.parameter.action) || payload.action || '';

    // 1. Public Actions
    switch (action) {
      case 'submitRegistration':
        return PublicController.submitRegistration(payload);

      case 'submitEnquiry':
        return PublicController.submitEnquiry(payload);

      case 'submitSubscriber':
        return PublicController.submitSubscriber(payload);

      case 'aiQuery':
        return PublicController.aiQuery(payload);
    }

    // 2. Administrative Actions (Protected by RBAC)
    var auth = AuthService.verifyAdmin(e);
    if (!auth.isAuthorized) {
      return Response.error("Unauthorized: Invalid or missing administrative credentials", "UNAUTHORIZED_401");
    }

    switch (action) {
      case 'admin:saveCourse':
        return AdminController.saveCourse(payload, auth);

      case 'admin:updateRegistrationStatus':
        return AdminController.updateRegistrationStatus(payload, auth);

      case 'admin:getMediaUploadSignature':
        return AdminController.getMediaUploadSignature(payload, auth);

      case 'admin:getAuditLogs':
        return AdminController.getAuditLogs(payload, auth);

      default:
        return Response.error("Unrecognized administrative action: " + action, "BAD_REQUEST_400");
    }
  }
};
