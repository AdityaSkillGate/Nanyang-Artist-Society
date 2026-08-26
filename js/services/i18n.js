/**
 * NANYANG ARTISTS SOCIETY — CENTRAL INTERNATIONALIZATION (i18n) SERVICE
 * Official 4-Language Support: English (EN), Chinese (ZH), Malay (MS), Tamil (TA).
 * LocalStorage persistence, Graceful English Fallback, Dynamic Entity Field Resolvers,
 * and Declarative DOM Translation Engine.
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
    "nav.nanyang_star": "Nanyang Star",
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
    "nav.nanyang_star": "南洋之星",
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

    // Footer & System
    "footer.manifesto": "新加坡南洋美术家协会是致力于南洋传统艺术薪传、全国标准化1–9级美术考级及国际少儿艺术交流的权威学术机构。",
    "footer.hq_address": "新加坡裕廊门路大牌135号#03-333/335 邮编600135",
    "footer.contact_phone": "+65 6899 0828",
    "footer.contact_email": "secretariat@nanyangartists.org.sg",
    "footer.copyright": "© 2026 新加坡南洋美术家协会 版权所有",
    "footer.pdpa": "符合新加坡个人数据保护法 (PDPA) 规范"
  },

  ms: {
    // Navigation
    "nav.home": "Laman Utama",
    "nav.about": "Mengenai Persatuan",
    "nav.about_story": "Kisah & Misi",
    "nav.about_history": "Sejarah & Liu Kang",
    "nav.about_team": "Kepimpinan & Pasukan",
    "nav.about_societies": "Rangkaian Seni",
    "nav.courses": "Kursus Seni",
    "nav.courses_all": "Katalog Semua Kursus",
    "nav.courses_finder": "Kuiz Pemilihan Kursus",
    "nav.grade": "Peperiksaan Gred",
    "nav.grade_path": "Laluan Gred 1–9",
    "nav.grade_viewer": "Paparan Penilaian",
    "nav.grade_centres": "Pusat Ujian Bertauliah",
    "nav.grade_verify": "Sahkan Sijil",
    "nav.nanyang_star": "Nanyang Star",
    "nav.nanyang_star_hub": "Hab Pertandingan",
    "nav.nanyang_star_winners": "Arkib Pemenang",
    "nav.nanyang_star_submit": "Hantar Karya",
    "nav.societies": "Persatuan",
    "nav.gallery": "Galeri Digital",
    "nav.news": "Berita & Pengumuman",
    "nav.resources": "Sumber & Arkib",
    "nav.contact": "Hubungi Kami",
    "cta.enquire": "Pertanyaan",
    "cta.register": "Daftar Sekarang",

    // Common Actions
    "btn.enquire": "Pertanyaan Kursus",
    "btn.register": "Daftar Sekarang",
    "btn.download": "Muat Turun Fail Rasmi",
    "btn.preview": "Pratonton Dokumen",
    "btn.submit": "Hantar Permohonan",
    "btn.filter": "Tapis Hasil",
    "btn.reset": "Tetapkan Semula",
    "btn.back": "Kembali",
    "btn.next": "Langkah Seterusnya",
    "btn.print": "Cetak Baucar",
    "btn.view_details": "Lihat Butiran",
    "btn.read_more": "Baca Lagi",
    "btn.close": "Tutup",

    // Course UI
    "course.category": "Kategori Kursus",
    "course.level": "Tahap Kemahiran",
    "course.age_group": "Umur Sasaran",
    "course.duration": "Tempoh Penggal",
    "course.schedule": "Jadual Kelas",
    "course.instructor": "Pengajar Utama",
    "course.learning_outcomes": "Hasil Pembelajaran Utama",
    "course.syllabus": "Peringkat Kurikulum",
    "course.fee_note": "Sila hubungi sekretariat untuk jadual dan bantuan yuran",

    // Grade Examination UI
    "grade.hero_title": "Peperiksaan Gred Seni Visual Kebangsaan",
    "grade.disciplines": "Disiplin Peperiksaan",
    "grade.levels": "Tahap Gred 1 hingga 9",
    "grade.test_centres": "Pusat Peperiksaan Bertauliah",
    "grade.criteria": "Kriteria Penilaian",
    "grade.verification": "Portal Pengesahan Sijil",
    "grade.pass": "Lulus",
    "grade.merit": "Lulus dengan Pujian",
    "grade.distinction": "Lulus dengan Cemerlang",

    // Competition UI
    "comp.nanyang_star": "Pertandingan Antarabangsa Nanyang Star",
    "comp.call_for_entries": "Panggilan Penyertaan Rasmi",
    "comp.age_groups": "Kumpulan Umur Pertandingan",
    "comp.individual_reg": "Pendaftaran Individu",
    "comp.team_reg": "Pendaftaran Kumpulan / Institusi",
    "comp.hall_of_fame": "Dewan Kemasyhuran Pemenang",
    "comp.grand_prize": "Trofi Utama Star of Nanyang",
    "comp.gold_award": "Anugerah Emas",
    "comp.silver_award": "Anugerah Perak",

    // Gallery UI
    "gallery.title": "Galeri Seni Digital & Muzium Dalam Talian",
    "gallery.masonry": "Susun Atur Masonry",
    "gallery.editorial": "Mod Salon Editorial",
    "gallery.fullscreen": "Bilik Gelap Skrin Penuh",
    "gallery.search_placeholder": "Cari karya seni, artis, atau disiplin...",
    "gallery.all_disciplines": "Semua Disiplin",

    // Gallery Filter Labels (MS)
    "gallery.filter.category": "Kategori:",
    "gallery.filter.artist": "Artis:",
    "gallery.filter.discipline": "Disiplin:",
    "gallery.filter.year": "Tahun:",
    "gallery.filter.competition": "Pertandingan:",
    "gallery.filter.exhibition": "Pameran:",
    "gallery.filter.allCategories": "Semua Kategori",
    "gallery.filter.fineArts": "Seni Halus",
    "gallery.filter.heritageArts": "Seni Warisan",
    "gallery.filter.youthArts": "Seni Belia",
    "gallery.filter.allCreators": "Semua Pencipta",
    "gallery.filter.masterFaculty": "Pengajar Utama",
    "gallery.filter.studentLaureates": "Pelajar Menang",
    "gallery.filter.allDisciplines": "Semua Disiplin",
    "gallery.filter.allYears": "Semua Tahun",
    "gallery.filter.allCompetitions": "Semua Pertandingan",
    "gallery.filter.facultyCollection": "Koleksi Pengajar",
    "gallery.filter.allExhibitions": "Semua Pameran",

    // News Filter & Sort (MS)
    "news.filter.all": "Semua Berita",
    "news.filter.competition": "Berita Pertandingan",
    "news.filter.announcements": "Pengumuman",
    "news.filter.academic": "Salon Akademik",
    "news.filter.pedagogy": "Pedagogi Seni",
    "news.sort.newest": "Terbaru Dahulu",
    "news.sort.oldest": "Tertua Dahulu",

    // Home Page Hero & Gates (MS)
    "home.hero_title": "Cipta. Belajar. Capai. Inspirasi.",
    "home.hero_desc": "Terokai pembelajaran seni visual, seni warisan, pembangunan kreatif, dan peluang berprestij untuk menyerlahkan bakat di Singapura dan antarabangsa.",
    "home.hero_explore": "Terokai Kursus Seni →",
    "home.hero_nanyang_star": "Ketahui Nanyang Star",
    "home.gate_courses_title": "Kursus Seni",
    "home.gate_courses_desc": "Asas lukisan dakwat Cina, lakaran akademik, cat minyak, dan seni intelek kanak-kanak.",
    "home.gate_courses_btn": "Lihat Katalog Kursus →",
    "home.gate_grade_title": "Peperiksaan Gred",
    "home.gate_grade_desc": "Penilaian standard Gred 1 hingga 9 yang diselia di pusat ujian bertauliah.",
    "home.gate_grade_btn": "Laluan Peperiksaan →",
    "home.gate_star_title": "Nanyang Star",
    "home.gate_star_desc": "Pertandingan seni belia antarabangsa utama, pameran rasmi, dan anugerah global.",
    "home.gate_star_btn": "Hab Pertandingan →",
    "home.gate_events_title": "Cari Acara",
    "home.gate_events_desc": "Bengkel masterclass, kaligrafi, dan jadual lawatan galeri tahunan.",
    "home.gate_events_btn": "Kalendar Acara →",
    "home.disciplines_title": "Disiplin & Laluan Seni Visual",
    "home.disciplines_desc": "Perkembangan seni berstruktur daripada penerokaan sensori kanak-kanak hingga kemahiran akademik.",
    "home.featured_courses_title": "Kursus Seni Visual Pilihan",
    "home.featured_courses_desc": "Kelas studio terpilih yang diajar oleh artis berpengalaman dan pengajar bertauliah.",
    "home.grade_path_title": "Laluan Peperiksaan Gred Seni Visual 1 hingga 9",
    "home.grade_path_desc": "Kemajuan peperiksaan piawai merentasi 6 disiplin yang disahkan. Klik mana-mana peringkat gred untuk melihat kriteria penilaian.",
    "home.star_spotlight_title": "Pertandingan Seni Kanak-kanak Antarabangsa Nanyang Star",
    "home.faculty_spotlight_title": "Pengajar Utama & Mentor Akademik",
    "home.faculty_spotlight_desc": "Artis, ahli kaligrafi, dan pendidik seni terkemuka Singapura yang memimpin studio persatuan.",

    // Footer & System
    "footer.manifesto": "Persatuan Artis Nanyang Singapura adalah institusi utama yang memupuk seni visual warisan, peperiksaan gred standard 1–9, dan kreativiti belia antarabangsa.",
    "footer.hq_address": "Blk 135 Jurong Gateway Road #03-333/335, Singapura 600135",
    "footer.contact_phone": "+65 6899 0828",
    "footer.contact_email": "secretariat@nanyangartists.org.sg",
    "footer.copyright": "© 2026 Persatuan Artis Nanyang Singapura. Hak cipta terpelihara.",
    "footer.pdpa": "Mematuhi Akta Perlindungan Data Peribadi (PDPA) Singapura"
  },

  ta: {
    // Navigation
    "nav.home": "முகப்பு",
    "nav.about": "அறிமுகம்",
    "nav.about_story": "எங்கள் நோக்கம் & வரலாறு",
    "nav.about_history": "வரலாறு & லியு காங்",
    "nav.about_team": "தலைமை & கலைஞர்கள்",
    "nav.about_societies": "கலை அமைப்புகள்",
    "nav.courses": "கலை வகுப்புகள்",
    "nav.courses_all": "அனைத்து கலைப் படிப்புகள்",
    "nav.courses_finder": "வகுப்பு தேர்வு வினாடி",
    "nav.grade": "தரப் பரிட்சை",
    "nav.grade_path": "1–9 தரநிலைப் பாதை",
    "nav.grade_viewer": "மதிப்பீட்டு அளவுகோல்கள்",
    "nav.grade_centres": "அங்கீகரிக்கப்பட்ட மையங்கள்",
    "nav.grade_verify": "சான்றிதழ் சரிபார்ப்பு",
    "nav.nanyang_star": "நன்யாங் ஸ்டார்",
    "nav.nanyang_star_hub": "போட்டி மையம்",
    "nav.nanyang_star_winners": "வெற்றியாளர்கள் பட்டியல்",
    "nav.nanyang_star_submit": "படைப்பு சமர்ப்பி",
    "nav.societies": "சங்கங்கள்",
    "nav.gallery": "கேலரி",
    "nav.news": "செய்திகள்",
    "nav.resources": "ஆவணங்கள்",
    "nav.contact": "தொடர்பு",
    "cta.enquire": "விசாரிக்க",
    "cta.register": "பதிவு செய்க",

    // Common Actions
    "btn.enquire": "விசாரிக்கவும்",
    "btn.register": "இப்போது பதிவு செய்க",
    "btn.download": "பதிவிறக்க",
    "btn.preview": "முன்னோட்டம்",
    "btn.submit": "சமர்ப்பிக்கவும்",
    "btn.filter": "வடிகட்டு",
    "btn.reset": "மீட்டமை",
    "btn.back": "பின்செல்",
    "btn.next": "அடுத்த படி",
    "btn.print": "அச்சிடுக",
    "btn.view_details": "விவரங்களை காண்க",
    "btn.read_more": "மேலும் வாசிக்க",
    "btn.close": "மூடு",

    // Course UI
    "course.category": "பாடப்பிரிவு",
    "course.level": "திறன் நிலை",
    "course.age_group": "இலக்கு வயது",
    "course.duration": "கால அளவு",
    "course.schedule": "வகுப்பு நேரம்",
    "course.instructor": "முதன்மை ஆசிரியர்",
    "course.learning_outcomes": "கற்றல் முடிவுகள்",
    "course.syllabus": "பாடத்திட்டம்",
    "course.fee_note": "கட்டண விபரங்களுக்கு அலுவலகத்தை தொடர்பு கொள்ளவும்",

    // Grade Examination UI
    "grade.hero_title": "தேசிய காட்சி கலைகள் தரப் பரிட்சை",
    "grade.disciplines": "பரிட்சை பிரிவுகள்",
    "grade.levels": "1 முதல் 9 தரநிலைகள்",
    "grade.test_centres": "அங்கீகரிக்கப்பட்ட மையங்கள்",
    "grade.criteria": "மதிப்பீட்டு அளவுகோல்கள்",
    "grade.verification": "சான்றிதழ் சரிபார்ப்பு தளம்",
    "grade.pass": "தேர்ச்சி",
    "grade.merit": "சிறப்பு தேர்ச்சி",
    "grade.distinction": "மிகச் சிறந்த தேர்ச்சி",

    // Competition UI
    "comp.nanyang_star": "நன்யாங் ஸ்டார் சர்வதேசப் போட்டி",
    "comp.call_for_entries": "அதிகாரப்பூர்வ அழைப்பு",
    "comp.age_groups": "வயதுப் பிரிவுகள்",
    "comp.individual_reg": "தனிநபர் பதிவு",
    "comp.team_reg": "குழு / நிறுவனப் பதிவு",
    "comp.hall_of_fame": "வெற்றியாளர்கள் பட்டியல்",
    "comp.grand_prize": "நன்யாங் ஸ்டார் முதன்மை கோப்பை",
    "comp.gold_award": "தங்க விருது",
    "comp.silver_award": "வெள்ளி விருது",

    // Gallery UI
    "gallery.title": "டிஜிட்டல் கலைக்கூடம் & இணைய அருங்காட்சியகம்",
    "gallery.masonry": "மேசன்ரி கட்டமைப்பு",
    "gallery.editorial": "சலூன் பார்வை",
    "gallery.fullscreen": "முழுத்திரை பார்வை",
    "gallery.search_placeholder": "கலைப்படைப்பு, கலைஞர் தேடுங்கள்...",
    "gallery.all_disciplines": "அனைத்துப் பிரிவுகளும்",

    // Gallery Filter Labels (TA)
    "gallery.filter.category": "வகை:",
    "gallery.filter.artist": "கலைஞர்:",
    "gallery.filter.discipline": "பிரிவு:",
    "gallery.filter.year": "ஆண்டு:",
    "gallery.filter.competition": "போட்டி:",
    "gallery.filter.exhibition": "கண்காட்சி:",
    "gallery.filter.allCategories": "அனைத்து வகைகளும்",
    "gallery.filter.fineArts": "நேர்த்தியான கலைகள்",
    "gallery.filter.heritageArts": "பாரம்பரிய கலைகள்",
    "gallery.filter.youthArts": "இளைஞர் கலைகள்",
    "gallery.filter.allCreators": "அனைத்து கலைஞர்களும்",
    "gallery.filter.masterFaculty": "முதன்மை ஆசிரியர்கள்",
    "gallery.filter.studentLaureates": "வெற்றி மாணவர்கள்",
    "gallery.filter.allDisciplines": "அனைத்துப் பிரிவுகளும்",
    "gallery.filter.allYears": "அனைத்து ஆண்டுகளும்",
    "gallery.filter.allCompetitions": "அனைத்து போட்டிகளும்",
    "gallery.filter.facultyCollection": "ஆசிரியர் தொகுப்பு",
    "gallery.filter.allExhibitions": "அனைத்து கண்காட்சிகளும்",

    // News Filter & Sort (TA)
    "news.filter.all": "அனைத்து செய்திகளும்",
    "news.filter.competition": "போட்டி செய்திகள்",
    "news.filter.announcements": "அறிவிப்புகள்",
    "news.filter.academic": "கல்வி சேகரங்கள்",
    "news.filter.pedagogy": "கலைக் கல்வி",
    "news.sort.newest": "புதியவை முதலில்",
    "news.sort.oldest": "பழையவை முதலில்",

    // Home Page Hero & Gates (TA)
    "home.hero_title": "படைப்போம். கற்போம். சாதிப்போம். ஊக்கமளிப்போம்.",
    "home.hero_desc": "கலைக் கற்றல், பாரம்பரியக் கலைகள், படைப்பாற்றல் மேம்பாடு மற்றும் சிங்கப்பூர் மற்றும் சர்வதேச அளவில் திறமைகளை வெளிப்படுத்தும் வாய்ப்புகளை ஆராயுங்கள்.",
    "home.hero_explore": "கலைப் படிப்புகளை ஆராய்க →",
    "home.hero_nanyang_star": "நன்யாங் ஸ்டார் பற்றி அறிய",
    "home.gate_courses_title": "கலை வகுப்புகள்",
    "home.gate_courses_desc": "சீன மை ஓவியம், வரைதல், எண்ணெய் ஓவியம் மற்றும் குழந்தைகள் கலை அடிப்படைகள்.",
    "home.gate_courses_btn": "பாட அட்டவணை காண்க →",
    "home.gate_grade_title": "தரப் பரிட்சை",
    "home.gate_grade_desc": "அங்கீகரிக்கப்பட்ட மையங்களில் மேற்பார்வையிடப்படும் 1 முதல் 9 தரநிலை மதிப்பீடு.",
    "home.gate_grade_btn": "பரிட்சைப் பாதை →",
    "home.gate_star_title": "நன்யாங் ஸ்டார்",
    "home.gate_star_desc": "முன்னணி சர்வதேச இளைஞர் கலைப் போட்டிகள் மற்றும் உலகளாவிய விருதுகள்.",
    "home.gate_star_btn": "போட்டி மையம் →",
    "home.gate_events_title": "நிகழ்வுகள்",
    "home.gate_events_desc": "முதுநிலை ஆசிரியர்களின் பட்டறைகள் மற்றும் அருங்காட்சியக கண்காட்சி நாட்கள்.",
    "home.gate_events_btn": "நிகழ்வு நாட்காட்டி →",
    "home.disciplines_title": "காட்சி கலைப் பிரிவுகள் & பாதைகள்",
    "home.disciplines_desc": "குழந்தைப் பருவ கலை அறிமுகம் முதல் கல்வித் தேர்ச்சி வரையிலான கட்டமைக்கப்பட்ட முன்னேற்றம்.",
    "home.featured_courses_title": "சிறப்பு காட்சி கலைப் படிப்புகள்",
    "home.featured_courses_desc": "முன்னணி கலைஞர்கள் மற்றும் அங்கீகரிக்கப்பட்ட ஆசிரியர்களால் கற்பிக்கப்படும் வகுப்புகள்.",
    "home.grade_path_title": "1 முதல் 9 தரநிலைக் காட்சி கலைப் பரிட்சைப் பாதை",
    "home.grade_path_desc": "6 அங்கீகரிக்கப்பட்ட பிரிவுகளுக்கான தரப்படுத்தப்பட்ட பரிட்சை முன்னேற்றம். அளவுகோல்களைக் காண ஏதேனும் தரநிலையைக் கிளிக் செய்க.",
    "home.star_spotlight_title": "நன்யாங் ஸ்டார் சர்வதேச குழந்தைகள் கலைப் போட்டி",
    "home.faculty_spotlight_title": "முதன்மை ஆசிரியர்கள் & வழிகாட்டிகள்",
    "home.faculty_spotlight_desc": "சங்கத்தின் கலைக்கூடங்களை வழிநடத்தும் புகழ்பெற்ற சிங்கப்பூர் கலைஞர்கள் மற்றும் கல்வியாளர்கள்.",

    // Footer & System
    "footer.manifesto": "சிங்கப்பூர் நன்யாங் கலைஞர்கள் சங்கம் காட்சி கலைகள், தரநிலைப் பரிட்சைகள் மற்றும் சர்வதேச மாணவர் படைப்பாற்றலை வளர்க்கும் முன்னணி அமைப்பாகும்.",
    "footer.hq_address": "Blk 135 Jurong Gateway Road #03-333/335, சிங்கப்பூர் 600135",
    "footer.contact_phone": "+65 6899 0828",
    "footer.contact_email": "secretariat@nanyangartists.org.sg",
    "footer.copyright": "© 2026 சிங்கப்பூர் நன்யாங் கலைஞர்கள் சங்கம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "footer.pdpa": "சிங்கப்பூர் தனிநபர் தரவு பாதுகாப்புச் சட்டம் (PDPA) இணக்கமானது"
  },
};

export class I18nService {
  constructor() {
    this.currentLanguage = 'en';
    this.storageKey = 'nas_user_language_pref';
    this.supportedLanguages = [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'zh', label: 'Chinese', nativeLabel: '中文' },
      { code: 'ms', label: 'Malay', nativeLabel: 'Bahasa Melayu' },
      { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' }
    ];
  }

  init() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved && ['en', 'zh', 'ms', 'ta'].includes(saved)) {
        this.currentLanguage = saved;
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
    if (!['en', 'zh', 'ms', 'ta'].includes(langCode)) return;
    this.currentLanguage = langCode;

    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.storageKey, langCode);
      }
    } catch (e) {
      console.warn('[I18nService] Could not write localStorage preference:', e);
    }

    this.applyLanguageToDocument();
    this.translateDOM();

    // Dispatch Custom Event for Active Component Re-renders
    if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
      window.dispatchEvent(new CustomEvent('nas:languageChanged', {
        detail: { language: langCode }
      }));
    }
  }

  applyLanguageToDocument() {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('lang', this.currentLanguage);
  }

  t(key, fallback = '') {
    if (!key) return fallback;

    const dict = DICTIONARIES[this.currentLanguage] || DICTIONARIES.en;
    const enDict = DICTIONARIES.en;

    const altDotKey = key.replace(/_/g, '.');
    const altUnderscoreKey = key.replace(/\./g, '_');

    // 1. Check in Current Language Dictionary
    if (dict) {
      if (dict[key] !== undefined && dict[key] !== '') return dict[key];
      if (dict[altDotKey] !== undefined && dict[altDotKey] !== '') return dict[altDotKey];
      if (dict[altUnderscoreKey] !== undefined && dict[altUnderscoreKey] !== '') return dict[altUnderscoreKey];
    }

    // 2. Graceful English Fallback
    if (enDict) {
      if (enDict[key] !== undefined && enDict[key] !== '') return enDict[key];
      if (enDict[altDotKey] !== undefined && enDict[altDotKey] !== '') return enDict[altDotKey];
      if (enDict[altUnderscoreKey] !== undefined && enDict[altUnderscoreKey] !== '') return enDict[altUnderscoreKey];
    }

    // 3. Final Fallback (never output undefined or raw keys if a fallback exists)
    return fallback || key.split(/[._]/).pop();
  }

  getField(entity, baseFieldName) {
    if (!entity) return '';

    const langKey = `${baseFieldName}_${this.currentLanguage}`;
    if (entity[langKey] && entity[langKey] !== '') {
      return entity[langKey];
    }

    // Fallback to Chinese if active is Chinese and has _zh
    if (this.currentLanguage === 'zh' && entity[`${baseFieldName}_zh`]) {
      return entity[`${baseFieldName}_zh`];
    }

    // Fallback to English
    if (entity[`${baseFieldName}_en`]) {
      return entity[`${baseFieldName}_en`];
    }

    if (entity[baseFieldName]) {
      return entity[baseFieldName];
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
        el.textContent = this.t(key, el.textContent);
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

