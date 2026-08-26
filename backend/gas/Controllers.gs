/**
 * NANYANG ARTISTS SOCIETY — GAS PUBLIC RESOURCE CONTROLLERS
 * Handles public data retrieval, certificate verification, and form submissions.
 */

var PublicController = {
  // 1. Courses
  getCourses: function(e) {
    var courses = Repository.getAll("Courses");
    return Response.success(courses, "Courses retrieved successfully");
  },

  getCourseById: function(e) {
    var id = e.parameter.id;
    var course = Repository.getById("Courses", id);
    if (!course) return Response.error("Course not found", "NOT_FOUND_404");
    return Response.success(course, "Course retrieved successfully");
  },

  // 2. People & Artists
  getPeople: function(e) {
    var people = Repository.getAll("People");
    return Response.success(people, "People directory retrieved");
  },

  getArtistById: function(e) {
    var id = e.parameter.id;
    var person = Repository.getById("People", id);
    if (!person) return Response.error("Artist profile not found", "NOT_FOUND_404");
    return Response.success(person, "Artist retrieved successfully");
  },

  // 3. Grade Examination
  getDisciplines: function(e) {
    var disciplines = Repository.getAll("Disciplines");
    return Response.success(disciplines, "Disciplines retrieved");
  },

  getGradeLevels: function(e) {
    var levels = Repository.getAll("GradeLevels");
    return Response.success(levels, "Grade levels retrieved");
  },

  getTestCentres: function(e) {
    var centres = Repository.getAll("TestCentres");
    return Response.success(centres, "Test centres retrieved");
  },

  verifyCertificate: function(e) {
    var certNum = (e.parameter.certNumber || '').trim().toUpperCase();
    if (!certNum) return Response.error("Certificate number is required", "BAD_REQUEST_400");

    var certs = Repository.getAll("Certificates");
    var found = null;
    for (var i = 0; i < certs.length; i++) {
      if (certs[i].certNumber && certs[i].certNumber.toUpperCase() === certNum) {
        found = certs[i];
        break;
      }
    }

    if (!found) {
      return Response.error("Certificate not found in national registry", "NOT_FOUND_404");
    }

    return Response.success(found, "Certificate verified authentic");
  },

  // 4. Competitions & Winners
  getCompetitions: function(e) {
    var competitions = Repository.getAll("Competitions");
    return Response.success(competitions, "Competitions retrieved");
  },

  getWinners: function(e) {
    var winners = Repository.getAll("CompetitionWinners");
    return Response.success(winners, "Winners archive retrieved");
  },

  // 5. Gallery Artworks
  getArtworks: function(e) {
    var artworks = Repository.getAll("GalleryArtworks");
    return Response.success(artworks, "Gallery artworks retrieved");
  },

  // 6. News & Events
  getNews: function(e) {
    var news = Repository.getAll("News");
    return Response.success(news, "News articles retrieved");
  },

  getEvents: function(e) {
    var events = Repository.getAll("Events");
    return Response.success(events, "Events timetable retrieved");
  },

  // 7. Form Submissions
  submitRegistration: function(payload) {
    var spamCheck = Validation.checkAntiSpam(payload);
    if (!spamCheck.isValid) {
      return Response.error("Submission rejected by security filters: " + spamCheck.reason, "SPAM_BLOCKED_403");
    }

    var required = ['applicantName', 'dob', 'gender', 'parentName', 'mobile', 'category'];
    var check = Validation.validateRequired(payload, required);
    if (!check.isValid) {
      return Response.error("Missing required fields: " + check.missing.join(', '), "BAD_REQUEST_400");
    }

    var registrationId = "NAS-2026-IND-" + Math.floor(1000 + Math.random() * 9000);
    payload.id = registrationId;
    payload.status = "new";
    payload.submissionDate = new Date().toISOString();

    Repository.append("Registrations", payload);
    LoggerService.log(payload.parentName, "Public", "Submitted Individual Registration " + registrationId, "Registrations");
    EmailService.sendRegistrationAck(payload);

    return Response.success({ id: registrationId }, "Registration submitted successfully! Voucher generated.");
  },

  submitEnquiry: function(payload) {
    var spamCheck = Validation.checkAntiSpam(payload);
    if (!spamCheck.isValid) {
      return Response.error("Enquiry rejected by security filters", "SPAM_BLOCKED_403");
    }

    var enquiryId = "ENQ-" + Math.floor(1000 + Math.random() * 9000);
    payload.id = enquiryId;
    payload.status = "new";
    payload.timestamp = new Date().toISOString();

    Repository.append("Enquiries", payload);
    LoggerService.log(payload.name, "Public", "Submitted Enquiry " + enquiryId, "Enquiries");
    EmailService.sendEnquiryAck(payload);

    return Response.success({ id: enquiryId }, "Enquiry received! Secretariat will respond shortly.");
  },

  submitSubscriber: function(payload) {
    if (!Validation.isValidEmail(payload.email)) {
      return Response.error("Valid email address is required", "BAD_REQUEST_400");
    }

    payload.id = "SUB-" + Math.floor(1000 + Math.random() * 9000);
    payload.subscribedAt = new Date().toISOString();

    Repository.append("Subscribers", payload);
    EmailService.sendNewsletterWelcome(payload);

    return Response.success(null, "Subscribed successfully to society dispatches!");
  },

  // 8. AI Query Proxy
  aiQuery: function(payload) {
    var result = AIService.processQuery(payload.query, payload.language);
    return Response.success(result, "AI Assistant response generated");
  }
};
