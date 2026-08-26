/**
 * NANYANG ARTISTS SOCIETY — GAS ADMINISTRATIVE CONTROLLER
 * Secure endpoints for CMS operations, publishing workflow, and registration review.
 */

var AdminController = {
  // 1. Course Management
  saveCourse: function(payload, auth) {
    if (!AuthService.hasPermission(auth.role, 'write:courses')) {
      return Response.error("Permission denied for editing courses", "FORBIDDEN_403");
    }

    var id = payload.id;
    var existing = id ? Repository.getById("Courses", id) : null;

    if (existing) {
      Repository.update("Courses", id, payload);
      LoggerService.log(auth.user, auth.role, "Updated Course " + id, "Courses");
      return Response.success(payload, "Course updated successfully");
    } else {
      payload.id = id || "CRS-" + Date.now().toString().slice(-4);
      Repository.append("Courses", payload);
      LoggerService.log(auth.user, auth.role, "Created Course " + payload.id, "Courses");
      return Response.success(payload, "Course created successfully");
    }
  },

  // 2. Registration Status Workflow
  updateRegistrationStatus: function(payload, auth) {
    if (!AuthService.hasPermission(auth.role, 'write:registrations')) {
      return Response.error("Permission denied for registration workflow", "FORBIDDEN_403");
    }

    var id = payload.id;
    var newStatus = payload.status; // 'new', 'under_review', 'approved', 'rejected', 'completed'

    var validStatuses = ['new', 'under_review', 'approved', 'rejected', 'completed'];
    if (validStatuses.indexOf(newStatus) === -1) {
      return Response.error("Invalid status code", "BAD_REQUEST_400");
    }

    var updated = Repository.update("Registrations", id, { status: newStatus, lastReviewedAt: new Date().toISOString() });
    if (!updated) {
      return Response.error("Registration not found", "NOT_FOUND_404");
    }

    LoggerService.log(auth.user, auth.role, "Updated Registration " + id + " to " + newStatus.toUpperCase(), "Registrations");
    return Response.success({ id: id, status: newStatus }, "Registration status updated successfully");
  },

  // 3. Media Upload Signing
  getMediaUploadSignature: function(payload, auth) {
    if (!AuthService.hasPermission(auth.role, 'write:media')) {
      return Response.error("Permission denied for media operations", "FORBIDDEN_403");
    }

    var folder = payload.folder || "general";
    var signatureData = CloudinaryService.generateUploadSignature(folder);
    return Response.success(signatureData, "Upload signature generated");
  },

  // 4. Audit Log Retrieval
  getAuditLogs: function(payload, auth) {
    if (auth.role !== 'super_admin') {
      return Response.error("Only Super Admins can inspect activity audit logs", "FORBIDDEN_403");
    }

    var logs = Repository.getAll("ActivityLogs");
    return Response.success(logs, "Audit logs retrieved");
  }
};
