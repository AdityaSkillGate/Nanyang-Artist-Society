/**
 * NANYANG ARTISTS SOCIETY — ONE-CLICK GOOGLE SHEETS DATABASE INITIALIZER
 * Run setupDatabase() inside Apps Script to generate all 36 relational sheets.
 */

function setupDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tables = [
    { name: 'Settings', headers: ['key', 'value', 'type', 'description'] },
    { name: 'People', headers: ['id', 'name_en', 'name_zh', 'courtesy_name', 'role_title_en', 'role_title_zh', 'department_id', 'bio_en', 'bio_zh', 'discipline_specialty', 'photo_url', 'is_board_member', 'is_instructor', 'sort_order'] },
    { name: 'Consultants', headers: ['id', 'name_en', 'name_zh', 'advisory_title_en', 'advisory_title_zh', 'organization', 'biography', 'pdf_profile_url', 'photo_url', 'sort_order'] },
    { name: 'Artists', headers: ['id', 'person_id', 'artist_type', 'primary_medium', 'exhibitions_summary', 'awards_summary', 'featured_artwork_ids'] },
    { name: 'Departments', headers: ['id', 'name_en', 'name_zh', 'head_person_id', 'description'] },
    { name: 'Courses', headers: ['id', 'category_id', 'title_en', 'title_zh', 'tagline_en', 'tagline_zh', 'description_en', 'description_zh', 'age_min', 'age_max', 'duration_per_session', 'level_id', 'primary_instructor_id', 'fee_display', 'schedule_days', 'thumbnail_url', 'is_active'] },
    { name: 'CourseCategories', headers: ['id', 'name_en', 'name_zh', 'icon_name'] },
    { name: 'CourseLevels', headers: ['id', 'name_en', 'name_zh'] },
    { name: 'GradeDisciplines', headers: ['id', 'name_en', 'name_zh', 'max_grade', 'subcategories', 'overview_text'] },
    { name: 'GradeLevels', headers: ['id', 'discipline_id', 'grade_number', 'grade_title_en', 'grade_title_zh', 'exam_duration_mins', 'paper_spec', 'min_characters_or_items'] },
    { name: 'GradeCriteria', headers: ['id', 'grade_level_id', 'category', 'criterion_text_zh', 'criterion_text_en', 'weight_percentage'] },
    { name: 'ExamCentres', headers: ['id', 'centre_name_en', 'centre_name_zh', 'address', 'postal_code', 'district', 'contact_phone', 'website', 'disciplines_offered', 'is_active'] },
    { name: 'ExamSchedules', headers: ['id', 'discipline_id', 'centre_id', 'exam_date', 'registration_start_date', 'registration_end_date', 'intake_status'] },
    { name: 'ExamResults', headers: ['id', 'schedule_id', 'candidate_id', 'grade_awarded', 'result_status', 'certificate_no'] },
    { name: 'Competitions', headers: ['id', 'title_en', 'title_zh', 'frequency', 'eligibility', 'description'] },
    { name: 'CompetitionEditions', headers: ['id', 'competition_id', 'year', 'theme_en', 'theme_zh', 'poster_image_url', 'submission_mode', 'status'] },
    { name: 'CompetitionWinners', headers: ['id', 'edition_id', 'award_tier', 'division', 'student_name', 'artwork_title', 'artwork_image_url', 'age_group'] },
    { name: 'Artworks', headers: ['id', 'title_en', 'title_zh', 'artist_name', 'artist_type', 'discipline_id', 'category_id', 'year_created', 'medium', 'dimensions', 'image_url', 'thumbnail_url', 'is_featured'] },
    { name: 'Exhibitions', headers: ['id', 'title_en', 'title_zh', 'start_date', 'end_date', 'venue_name', 'guests_of_honour', 'participating_artists', 'cover_image_url'] },
    { name: 'Events', headers: ['id', 'title_en', 'title_zh', 'event_type', 'date_start', 'date_end', 'location', 'registration_required', 'max_seats'] },
    { name: 'News', headers: ['id', 'slug', 'title_en', 'title_zh', 'content_en', 'content_zh', 'author', 'publish_date', 'cover_image_url', 'is_published'] },
    { name: 'Societies', headers: ['id', 'name_en', 'name_zh', 'region', 'collaboration_type', 'website_url', 'logo_url'] },
    { name: 'GalleryCategories', headers: ['id', 'name_en', 'name_zh', 'description'] },
    { name: 'Testimonials', headers: ['id', 'author_name', 'author_role', 'course_id', 'rating', 'quote_en', 'quote_zh', 'is_verified'] },
    { name: 'FAQs', headers: ['id', 'category', 'question_en', 'question_zh', 'answer_en', 'answer_zh', 'sort_order'] },
    { name: 'Downloads', headers: ['id', 'title_en', 'title_zh', 'category', 'file_url', 'file_size_kb'] },
    { name: 'Enquiries', headers: ['id', 'timestamp', 'full_name', 'email', 'phone', 'interested_discipline', 'message', 'status'] },
    { name: 'Registrations', headers: ['id', 'timestamp', 'registration_type', 'target_id', 'student_name', 'student_age', 'parent_name', 'contact_email', 'contact_phone', 'preferred_centre_id', 'status'] },
    { name: 'ArtworkSubmissions', headers: ['id', 'timestamp', 'competition_edition_id', 'artwork_title', 'student_name', 'student_age', 'discipline_category', 'image_file_url', 'artist_statement', 'parent_consent', 'review_status'] },
    { name: 'Subscribers', headers: ['id', 'email', 'subscribed_at', 'language_preference', 'is_active'] },
    { name: 'Translations', headers: ['key', 'en', 'zh', 'ms', 'ta'] },
    { name: 'Media', headers: ['id', 'public_id', 'secure_url', 'alt_text_en', 'alt_text_zh', 'file_format', 'width', 'height', 'asset_category'] },
    { name: 'AIKnowledge', headers: ['id', 'topic', 'keywords', 'context_payload', 'is_verified'] },
    { name: 'ActivityLogs', headers: ['id', 'timestamp', 'action_type', 'user_ip_hash', 'details'] },
    { name: 'SEO', headers: ['page_route', 'meta_title_en', 'meta_title_zh', 'meta_description_en', 'meta_description_zh', 'og_image_url', 'canonical_url'] },
    { name: 'CertificateVerifications', headers: ['certificate_id', 'candidate_full_name', 'discipline_id', 'grade_achieved', 'date_issued', 'verification_status'] }
  ];

  tables.forEach(function(t) {
    var sheet = ss.getSheetByName(t.name);
    if (!sheet) {
      sheet = ss.insertSheet(t.name);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(t.headers);
      sheet.getRange(1, 1, 1, t.headers.length).setFontWeight('bold').setBackground('#F3EFE6');
    }
  });

  Logger.log('Successfully initialized all 36 relational sheets for Nanyang Artists Society.');
}
