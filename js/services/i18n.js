/**
 * NANYANG ARTISTS SOCIETY — TRANSLATION & LOCALIZATION ENGINE
 * Official 2-Language Support: English (EN), Singapore Chinese (ZH-SG).
 * Strict Fallback Order: Current Language -> English -> Safe Default.
 */

export const DICTIONARIES = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.about_story": "Our Story & Mission",
    "nav.about_history": "History & Liu Kang",
    "nav.about_team": "Leadership & Team",
    "nav.about_societies": "Art Societies Network",
    "nav.courses": "Art Courses",
    "nav.courses_all": "All Courses Catalog",
    "nav.courses_finder": "Course Finder Quiz",
    "nav.grade": "Grade Exam",
    "nav.grade_path": "Grades 1–9 Pathway",
    "nav.grade_viewer": "Assessment Viewer",
    "nav.grade_centres": "Test Centre Query",
    "nav.grade_verify": "Verify Certificate",
    "nav_nanyang_star": "Nanyang Star",
    "nav.nanyang_star": "Nanyang Star",
    "nav.nanyang.star": "Nanyang Star",
    "nav.nanyang_star_hub": "Competition Hub",
    "nav.nanyang_star_winners": "2020 Winner Archive",
    "nav.nanyang_star_submit": "Submit Artwork",
    "nav.societies": "Societies",
    "nav.gallery": "Gallery",
    "nav.news": "News & Events",
    "nav.resources": "Resources",
    "nav.contact": "Contact",
    "cta.enquire": "Enquire",
    "cta.register": "Register",

    // Common Actions
    "btn.enquire": "Enquire Course",
    "btn.register": "Register Now",
    "btn.download": "Download Official File",
    "btn.preview": "Preview Document",
    "btn.submit": "Submit Application",
    "btn.filter": "Filter Results",
    "btn.reset": "Reset All Filters",
    "btn.back": "Back",
    "btn.next": "Next Step",
    "btn.print": "Print Voucher",
    "btn.view_details": "View Details",
    "btn.read_more": "Read More",
    "btn.close": "Close",

    // Course UI
    "course.category": "Course Category",
    "course.level": "Skill Level",
    "course.age_group": "Target Age",
    "course.duration": "Term Duration",
    "course.schedule": "Class Schedule",
    "course.instructor": "Lead Instructor",
    "course.learning_outcomes": "Key Learning Outcomes",
    "course.syllabus": "Curriculum Stages",
    "course.fee_note": "Please contact secretariat for timetable and subsidized materials",

    // Grade Examination UI
    "grade.hero_title": "National Visual Arts Grade Examination",
    "grade.disciplines": "Examination Disciplines",
    "grade.levels": "Grade Levels 1 to 9",
    "grade.test_centres": "Accredited Test Centres",
    "grade.criteria": "Assessment Criteria",
    "grade.verification": "Certificate Verification Portal",
    "grade.pass": "Passed",
    "grade.merit": "Passed with Merit",
    "grade.distinction": "Passed with Distinction",

    // Competition UI
    "comp.nanyang_star": "Nanyang Star International Competition",
    "comp.call_for_entries": "Official Call for Entries",
    "comp.age_groups": "Competition Age Divisions",
    "comp.individual_reg": "Individual Registration",
    "comp.team_reg": "Team / Institutional Registration",
    "comp.hall_of_fame": "Winners & Hall of Fame",
    "comp.grand_prize": "Star of Nanyang Grand Trophy",
    "comp.gold_award": "Gold Award",
    "comp.silver_award": "Silver Award",

    // Gallery UI
    "gallery.title": "Digital Art Gallery & Online Museum",
    "gallery.masonry": "Masonry Grid",
    "gallery.editorial": "Editorial Salon",
    "gallery.fullscreen": "Fullscreen Darkroom",
    "gallery.search_placeholder": "Search by title, artist, or discipline...",
    "gallery.all_disciplines": "All Disciplines",

    // Gallery Filter Labels
    "gallery.filter.category": "Category:",
    "gallery.filter.artist": "Artist:",
    "gallery.filter.discipline": "Discipline:",
    "gallery.filter.year": "Year:",
    "gallery.filter.competition": "Competition:",
    "gallery.filter.exhibition": "Exhibition:",
    "gallery.filter.allCategories": "All Categories",
    "gallery.filter.fineArts": "Fine Arts",
    "gallery.filter.heritageArts": "Heritage Arts",
    "gallery.filter.youthArts": "Youth Arts",
    "gallery.filter.allCreators": "All Creators",
    "gallery.filter.masterFaculty": "Master Faculty",
    "gallery.filter.studentLaureates": "Student Laureates",
    "gallery.filter.allDisciplines": "All Disciplines",
    "gallery.filter.allYears": "All Years",
    "gallery.filter.allCompetitions": "All Competitions",
    "gallery.filter.facultyCollection": "Faculty Collection",
    "gallery.filter.allExhibitions": "All Exhibitions",

    // News Filter & Sort
    "news.filter.all": "All News",
    "news.filter.competition": "Competition News",
    "news.filter.announcements": "Announcements",
    "news.filter.academic": "Academic Salons",
    "news.filter.pedagogy": "Art Pedagogy",
    "news.sort.newest": "Newest First",
    "news.sort.oldest": "Oldest First",

    // Home Page Hero & Gates
    "home.hero_title": "Create. Learn. Achieve. Inspire.",
    "home.hero_desc": "Explore artistic learning, heritage arts, creative development and prestigious opportunities to showcase talent across Singapore and the world.",
    "home.hero_explore": "Explore Art Courses →",
    "home.hero_nanyang_star": "Discover Nanyang Star",
    "home.gate_courses_title": "Explore Courses",
    "home.gate_courses_desc": "Foundations in Chinese ink, academic sketch, oil, and children intellectual art.",
    "home.gate_courses_btn": "Browse Catalog →",
    "home.gate_grade_title": "Grade Exam",
    "home.gate_grade_desc": "Grades 1 to 9 standardized assessment supervised across accredited test centres.",
    "home.gate_grade_btn": "Exam Pathway →",
    "home.gate_star_title": "Nanyang Star",
    "home.gate_star_desc": "Premier international youth art competitions, gala exhibitions, and global awards.",
    "home.gate_star_btn": "Competition Hub →",
    "home.gate_events_title": "Find an Event",
    "home.gate_events_desc": "Masterclass workshops, calligraphy rubbings, and gallery tour dates.",
    "home.gate_events_btn": "Event Calendar →",
    "home.disciplines_title": "Visual Arts Disciplines & Pathways",
    "home.disciplines_desc": "Structured artistic progression from sensory childhood discovery to academic mastery.",
    "home.featured_courses_title": "Featured Visual Arts Courses",
    "home.featured_courses_desc": "Curated studio classes taught by practicing artists and accredited faculty mentors.",
    "home.grade_path_title": "Grades 1 to 9 Visual Examination Pathway",
    "home.grade_path_desc": "Standardized examination progression across 6 verified disciplines. Click any grade stage below to inspect evaluation criteria and paper requirements.",
    "home.star_spotlight_title": "Nanyang Star International Children's Art Competition",
    "home.faculty_spotlight_title": "Master Faculty & Academic Mentors",
    "home.faculty_spotlight_desc": "Distinguished Singaporean artists, calligraphers, and art educators leading society studios.",

    // Courses Extended
    "courses.search_placeholder": "Search by course title, discipline, or medium...",
    "courses.filter_category_label": "Primary Art Category:",
    "courses.cat_all": "All Categories",
    "courses.cat_fine": "Fine Arts",
    "courses.cat_heritage": "Heritage Arts",
    "courses.cat_youth": "Youth Arts",
    "courses.cat_cert": "Professional Certification",
    "courses.filter_age_label": "Target Age Group:",
    "courses.age_all": "All Age Brackets",
    "courses.age_children": "Children (4–8 yrs)",
    "courses.age_teens": "Teens (9–15 yrs)",
    "courses.age_adults": "Adults & Lifelong Learners (16+ yrs)",
    "courses.filter_level_label": "Skill Level:",
    "courses.level_all": "All Skill Levels",
    "courses.level_beginner": "Beginner Foundation",
    "courses.level_intermediate": "Intermediate Technique",
    "courses.level_advanced": "Advanced Mastery",
    "courses.filter_goal_label": "Learning Objective:",
    "courses.goal_all": "All Learning Goals",
    "courses.goal_exam": "National Grade Examination Preparation",
    "courses.goal_leisure": "Creative Passion & Leisure",
    "courses.goal_teaching": "Art Educator Certification",
    "courses.small_group_badge": "Standardized Small-Group Studios (Max 12 pax)",
    "courses.hero_quiz_cta": "🎯 Take Course Finder Quiz",
    "courses.hero_consult_cta": "Book Studio Consultation",
    "courses.quiz_title": "Not Sure Which Course Fits?",
    "courses.quiz_subtitle": "Answer 3 simple questions to find the perfect art pathway for your age and goals.",
    "courses.quiz_step1": "Step 1 of 3",
    "courses.quiz_q1": "Who is this art course for?",
    "courses.quiz_opt_child": "👶 Young Child (Ages 4–8)",
    "courses.quiz_opt_teen": "🎒 Teen / Youth (Ages 9–15)",
    "courses.quiz_opt_adult": "🎨 Adult / Educator (Ages 16+)",

    // Nanyang Star & Subnav
    "nanyang_star.subnav_call": "2026 Call for Entries",
    "nanyang_star.subnav_divisions": "Age Groups & Awards",
    "nanyang_star.subnav_winners": "2020 Winner Archive",
    "nanyang_star.subnav_poster": "Historical Posters",
    "nanyang_star.subnav_submit": "Submit Artwork",
    "comp.submit.badge": "2026 Biennial Entry",
    "comp.submit.title": "Submit Artwork for Nanyang Star 2026",
    "comp.submit.desc": "Please fill in candidate details and upload or link your artwork submission.",
    "comp.submit.name_label": "Young Artist Full Name *:",
    "comp.submit.zh_name_label": "Chinese Name (Optional):",
    "comp.submit.division_label": "Age Division *:",
    "comp.submit.medium_label": "Artwork Medium *:",
    "comp.submit.title_label": "Artwork Title *:",
    "comp.submit.phone_label": "Parent / Contact Phone *:",
    "comp.submit.email_label": "Contact Email *:",
    "comp.submit.statement_label": "Artwork Description & Concept Statement:",
    "comp.submit.btn": "Submit Competition Entry →",
    "comp.submit.div_placeholder": "Select Age Group",
    "comp.submit.div_a": "Junior A (Ages 4–6)",
    "comp.submit.div_b": "Junior B (Ages 7–9)",
    "comp.submit.div_c": "Intermediate (Ages 10–12)",
    "comp.submit.div_d": "Senior Youth (Ages 13–16)",
    "comp.submit.med_mixed": "Mixed Media / Oil Pastel",
    "comp.submit.med_ink": "Chinese Ink & Calligraphy",
    "comp.submit.med_sketch": "Sketching / Pencil Drawing",
    "comp.submit.med_watercolor": "Watercolor / Gouache",
    "comp.submit.med_origami": "Patented 3D Origami",

    // About Subnav
    "about.subnav_story": "Our Story",
    "about.subnav_mission": "Mission & Values",
    "about.subnav_leadership": "Leadership Council",
    "about.subnav_faculty": "Artists & Faculty",
    "about.subnav_community": "Societies Alliance",
    "about.subnav_timeline": "Milestones (2012–2026)",

    // Grade Subnav
    "grade.subnav_hard_pen": "Hard-Pen (Grades 1–9)",
    "grade.subnav_soft_pen": "Soft-Pen (Grades 1–9)",
    "grade.subnav_compare": "⚖️ Compare Grades (标准对比)",
    "grade.subnav_centres": "📍 Test Centres",
    "grade.subnav_verify": "🔍 Verify Certificate",
    "grade.subnav_enquire": "Exam Intake Enquiry",

    // About Page Full Content (EN)
    "about.hero_badge_year": "Since 2002",
    "about.hero_badge_titling": "Pioneer Liu Kang Titling",
    "about.hero_title": "Our Heritage, Mission & People",
    "about.hero_subtitle": "以艺养心 · 启智树人 · 融贯中西",
    "about.hero_desc": "Established in 2002 under the initiative and inscribed titling of pioneer artist Liu Kang, the Singapore Nanyang Artists Society cultivates fine arts education, national grade standards, and ASEAN creative dialogue.",
    "about.story_provenance": "Founding Provenance",
    "about.story_title": "The Nanyang Heritage Since 2002",
    "about.story_quote": "“新加坡南洋美术家协会创立于2002年。由新加坡先驱艺术家刘抗先生亲自倡导与题名，协会数十年来矢志不渝，弘扬南洋画派精神，推动传统书画与现代美术教育在狮城及南洋大地的深耕传播。”",
    "about.story_p1": "The Nanyang visual arts movement represents one of the most distinctive cultural syntheses in Asian modernism. Emerging in mid-20th-century Singapore, it harmonized European post-impressionist structures with traditional Chinese ink brushwork and Southeast Asian tropical colors.",
    "about.story_p2": "Today, the Society operates as a premier arts and grading institution, overseeing the National Visual Arts Grade Examination across Singapore test centres, hosting the prestigious Nanyang Star International Competition, and conducting masterclasses for aspiring youth and professional educators.",
    "about.mission_subtitle": "Institutional Philosophy",
    "about.mission_title": "The Three Academic Pillars",
    "about.mission_desc": "Guiding every studio syllabus, standard assessment, and international exchange.",
    "about.pillar1_title": "1. Academicism (学术求精)",
    "about.pillar1_desc": "Rigorous grounding in observational fundamentals: classical chiaroscuro, proportion, bone-brush rhythm in Chinese calligraphy, and ink-wash dynamics.",
    "about.pillar2_title": "2. Internationalism (国际交流)",
    "about.pillar2_desc": "Fostering cross-border dialogues through the Nanyang Star Competition, international touring exhibitions, and artistic residencies across ASEAN, China, and Europe.",
    "about.pillar3_title": "3. Passion & Lifelong Learning (以美育人)",
    "about.pillar3_desc": "Nurturing creative intellect from early childhood sensory art to senior masterclasses, building lifelong visual literacy and cultural appreciation.",
    "about.leadership_subtitle": "Governance",
    "about.leadership_title": "Executive Board & Leadership",
    "about.leadership_desc": "Guided by dedicated arts leaders, master painters, and cultural educators.",
    "about.faculty_subtitle": "Master Roster",
    "about.faculty_title": "Artists, Faculty & Academic Advisors",
    "about.faculty_desc": "Senior adjudicators, ink masters, and studio mentors.",
    "about.societies_subtitle": "Official Affiliations & Strategic Partnerships",
    "about.societies_title": "Art Societies & Institutional Alliance",
    "about.societies_desc": "Uniting with Singapore's apex fine arts federations, pioneer scholarly academies, and premier youth creative studios.",
    "about.societies_filter_all": "All Partners",
    "about.societies_cat_fine_arts": "🎨 Fine Art Societies & Federations",
    "about.societies_cat_academic": "🏫 Academic & Language Institutions",
    "about.societies_cat_youth": "🧒 Youth Education & Creative Studios",
    "about.societies_view_portal": "Official Partner Portal",
    "about.societies_explore_more": "Explore Alliance",
    "about.timeline_subtitle": "Chronological Progress",
    "about.timeline_title": "Milestones & Collaborative Lineage (2012–2026)",
    "about.timeline_desc": "Tracing landmark exhibitions, cross-border initiatives, and examination growth.",
    "about.provenance_note": "<strong>Archival Provenance Note (历史资料说明):</strong> Milestones between 2012 and 2015 reflect collaborative origin materials (including KEC Singapore, SmartKidz Asia, Budding Aces, and regional missions) and are presented transparently as collaborative lineage pending final client confirmation. Subsequent milestones from 2018 onwards represent official Singapore Nanyang Artists Society landmark records.",
    "about.cta_title": "Connect with Society Secretariat",
    "about.cta_desc": "For institutional partnerships, academic exchanges, and course enquiries, reach out to our office.",
    "about.cta_btn1": "Submit General Enquiry →",
    "about.cta_btn2": "Browse Studio Courses",

    // Nanyang Star Competition Full Content (EN)
    "comp.hero_badge_flagship": "Flagship International Biennial",
    "comp.hero_badge_exchange": "Global Youth Cultural Exchange",
    "comp.hero_title": "Nanyang Star International Children's Art Competition",
    "comp.hero_desc": "A premier international youth art biennial celebrating pure creative imagination, environmental responsibility, and cultural heritage from young creators across Singapore, ASEAN, and globally.",
    "comp.hero_btn_enter": "📝 Submit 2026 Entry (Open Call)",
    "comp.hero_btn_archive": "🏆 2020 Laureate Archive",
    "comp.call_badge": "Current Biennial Edition",
    "comp.call_title": "2026 Open Call: \"Green Earth, Resilient Future\"",
    "comp.call_desc": "The 2026 edition challenges young minds to envision sustainable habitats, tropical biodiversity, clean oceans, and harmonious cities. Open to creators aged 4 to 16 in traditional ink, oil pastel, watercolor, gouache, and patented 3D origami sculpture.",
    "comp.call_deadline": "<strong>Submission Deadline:</strong> 31 October 2026",
    "comp.call_period": "<strong>Exhibition Period:</strong> December 2026 (Jurong East & Victoria Gallery)",
    "comp.call_eligibility": "<strong>Eligibility:</strong> Singapore candidates and international submissions",
    "comp.call_btn": "Enter 2026 Competition →",
    "comp.div_subtitle": "Competition Structure",
    "comp.div_title": "Age Divisions & Honours System",
    "comp.div_desc": "Fair, proctored adjudication grouped by developmental stage.",
    "comp.div_a_title": "Junior Group A",
    "comp.div_a_age": "Ages 4–6",
    "comp.div_a_desc": "Sensory perception, spontaneous color joy, and original storytelling.",
    "comp.div_b_title": "Junior Group B",
    "comp.div_b_age": "Ages 7–9",
    "comp.div_b_desc": "Observational detail, dynamic composition, and multi-medium exploration.",
    "comp.div_c_title": "Intermediate Group",
    "comp.div_c_age": "Ages 10–12",
    "comp.div_c_desc": "Spatial perspective, ink tonal nuance, and structural coherence.",
    "comp.div_d_title": "Senior Youth Group",
    "comp.div_d_age": "Ages 13–16",
    "comp.div_d_desc": "Concept depth, stylistic signature, and advanced craftsmanship.",
    "comp.archive_subtitle": "Archival Showcase",
    "comp.archive_title": "2020 \"Looking to the Future\" Winner Archive",
    "comp.archive_desc": "2020年首届“放眼未来”南洋之星少儿美术大赛获奖作品与名录。",
    "comp.filter_all": "All Laureates",
    "comp.filter_grand": "Grand Prize Winners",
    "comp.filter_gold": "Gold Award",
    "comp.filter_silver": "Silver Award",
    "comp.poster_subtitle": "Historical Provenance",
    "comp.poster_title": "2020 Exhibition Poster & Calligraphy Inscription",
    "comp.poster_heading": "2020 \"Looking to the Future\" International Children's Art Exhibition",
    "comp.poster_desc": "Held across Singapore and regional satellite galleries, showcasing hundreds of exceptional children's artworks spanning traditional Chinese calligraphy, ink wash, sketching, and watercolor.",

    // Home Disciplines (EN)
    "home.disciplines_subtitle": "Curriculum Framework",
    "home.disciplines_title": "Visual Arts Disciplines & Pathways",
    "home.disciplines_desc": "Structured artistic progression from sensory childhood discovery to academic mastery.",
    "home.pathway1_title": "Fine Arts",
    "home.pathway1_zh": "纯美术与学院素描",
    "home.pathway1_desc": "Academic pencil sketching, plaster bust anatomical studies, watercolor washes, and Western oil compositions.",
    "home.pathway2_title": "Heritage Arts",
    "home.pathway2_zh": "中国画与传统书法",
    "home.pathway2_desc": "Soft/hard pen calligraphy, Yan & Liu regular script, Shanshui landscapes, and Lingnan flower-and-bird painting.",
    "home.pathway3_title": "Youth Arts",
    "home.pathway3_zh": "少儿智力美术与卡通",
    "home.pathway3_desc": "Sensory intellectual art, imaginative cartoon illustration, color theory, and patented 3D plastic origami sculpture.",
    "home.pathway4_title": "Professional Certification",
    "home.pathway4_zh": "全国考级与师资认证",
    "home.pathway4_desc": "National 1–9 grade assessment tracks, examination syllabus benchmarking, and professional art educator qualifications.",
    "home.learn_more": "Learn More →",

    // Digital Gallery
    "gallery.curated_badge": "Curated Online Museum",
    "gallery.hero_title": "Digital Art Gallery & Master Roster",
    "gallery.hero_subtitle": "Nanyang Art Digital Museum · Master Faculty & Student Laureates (30 Authentic Works)",
    "gallery.hero_desc": "Featuring 30 authentic division artworks: Singapore Nanyang (1–10), Singapore KEC (11–20), and China Division (21–30).",
    "gallery.view_mode_label": "Gallery View Mode:",
    "gallery.mode_masonry": "🏛️ Masonry Grid",
    "gallery.mode_editorial": "📖 Editorial Salon",
    "gallery.mode_fullscreen": "🎬 Immersion Darkroom",
    "gallery.search_placeholder": "Search by title (e.g. Mountain Ridge), artist name, medium, or curatorial notes...",
    "gallery.reset_btn": "↺ Reset 7-Axis Filters",
    "gallery.lbl_category": "Category:",
    "gallery.opt_cat_all": "All Categories",
    "gallery.opt_cat_fine": "Fine Arts",
    "gallery.opt_cat_heritage": "Heritage Arts",
    "gallery.opt_cat_youth": "Youth Arts",
    "gallery.lbl_artist": "Artist:",
    "gallery.opt_art_all": "All Creators",
    "gallery.opt_art_master": "Master Faculty",
    "gallery.opt_art_laureate": "Student Laureates",
    "gallery.lbl_discipline": "Discipline:",
    "gallery.opt_disc_all": "All Disciplines",
    "gallery.opt_disc_oil": "Oil Painting",
    "gallery.opt_disc_chinese": "Chinese Painting",
    "gallery.opt_disc_calligraphy": "Chinese Calligraphy",
    "gallery.opt_disc_sketch": "Academic Sketching",
    "gallery.opt_disc_watercolor": "Watercolor",
    "gallery.opt_disc_children": "Children Art",
    "gallery.lbl_year": "Year:",
    "gallery.opt_year_all": "All Years",
    "gallery.lbl_division": "Division / Region:",
    "gallery.opt_div_all": "All Divisions (全部分区)",
    "gallery.opt_div_sg": "Singapore Nanyang (南洋展区 1–10)",
    "gallery.opt_div_kec": "Singapore KEC (KEC展区 11–20)",
    "gallery.opt_div_cn": "China Division (中国展区 21–30)",
    "gallery.lbl_exhibition": "Exhibition:",
    "gallery.opt_exh_all": "All Exhibitions",
    "gallery.opt_exh_fas": "FAS Annual Salon",
    "gallery.opt_exh_retro": "Masters Retrospective",
    "gallery.opt_exh_laur": "Nanyang Star Laureates",
    "gallery.high_res_note": "High-Resolution Museum Scans with Color Calibration · Click any artwork for pan/zoom",

    // Footer & System
    "footer.manifesto": "The Singapore Nanyang Artists Society is the premier apex institution dedicated to heritage visual arts, standardized 1–9 grade examinations, and international youth creativity.",
    "footer.hq_address": "Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135",
    "footer.contact_phone": "+65 6899 0828",
    "footer.contact_email": "secretariat@nanyangartists.org.sg",
    "footer.copyright": "© 2026 Singapore Nanyang Artists Society. All rights reserved.",
    "footer.pdpa": "Personal Data Protection Act (PDPA) Compliant"
  },

  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.about": "关于协会",
    "nav.about_story": "协会故事与使命",
    "nav.about_history": "历史沿革与刘抗题词",
    "nav.about_team": "名家顾问与团队",
    "nav.about_societies": "美协联盟网络",
    "nav.courses": "艺术课程",
    "nav.courses_all": "全部课程总览",
    "nav.courses_finder": "课程智能匹配",
    "nav.grade": "考级中心",
    "nav.grade_path": "1至9级考级体系",
    "nav.grade_viewer": "评分标准查看器",
    "nav.grade_centres": "认证考点查询",
    "nav.grade_verify": "证书真伪验证",
    "nav_nanyang_star": "南洋之星",
    "nav.nanyang_star": "南洋之星",
    "nav.nanyang.star": "南洋之星",
    "nav.nanyang_star_hub": "大赛官方专区",
    "nav.nanyang_star_winners": "历届荣誉榜",
    "nav.nanyang_star_submit": "作品提交入口",
    "nav.societies": "美协联盟",
    "nav.gallery": "数字美术馆",
    "nav.news": "新闻动态",
    "nav.resources": "资源大纲",
    "nav.contact": "联系我们",
    "cta.enquire": "课程咨询",
    "cta.register": "立即报名",

    // Common Actions
    "btn.enquire": "课程咨询",
    "btn.register": "立即报名",
    "btn.download": "下载官方文件",
    "btn.preview": "在线预览",
    "btn.submit": "提交申请",
    "btn.filter": "筛选结果",
    "btn.reset": "重置筛选",
    "btn.back": "返回上一页",
    "btn.next": "下一步",
    "btn.print": "打印凭证",
    "btn.view_details": "查看详情",
    "btn.read_more": "阅读全文",
    "btn.close": "关闭",

    // Course UI
    "course.category": "专业门类",
    "course.level": "学习阶段",
    "course.age_group": "招生年龄",
    "course.duration": "学期周期",
    "course.schedule": "上课时间",
    "course.instructor": "主讲导师",
    "course.learning_outcomes": "核心教学目标",
    "course.syllabus": "阶段培养大纲",
    "course.fee_note": "课表与材料资助方案请咨询协会秘书处",

    // Grade Examination UI
    "grade.hero_title": "全国美术等级考试官方平台",
    "grade.disciplines": "考级六大专业",
    "grade.levels": "1至9级考级标准",
    "grade.test_centres": "认证考点查询",
    "grade.criteria": "评分考核标准",
    "grade.verification": "证书真伪查询系统",
    "grade.pass": "合格",
    "grade.merit": "良好",
    "grade.distinction": "优秀",

    // Competition UI
    "comp.nanyang_star": "“南洋之星”国际少儿美术大赛",
    "comp.call_for_entries": "全球征稿正式启幕",
    "comp.age_groups": "四大参赛组别",
    "comp.individual_reg": "个人在线报名通道",
    "comp.team_reg": "团体/机构批量登记",
    "comp.hall_of_fame": "历届获奖荣誉榜",
    "comp.grand_prize": "“南洋之星”特等奖",
    "comp.gold_award": "金奖",
    "comp.silver_award": "银奖",

    // Gallery UI
    "gallery.title": "数字美术馆与线上展厅",
    "gallery.masonry": "瀑布流布局",
    "gallery.editorial": "典雅沙龙模式",
    "gallery.fullscreen": "沉浸式暗室",
    "gallery.search_placeholder": "输入作品名、艺术家或画种搜索...",
    "gallery.all_disciplines": "全部画种",

    // Gallery Filter Labels (ZH)
    "gallery.filter.category": "画种：",
    "gallery.filter.artist": "创作者：",
    "gallery.filter.discipline": "专业：",
    "gallery.filter.year": "年份：",
    "gallery.filter.competition": "赛事：",
    "gallery.filter.exhibition": "展览：",
    "gallery.filter.allCategories": "全部类别",
    "gallery.filter.fineArts": "纯美术",
    "gallery.filter.heritageArts": "传统非遗",
    "gallery.filter.youthArts": "少儿美术",
    "gallery.filter.allCreators": "全部创作者",
    "gallery.filter.masterFaculty": "名家导师",
    "gallery.filter.studentLaureates": "获奖学员",
    "gallery.filter.allDisciplines": "全部画种",
    "gallery.filter.allYears": "全部年份",
    "gallery.filter.allCompetitions": "全部赛事",
    "gallery.filter.facultyCollection": "名家馆藏",
    "gallery.filter.allExhibitions": "全部展览",

    // News Filter & Sort (ZH)
    "news.filter.all": "全部动态",
    "news.filter.competition": "大赛快讯",
    "news.filter.announcements": "官方公告",
    "news.filter.academic": "学术沙龙",
    "news.filter.pedagogy": "美育专栏",
    "news.sort.newest": "最新优先",
    "news.sort.oldest": "最旧优先",

    // Home Page Hero & Gates (ZH)
    "home.hero_title": "以艺养心 · 启智树人 · 融贯中西",
    "home.hero_desc": "探索传统艺术薪传、全体系美术考级与国际大赛交流，为新加坡及全球青少年搭建卓越艺术殿堂。",
    "home.hero_explore": "探索全部艺术课程 →",
    "home.hero_nanyang_star": "了解南洋之星大赛",
    "home.gate_courses_title": "艺术课程",
    "home.gate_courses_desc": "水墨书画、学院素描、油画研习与少儿启智美术全阶梯培养。",
    "home.gate_courses_btn": "浏览课程总览 →",
    "home.gate_grade_title": "全国考级",
    "home.gate_grade_desc": "六大专业1至9级标准化考核认证，新加坡权威考点督导。",
    "home.gate_grade_btn": "考级体系指南 →",
    "home.gate_star_title": "南洋之星",
    "home.gate_star_desc": "国际旗舰少儿美术赛事、全球巡展与最高荣誉殿堂。",
    "home.gate_star_btn": "大赛官方专区 →",
    "home.gate_events_title": "展赛活动",
    "home.gate_events_desc": "名家大师工坊、传统碑帖研习与美术馆年度沙龙活动日程。",
    "home.gate_events_btn": "活动日历 →",
    "home.disciplines_title": "四大艺术专业与培养路径",
    "home.disciplines_desc": "从少儿感官启蒙到学院派名家造就的严谨阶梯体系。",
    "home.featured_courses_title": "精选专业艺术课程",
    "home.featured_courses_desc": "由资深名家导师亲自执教的工作室制精品课堂。",
    "home.grade_path_title": "全国美术等级考试1至9级标准体系",
    "home.grade_path_desc": "涵盖六大认证专业的标准化晋级考核大纲。点击对应级别查看详细评分标准与试卷要求。",
    "home.star_spotlight_title": "“南洋之星”国际少儿美术大赛荣誉展",
    "home.faculty_spotlight_title": "名家顾问与学术导师",
    "home.faculty_spotlight_desc": "新加坡权威艺术家、书法家与美育专家引领的专业教学团队。",

    // Courses Extended (ZH)
    "courses.search_placeholder": "按课程名称、画种或媒介搜索...",
    "courses.filter_category_label": "专业门类：",
    "courses.cat_all": "全部专业门类",
    "courses.cat_fine": "纯美术与素描",
    "courses.cat_heritage": "传统书画与国画",
    "courses.cat_youth": "少儿启智美术",
    "courses.cat_cert": "师资研修认证",
    "courses.filter_age_label": "招生年龄阶段：",
    "courses.age_all": "全部年龄阶段",
    "courses.age_children": "儿童启智 (4–8岁)",
    "courses.age_teens": "青少年进阶 (9–15岁)",
    "courses.age_adults": "成人与终身研习 (16岁以上)",
    "courses.filter_level_label": "难度研习阶段：",
    "courses.level_all": "全部专业阶段",
    "courses.level_beginner": "入门基础启蒙",
    "courses.level_intermediate": "中阶技法进阶",
    "courses.level_advanced": "高阶名家研修",
    "courses.filter_goal_label": "培养目标：",
    "courses.goal_all": "全部培养方向",
    "courses.goal_exam": "全国美术考级标准化考核",
    "courses.goal_leisure": "艺术修养与兴趣创作",
    "courses.goal_teaching": "专业艺术教师资格研修",
    "courses.small_group_badge": "小班精品工作室教学 (每班限12人)",
    "courses.hero_quiz_cta": "🎯 课程智能匹配测评",
    "courses.hero_consult_cta": "预约工作室课程咨询",
    "courses.quiz_title": "不确定适合哪门艺术课程？",
    "courses.quiz_subtitle": "仅需回答3个简明问题，即可为您智能匹配适合年龄与目标的专业艺术路径。",
    "courses.quiz_step1": "测评第 1 步 / 共 3 步",
    "courses.quiz_q1": "本次艺术课程面向哪位学员？",
    "courses.quiz_opt_child": "👶 幼儿童年 (4–8岁)",
    "courses.quiz_opt_teen": "🎒 青少年 (9–15岁)",
    "courses.quiz_opt_adult": "🎨 成人/教育者 (16岁+)",

    // Nanyang Star & Subnav (ZH)
    "nanyang_star.subnav_call": "2026征稿简章",
    "nanyang_star.subnav_divisions": "组别与奖项",
    "nanyang_star.subnav_winners": "往届荣誉典藏",
    "nanyang_star.subnav_poster": "历届官方海报",
    "nanyang_star.subnav_submit": "作品在线报名",
    "comp.submit.badge": "2026双年展官方投稿通道",
    "comp.submit.title": "南洋之星国际少儿美术大赛在线报名",
    "comp.submit.desc": "请如实填写参赛选手信息并上传或附上参赛作品信息。",
    "comp.submit.name_label": "参赛选手姓名 (英文/拼音) *：",
    "comp.submit.zh_name_label": "中文姓名 (选填)：",
    "comp.submit.division_label": "参赛组别 *：",
    "comp.submit.medium_label": "画种分类 *：",
    "comp.submit.title_label": "作品名称 *：",
    "comp.submit.phone_label": "家长/联系电话 *：",
    "comp.submit.email_label": "电子邮箱 *：",
    "comp.submit.statement_label": "创作理念与作品说明：",
    "comp.submit.btn": "提交参赛报名 →",
    "comp.submit.div_placeholder": "请选择参赛组别",
    "comp.submit.div_a": "幼儿组 A (4–6岁)",
    "comp.submit.div_b": "少儿初级组 B (7–9岁)",
    "comp.submit.div_c": "少儿高级组 C (10–12岁)",
    "comp.submit.div_d": "青年组 D (13–16岁)",
    "comp.submit.med_mixed": "综合材料 / 油画棒",
    "comp.submit.med_ink": "传统水墨 / 书法",
    "comp.submit.med_sketch": "素描 / 铅笔造型",
    "comp.submit.med_watercolor": "水彩 / 水粉画",
    "comp.submit.med_origami": "立体纸雕艺术",

    // About Subnav (ZH)
    "about.subnav_story": "协会故事",
    "about.subnav_mission": "使命与愿景",
    "about.subnav_leadership": "名家顾问委员会",
    "about.subnav_faculty": "导师团队",
    "about.subnav_community": "美协联盟",
    "about.subnav_timeline": "历史沿革 (2012–2026)",

    // Grade Subnav (ZH)
    "grade.subnav_hard_pen": "硬笔书法 (1–9级)",
    "grade.subnav_soft_pen": "软笔书法 (1–9级)",
    "grade.subnav_compare": "⚖️ 标准对比查看器",
    "grade.subnav_centres": "📍 认证考点查询",
    "grade.subnav_verify": "🔍 证书真伪查询",
    "grade.subnav_enquire": "考务报考咨询",

    // About Page Full Content (ZH-SG)
    "about.hero_badge_year": "创立于2002年",
    "about.hero_badge_titling": "先驱艺术家刘抗题名",
    "about.hero_title": "传承、使命与艺术团队",
    "about.hero_subtitle": "以艺养心 · 启智树人 · 融贯中西",
    "about.hero_desc": "新加坡南洋美术家协会创立于2002年，由新加坡先驱艺术家刘抗先生亲自倡导与题名，深耕南洋美术教育、全国考级认证与东盟艺术文化交流。",
    "about.story_provenance": "历史溯源",
    "about.story_title": "立足狮城 · 薪传南洋美育二十余载",
    "about.story_quote": "“新加坡南洋美术家协会创立于2002年。由新加坡先驱艺术家刘抗先生亲自倡导与题名，协会数十年来矢志不渝，弘扬南洋画派精神，推动传统书画与现代美术教育在狮城及南洋大地的深耕传播。”",
    "about.story_p1": "南洋美术运动是亚洲现代主义艺术中最具特色与生命力的文化融汇之一。20世纪中叶在新加坡萌芽，巧妙融汇了欧洲后印象派结构、中国传统水墨笔韵以及东南亚热带浓郁色彩。",
    "about.story_p2": "如今，学会作为新加坡首屈一指的专业美术与考级学术机构，统筹主管新加坡全岛考点的全国少儿及成人美术考级、主办享誉区域的“南洋之星”国际少儿美术大赛，并持续为广大青年学子与专业教育工作者举办大师研修班。",
    "about.mission_subtitle": "立会宗旨与办学理念",
    "about.mission_title": "三大办学与美育基石",
    "about.mission_desc": "指引每一门工作室课程、标准化考核与国际艺术交流。",
    "about.pillar1_title": "一、学术求精 · 技道并重",
    "about.pillar1_desc": "严谨扎实的写实造型基本功：西方古典光影比例、传统书法骨法用笔与水墨韵律。",
    "about.pillar2_title": "二、放眼国际 · 薪火相传",
    "about.pillar2_desc": "以“南洋之星”国际少儿美术大赛为桥梁，推动东盟、中国及欧洲多边巡展与艺术家驻留交流。",
    "about.pillar3_title": "三、以美育人 · 终身研习",
    "about.pillar3_desc": "从少儿智力启蒙美术到中老年名家研习班，激发艺术创造力，涵养终身审美与文化认同。",
    "about.leadership_subtitle": "理事会架构",
    "about.leadership_title": "名家顾问委员会与领导层",
    "about.leadership_desc": "由资深书画家、文化学者与艺术教育家引领的专业决策团队。",
    "about.faculty_subtitle": "导师名录",
    "about.faculty_title": "名家顾问、学术导师与工作室导师",
    "about.faculty_desc": "新加坡资深考级评审专家、水墨名家与工作室专业导师。",
    "about.societies_subtitle": "官方联盟机构与战略伙伴",
    "about.societies_title": "美术协会与学术机构官方联盟",
    "about.societies_desc": "携手新加坡国家最高美术联合总会、资深先驱艺术研究会、权威学术学府及优质少儿美育工坊。",
    "about.societies_filter_all": "全部联盟机构",
    "about.societies_cat_fine_arts": "🎨 美术协会与联合总会",
    "about.societies_cat_academic": "🏫 学术与语言培训学府",
    "about.societies_cat_youth": "🧒 少儿美育与创意工坊",
    "about.societies_view_portal": "官方合作通道",
    "about.societies_explore_more": "了解更多联盟详情",
    "about.timeline_subtitle": "历史纪程",
    "about.timeline_title": "历史沿革与合作历程 (2012–2026)",
    "about.timeline_desc": "记录学会重要展览、跨国交流项目与全国美术考级拓展历程。",
    "about.provenance_note": "<strong>历史档案资料说明：</strong>2012至2015年里程碑记录反映了早期联合发起与合作活动（含新加坡KEC、SmartKidz Asia、Budding Aces及区域艺术项目），作为合作历史源流客观展示。2018年起均为新加坡南洋美术家协会官方纪程。",
    "about.cta_title": "联系学会秘书处",
    "about.cta_desc": "机构合作、学术讲座、考点申请或课程咨询，欢迎联络我们。",
    "about.cta_btn1": "提交在线咨询 →",
    "about.cta_btn2": "浏览工作室课程",

    // Nanyang Star Competition Full Content (ZH-SG)
    "comp.hero_badge_flagship": "旗舰级国际双年展",
    "comp.hero_badge_exchange": "国际青少年艺术文化交流",
    "comp.hero_title": "南洋之星国际少儿美术大赛",
    "comp.hero_desc": "旗舰级国际青少年艺术双年盛典，汇聚新加坡、东盟及全球少儿的纯真想象力、生态环保意识与卓越艺术才华。",
    "comp.hero_btn_enter": "📝 立即报名2026届大赛",
    "comp.hero_btn_archive": "🏆 2020历届获奖作品名录",
    "comp.call_badge": "本届大赛规程",
    "comp.call_title": "2026第四届大赛征稿主题：“绿色地球 · 坚韧未来”",
    "comp.call_desc": "2026届大赛鼓励青少年观察生态环境、探索热带生物多样性与人与自然和谐共生。面向4至16岁少年儿童开放，涵盖传统水墨、油画棒、水彩、素描及立体纸雕等多种媒介。",
    "comp.call_deadline": "<strong>征稿截止日期：</strong>2026年10月31日",
    "comp.call_period": "<strong>年度展演日期：</strong>2026年12月 (裕廊东中心与维多利亚艺术展厅)",
    "comp.call_eligibility": "<strong>参赛资格：</strong>新加坡在读学生及海外国际青少年均可参赛",
    "comp.call_btn": "前往在线作品报名 →",
    "comp.div_subtitle": "赛组架构",
    "comp.div_title": "组别设置与奖项荣誉体系",
    "comp.div_desc": "遵循青少年儿童生理与心理认知发展规律的阶梯式专业评审。",
    "comp.div_a_title": "少儿初级组 A",
    "comp.div_a_age": "4–6 岁",
    "comp.div_a_desc": "重在感官体验、纯真色彩感知与天马行空的童趣表达。",
    "comp.div_b_title": "少儿初级组 B",
    "comp.div_b_age": "7–9 岁",
    "comp.div_b_desc": "注重造型观察、画面构图动态与多元综合材料表现力。",
    "comp.div_c_title": "少儿中级组 C",
    "comp.div_c_age": "10–12 岁",
    "comp.div_c_desc": "强调空间透视、色彩水墨明暗层次与画面思想表达。",
    "comp.div_d_title": "青年高级组 D",
    "comp.div_d_age": "13–16 岁",
    "comp.div_d_desc": "突出主题深度、个人艺术风格探索与高阶绘画技法。",
    "comp.archive_subtitle": "历届档案",
    "comp.archive_title": "2020首届“放眼未来”获奖作品名录",
    "comp.archive_desc": "2020年首届“放眼未来”南洋之星少儿美术大赛获奖作品与名录。",
    "comp.filter_all": "全部获奖作品",
    "comp.filter_grand": "特等奖作品",
    "comp.filter_gold": "金奖作品",
    "comp.filter_silver": "银奖作品",
    "comp.poster_subtitle": "文献存照",
    "comp.poster_title": "2020展览海报与先驱题词文献",
    "comp.poster_heading": "2020“放眼未来”国际少儿美术大展",
    "comp.poster_desc": "巡回展出于新加坡全岛及区域艺术场馆，集中展出数百幅少儿书法、水墨画、铅笔素描与水彩佳作。",

    // Home Disciplines (ZH-SG)
    "home.disciplines_subtitle": "专业学科体系",
    "home.disciplines_title": "四大专业艺术发展路径",
    "home.disciplines_desc": "从童年感官启蒙到学术造型大师班的科学阶梯式体系。",
    "home.pathway1_title": "纯美术",
    "home.pathway1_zh": "纯美术与学院素描",
    "home.pathway1_desc": "古典石膏像解剖素描、色彩空间光影透视、水彩透明渲染及布面油画创研。",
    "home.pathway2_title": "传统书画",
    "home.pathway2_zh": "中国画与传统书法",
    "home.pathway2_desc": "软硬笔楷隶行草名碑临摹、传统宋元山水皴法、岭南没骨花鸟画及篆刻研习。",
    "home.pathway3_title": "少儿美育",
    "home.pathway3_zh": "少儿智力美术与卡通",
    "home.pathway3_desc": "少儿综合感官美术启蒙、创意故事绘本插画、色彩调和及国家专利立体纸雕。",
    "home.pathway4_title": "考级认证",
    "home.pathway4_zh": "全国考级与师资认证",
    "home.pathway4_desc": "新加坡全国1–9级美术与书法专业考评体系、考级大纲指引与注册美术师资培训。",
    "home.learn_more": "了解详情 →",

    // Digital Gallery
    "gallery.curated_badge": "馆藏数字美术馆",
    "gallery.hero_title": "数字艺术美术馆与名家名录",
    "gallery.hero_subtitle": "南洋艺术数字美术馆 · 名家与学员杰作展 (30幅典藏真迹)",
    "gallery.hero_desc": "展出30幅真实赛区典藏佳作：新加坡南洋展区 (1–10)、新加坡KEC展区 (11–20) 与中国展区 (21–30)。",
    "gallery.view_mode_label": "展厅浏览模式：",
    "gallery.mode_masonry": "🏛️ 瀑布流展墙",
    "gallery.mode_editorial": "📖 典藏画刊",
    "gallery.mode_fullscreen": "🎬 沉浸暗房",
    "gallery.search_placeholder": "输入画作标题（如：崇山叠翠）、艺术家、画种或策展说明...",
    "gallery.reset_btn": "↺ 重置全部筛选",
    "gallery.lbl_category": "艺术分类：",
    "gallery.opt_cat_all": "全部艺术门类",
    "gallery.opt_cat_fine": "纯美术与素描",
    "gallery.opt_cat_heritage": "传统书画国画",
    "gallery.opt_cat_youth": "少儿创意美术",
    "gallery.lbl_artist": "创作者：",
    "gallery.opt_art_all": "全部创作者",
    "gallery.opt_art_master": "名家导师展品",
    "gallery.opt_art_laureate": "大赛获奖杰作",
    "gallery.lbl_discipline": "画种媒介：",
    "gallery.opt_disc_all": "全部画种",
    "gallery.opt_disc_oil": "油画工作室",
    "gallery.opt_disc_chinese": "中国画水墨",
    "gallery.opt_disc_calligraphy": "软硬笔书法",
    "gallery.opt_disc_sketch": "学院素描造型",
    "gallery.opt_disc_watercolor": "水彩色彩",
    "gallery.opt_disc_children": "少儿创意与折纸",
    "gallery.lbl_year": "创作年份：",
    "gallery.opt_year_all": "全部年份",
    "gallery.lbl_division": "赛区展区：",
    "gallery.opt_div_all": "全部分区展区",
    "gallery.opt_div_sg": "新加坡南洋展区 (1–10)",
    "gallery.opt_div_kec": "新加坡KEC展区 (11–20)",
    "gallery.opt_div_cn": "中国展区 (21–30)",
    "gallery.lbl_exhibition": "历届展览：",
    "gallery.opt_exh_all": "全部展览",
    "gallery.opt_exh_fas": "美术总会年度沙龙",
    "gallery.opt_exh_retro": "名家顾问回顾展",
    "gallery.opt_exh_laur": "南洋之星荣誉典藏展",
    "gallery.high_res_note": "博物馆级高保真微喷色彩校准扫描 · 点击任意画作可高倍缩放与全屏漫游",

    // Footer & System
    "footer.manifesto": "新加坡南洋美术家协会是致力于南洋传统艺术薪传、全国标准化1–9级美术考级及国际少儿艺术交流的权威学术机构。",
    "footer.hq_address": "新加坡裕廊门路大牌135号#03-333/335 邮编600135",
    "footer.contact_phone": "+65 6899 0828",
    "footer.contact_email": "secretariat@nanyangartists.org.sg",
    "footer.copyright": "© 2026 新加坡南洋美术家协会 版权所有",
    "footer.pdpa": "符合新加坡个人数据保护法 (PDPA) 规范"
  }
};

