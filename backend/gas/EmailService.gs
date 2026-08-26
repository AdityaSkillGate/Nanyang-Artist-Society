/**
 * NANYANG ARTISTS SOCIETY — GAS MULTILINGUAL HTML EMAIL NOTIFICATION SERVICE
 * Generates and sends branded transactional emails for admissions, registrations, and alerts.
 */

var EmailService = {
  getBrandHeader: function() {
    return `
      <div style="background-color: #121316; padding: 24px; text-align: center; border-bottom: 3px solid #BA1B1D;">
        <h1 style="color: #FFFFFF; font-family: Georgia, serif; font-size: 20px; margin: 0;">Singapore Nanyang Artists Society</h1>
        <div style="color: #C59B27; font-size: 13px; margin-top: 4px;">新加坡南洋美术家协会 · 官方考务与秘书处</div>
      </div>
    `;
  },

  getBrandFooter: function() {
    return `
      <div style="background-color: #F9F6F0; padding: 20px; text-align: center; font-size: 12px; color: #6B7280; border-top: 1px solid #E8E2D5;">
        <p style="margin: 0 0 6px;">Singapore Nanyang Artists Society Secretariat</p>
        <p style="margin: 0 0 6px;">Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135 | Tel: +65 6899 0828</p>
        <p style="margin: 0; font-size: 11px;">© 2026 Singapore Nanyang Artists Society. PDPA Compliant.</p>
      </div>
    `;
  },

  /**
   * 1. Individual Registration Acknowledgement Email
   */
  sendRegistrationAck: function(applicant) {
    if (!applicant.email) return;
    var subject = "Registration Acknowledgement — " + applicant.id + " | Nanyang Artists Society";
    var htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E8E2D5;">
        ${this.getBrandHeader()}
        <div style="padding: 30px 24px; color: #121316; line-height: 1.6;">
          <h2 style="font-size: 18px; color: #BA1B1D; margin-top: 0;">Registration Received / 报名申请已接收</h2>
          <p>Dear <strong>${applicant.name || 'Contestant'}</strong> / 尊敬的家长与考生,</p>
          <p>Thank you for submitting your application to the Singapore Nanyang Artists Society. Your official voucher reference is <strong>${applicant.id}</strong>.</p>
          <div style="background: #F9F6F0; border-left: 4px solid #BA1B1D; padding: 14px 18px; margin: 20px 0;">
            <div><strong>Contestant:</strong> ${applicant.name} (${applicant.chineseName || ''})</div>
            <div><strong>Division:</strong> ${applicant.ageGroup || applicant.division}</div>
            <div><strong>Category:</strong> ${applicant.category}</div>
            <div><strong>Submission Date:</strong> ${applicant.date || new Date().toLocaleDateString()}</div>
          </div>
          <p>Our academic examination council is currently reviewing your submission. You will receive an official notification once approved.</p>
        </div>
        ${this.getBrandFooter()}
      </div>
    `;

    MailApp.sendEmail({
      to: applicant.email,
      subject: subject,
      htmlBody: htmlBody,
      name: "Nanyang Artists Society"
    });
  },

  /**
   * 2. Course & Exam Enquiry Acknowledgement Email
   */
  sendEnquiryAck: function(enquiry) {
    if (!enquiry.email) return;
    var subject = "Enquiry Received — Nanyang Artists Society Secretariat";
    var htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E8E2D5;">
        ${this.getBrandHeader()}
        <div style="padding: 30px 24px; color: #121316; line-height: 1.6;">
          <h2 style="font-size: 18px; color: #BA1B1D; margin-top: 0;">Thank You for Your Enquiry / 感谢您的咨询</h2>
          <p>Dear <strong>${enquiry.name || 'Friend of the Arts'}</strong>,</p>
          <p>We have received your enquiry regarding <em>"${enquiry.subject || enquiry.course || 'Art Studio Programmes'}"</em>.</p>
          <p>A member of our admissions secretariat will get back to you within 1–2 business days with timetable and subsidized materials information.</p>
        </div>
        ${this.getBrandFooter()}
      </div>
    `;

    MailApp.sendEmail({
      to: enquiry.email,
      subject: subject,
      htmlBody: htmlBody,
      name: "Nanyang Artists Society"
    });
  },

  /**
   * 3. Admin Notification Alert
   */
  sendAdminAlert: function(subject, details) {
    var adminEmail = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL") || "secretariat@nanyangartists.org.sg";
    var htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E8E2D5;">
        ${this.getBrandHeader()}
        <div style="padding: 24px; color: #121316;">
          <h3 style="color: #BA1B1D; margin-top: 0;">⚡ Administrative System Alert</h3>
          <p>${details}</p>
          <p style="font-size: 12px; color: #6B7280;">Timestamp: ${new Date().toISOString()}</p>
        </div>
        ${this.getBrandFooter()}
      </div>
    `;

    try {
      MailApp.sendEmail({
        to: adminEmail,
        subject: "[ADMIN ALERT] " + subject,
        htmlBody: htmlBody
      });
    } catch (e) {
      console.warn("[EmailService] Admin email skipped in sandbox mode:", e);
    }
  },

  /**
   * 4. Competition Submission Confirmation
   */
  sendCompetitionConfirmation: function(sub) {
    if (!sub.email) return;
    this.sendRegistrationAck(sub);
  },

  /**
   * 5. Event Notification
   */
  sendEventNotification: function(attendee, event) {
    if (!attendee.email) return;
    var subject = "Event Reminder: " + (event.title || 'Masterclass Session');
    var htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E8E2D5;">
        ${this.getBrandHeader()}
        <div style="padding: 24px; color: #121316; line-height: 1.6;">
          <h3 style="color: #BA1B1D; margin-top: 0;">Event Details / 活动日程提醒</h3>
          <p>Dear ${attendee.name}, this is a reminder for your upcoming session:</p>
          <div style="background: #F9F6F0; padding: 16px; border-radius: 6px;">
            <div><strong>Event:</strong> ${event.title}</div>
            <div><strong>Date & Time:</strong> ${event.date} (${event.time})</div>
            <div><strong>Location:</strong> ${event.location}</div>
          </div>
        </div>
        ${this.getBrandFooter()}
      </div>
    `;

    MailApp.sendEmail({
      to: attendee.email,
      subject: subject,
      htmlBody: htmlBody,
      name: "Nanyang Artists Society"
    });
  },

  /**
   * 6. Newsletter Welcome Email
   */
  sendNewsletterWelcome: function(subscriber) {
    if (!subscriber.email) return;
    var subject = "Welcome to Singapore Nanyang Artists Society Dispatches";
    var htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E8E2D5;">
        ${this.getBrandHeader()}
        <div style="padding: 24px; color: #121316; line-height: 1.6;">
          <h3 style="color: #BA1B1D; margin-top: 0;">Welcome to our Cultural Community / 欢迎加入南洋美协</h3>
          <p>Thank you for subscribing to our seasonal dispatches, exhibition invitations, and masterclass updates.</p>
        </div>
        ${this.getBrandFooter()}
      </div>
    `;

    MailApp.sendEmail({
      to: subscriber.email,
      subject: subject,
      htmlBody: htmlBody,
      name: "Nanyang Artists Society"
    });
  }
};
