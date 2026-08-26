/**
 * NANYANG ARTISTS SOCIETY — GAS AI ART ADVISOR SERVICE
 * Grounded retrieval service over society database with strict non-hallucination disclaimers.
 */

var AIService = {
  /**
   * Processes an incoming inquiry and generates a grounded response
   * @param {string} query
   * @param {string} language
   * @return {Object} { answer, actionLink, actionLabel }
   */
  processQuery: function(query, language) {
    var q = (query || '').toLowerCase();
    var lang = language || 'en';

    // 1. Course Recommendations
    if (q.indexOf('course') !== -1 || q.indexOf('child') !== -1 || q.indexOf('适合') !== -1 || q.indexOf('课程') !== -1) {
      if (lang === 'zh') {
        return {
          answer: "协会设有少儿智力美术(2-4岁)、少儿美术手工(5-8岁)、传统书画(6岁以上)及素描漫画等系统化课程。建议使用官网选课向导进行智能自测匹配。",
          actionLink: "courses/finder.html",
          actionLabel: "开启选课向导 →"
        };
      }
      return {
        answer: "The Society offers developmental pathways across Children Intellectual Art (2–4 yrs), Drawing & Crafts (5–8 yrs), Calligraphy & Ink Painting (6+ yrs), and Academic Sketching.",
        actionLink: "courses/finder.html",
        actionLabel: "Launch Course Finder →"
      };
    }

    // 2. Grade Examination
    if (q.indexOf('exam') !== -1 || q.indexOf('grade') !== -1 || q.indexOf('考级') !== -1 || q.indexOf('大纲') !== -1) {
      return {
        answer: "The National Visual Arts Grade Examination spans 6 verified disciplines across Grades 1 through 9 with standardized rubrics (Pass, Merit, Distinction).",
        actionLink: "grade-examination/index.html",
        actionLabel: "View Grade Syllabi →"
      };
    }

    // 3. Test Centres
    if (q.indexOf('centre') !== -1 || q.indexOf('center') !== -1 || q.indexOf('考点') !== -1 || q.indexOf('jurong') !== -1) {
      return {
        answer: "Verified test centres include Jurong East Headquarters (Blk 135 Jurong Gateway Rd #03-333/335), Singapore FAS (10 Kampong Eunos), AiDe Art (Tampines), and Butterfly Art (Jurong West).",
        actionLink: "grade-examination/test-centres.html",
        actionLabel: "Test Centre Locator →"
      };
    }

    // 4. Default Safety & Anti-Hallucination Disclaimer
    if (lang === 'zh') {
      return {
        answer: "关于具体考务政策、资助细则或特定收费标准，为确保准确无误：“请联系新加坡南洋美术家协会秘书处获取官方确认。” (电话: +65 6899 0828 / 电邮: secretariat@nanyangartists.org.sg)",
        actionLink: "contact/index.html",
        actionLabel: "联系秘书处 →"
      };
    }

    return {
      answer: "Regarding specific examination policies, fee grants, or unverified inquiries: 'Please contact Nanyang Artists Society for official confirmation.' (Tel: +65 6899 0828 / Email: secretariat@nanyangartists.org.sg)",
      actionLink: "contact/index.html",
      actionLabel: "Contact Secretariat →"
    };
  }
};