export const SUPPORTED_LANGUAGES = [
  "en",
  "zh-SG"
];

// Alias zh-SG to zh dictionary for seamless Singapore Chinese resolution
DICTIONARIES['zh-SG'] = DICTIONARIES.zh;

export class I18nService {
  constructor() {
    this.currentLanguage = 'en';
    this.storageKey = 'nas_user_language_pref';
    this.supportedLanguages = [
      { code: 'en', label: 'English', nativeLabel: 'English', short: 'EN' },
      { code: 'zh-SG', label: 'Singapore Chinese', nativeLabel: '中文', short: '中文' }
    ];
  }

  normalizeLang(code) {
    if (!code) return 'en';
    const c = String(code).toLowerCase().trim();
    if (c === 'zh-sg' || c === 'zh_sg' || c === 'zhsg' || c === 'zh' || c === 'chinese') {
      return 'zh-SG';
    }
    return 'en';
  }

  init() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.currentLanguage = this.normalizeLang(saved);
      }
    } catch (e) {
      console.warn('[I18nService] Could not read localStorage preference:', e);
    }

    this.applyLanguageToDocument();
    this.translateDOM();
  }

  getLanguage() {
    return this.currentLanguage;
  }

  getLang() {
    return this.currentLanguage;
  }

  setLanguage(langCode) {
    const normalized = this.normalizeLang(langCode);
    this.currentLanguage = normalized;

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, normalized);
      }
    } catch (e) {
      console.warn('[I18nService] Could not write localStorage preference:', e);
    }

    this.applyLanguageToDocument();
    this.translateDOM();

    // Dispatch Custom Event for Active Component Re-renders
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nas:languageChanged', {
        detail: { language: normalized }
      }));
    }
  }

  applyLanguageToDocument() {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('lang', this.currentLanguage);
  }

  t(key, fallback = '') {
    if (!key) return fallback;

    const lang = this.currentLanguage || 'en';
    const isZh = (lang === 'zh-SG' || lang === 'zh');
    const dict = isZh ? (DICTIONARIES['zh-SG'] || DICTIONARIES.zh) : DICTIONARIES.en;
    const enDict = DICTIONARIES.en;

    const altDotKey = key.replace(/_/g, '.');
    const altUnderscoreKey = key.replace(/\./g, '_');
    const altFirstDotKey = key.replace(/^([a-z0-9]+)_/, '$1.');

    // 1. Check in Current Language Dictionary
    if (dict) {
      if (dict[key] !== undefined && dict[key] !== '') return dict[key];
      if (dict[altFirstDotKey] !== undefined && dict[altFirstDotKey] !== '') return dict[altFirstDotKey];
      if (dict[altDotKey] !== undefined && dict[altDotKey] !== '') return dict[altDotKey];
      if (dict[altUnderscoreKey] !== undefined && dict[altUnderscoreKey] !== '') return dict[altUnderscoreKey];
    }

    // 2. Graceful English Fallback
    if (enDict) {
      if (enDict[key] !== undefined && enDict[key] !== '') return enDict[key];
      if (enDict[altFirstDotKey] !== undefined && enDict[altFirstDotKey] !== '') return enDict[altFirstDotKey];
      if (enDict[altDotKey] !== undefined && enDict[altDotKey] !== '') return enDict[altDotKey];
      if (enDict[altUnderscoreKey] !== undefined && enDict[altUnderscoreKey] !== '') return enDict[altUnderscoreKey];
    }

    // 3. Final Graceful Fallback (never output undefined, null, or raw markers)
    if (fallback && !fallback.includes('undefined') && !fallback.includes('null') && !fallback.includes('[Pending')) {
      return fallback;
    }
    const clean = key.split(/[._]/).pop();
    return clean || '';
  }

  getField(entity, baseFieldName) {
    if (!entity) return '';

    const lang = this.currentLanguage || 'en';
    const isZh = (lang === 'zh-SG' || lang === 'zh');

    // 1. Support object map { en: '...', zhSG: '...', 'zh-SG': '...', zh: '...' }
    if (entity[baseFieldName] && typeof entity[baseFieldName] === 'object') {
      const obj = entity[baseFieldName];
      if (isZh) {
        return obj.zhSG || obj['zh-SG'] || obj.zh_sg || obj.zh || obj.en || '';
      }
      return obj.en || obj.zhSG || obj['zh-SG'] || obj.zh || '';
    }

    // 2. Direct property checks
    if (isZh) {
      if (entity[`${baseFieldName}_zhSG`]) return entity[`${baseFieldName}_zhSG`];
      if (entity[`${baseFieldName}_zh_sg`]) return entity[`${baseFieldName}_zh_sg`];
      if (entity[`${baseFieldName}_zh`]) return entity[`${baseFieldName}_zh`];
      if (entity[`${baseFieldName}_zh-SG`]) return entity[`${baseFieldName}_zh-SG`];
    }

    // 3. Fallback to English
    if (entity[`${baseFieldName}_en`]) {
      return entity[`${baseFieldName}_en`];
    }

    if (entity[baseFieldName] !== undefined && entity[baseFieldName] !== null) {
      return typeof entity[baseFieldName] === 'string' ? entity[baseFieldName] : '';
    }

    return '';
  }

  translateDOM(rootElement = null) {
    const target = rootElement || (typeof document !== 'undefined' ? document : null);
    if (!target) return;

    // Text elements
    const elements = target.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const val = this.t(key, el.textContent);
        if (val && val.includes('<') && val.includes('>')) {
          el.innerHTML = val;
        } else {
          el.textContent = val;
        }
      }
    });

    // Placeholders
    const placeholderEls = target.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key, el.getAttribute('placeholder')));
      }
    });

    // Titles / Tooltips
    const titleEls = target.querySelectorAll('[data-i18n-title]');
    titleEls.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        el.setAttribute('title', this.t(key, el.getAttribute('title')));
      }
    });
  }
}

export const i18n = new I18nService();

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
  });
}

