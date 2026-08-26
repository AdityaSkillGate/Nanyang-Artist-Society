/**
 * NANYANG ARTISTS SOCIETY — CENTRALIZED SITE CONFIGURATION
 * Single source of truth for branding, metadata, navigation, announcements, and API settings.
 */

export const SITE_CONFIG = {
  name: {
    en: "Singapore Nanyang Artists Society",
    zh: "新加坡南洋美术家协会",
    short: "Nanyang Artists Society"
  },
  founding: {
    year: 2002,
    master: "Liu Kang (刘抗, 1911–2004)",
    inscription: "南洋美术家協會"
  },
  contact: {
    phonePrimary: "+65 6899 0828",
    phoneSecondary: "+65 9004 8768",
    addressEn: "Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135",
    addressZh: "新加坡裕廊门路大牌135号#03-333/335 邮编600135",
    postalCode: "600135",
    mrt: "Jurong East MRT Station (EW24/NS1)",
    website: "http://nyart.org.sg"
  },
  // Sample Announcement Ticker Data (Marked as SAMPLE)
  announcement: {
    id: "ann-2026-001",
    isSample: true,
    textEn: "Applications and creative learning opportunities are now available — Explore Art Courses →",
    textZh: "新学期艺术课程及考级申请现已开放 — 探索精选课程 →",
    textMs: "Permohonan dan peluang pembelajaran kreatif kini dibuka — Terokai Kursus Seni →",
    textTa: "படைப்பாற்றல் கலைப் படிப்புகளுக்கான சேர்க்கை இப்போது திறக்கப்பட்டுள்ளது — மேலும் அறிக →",
    url: "courses/index.html",
    priority: "normal",
    isDismissible: true
  },
  // 10 Primary Navigation Items
  navigation: [
    { key: "home", labelEn: "Home", labelZh: "主页", path: "index.html" },
    {
      key: "about",
      labelEn: "About",
      labelZh: "关于协会",
      path: "about/index.html",
      children: [
        { labelEn: "Our Story & Mission", labelZh: "协会使命与宗旨", path: "about/index.html" },
        { labelEn: "History & Liu Kang", labelZh: "历史渊源与刘抗题字", path: "about/history.html" },
        { labelEn: "Leadership & Team", labelZh: "领导机构与学术顾问", path: "about/team.html" },
        { labelEn: "Art Societies Network", labelZh: "美术团体合作网络", path: "societies/index.html" }
      ]
    },
    {
      key: "courses",
      labelEn: "Art Courses",
      labelZh: "艺术课程",
      path: "courses/index.html",
      children: [
        { labelEn: "All Courses Catalog", labelZh: "全部课程一览", path: "courses/index.html" },
        { labelEn: "Course Finder Quiz", labelZh: "智能寻课测试", path: "courses/finder.html" }
      ]
    },
    {
      key: "grade-examination",
      labelEn: "Grade Examination",
      labelZh: "考级体系",
      path: "grade-examination/index.html",
      children: [
        { labelEn: "Grades 1–9 Pathway", labelZh: "1-9级进阶之路", path: "grade-examination/index.html" },
        { labelEn: "Assessment Viewer", labelZh: "标准范本评测器", path: "grade-examination/assessment-viewer.html" },
        { labelEn: "Test Centre Query", labelZh: "新加坡考点查询", path: "grade-examination/test-centres.html" },
        { labelEn: "Verify Certificate", labelZh: "证书真伪查验", path: "grade-examination/verify.html" }
      ]
    },
    {
      key: "competitions",
      labelEn: "Competitions & Nanyang Star",
      labelZh: "大赛与南洋之星",
      path: "competitions/index.html",
      children: [
        { labelEn: "Competition Hub", labelZh: "国际大赛专页", path: "competitions/nanyang-star.html" },
        { labelEn: "2020 Winner Archive", labelZh: "2020获奖档案与海报", path: "competitions/winners.html" },
        { labelEn: "Submit Artwork", labelZh: "作品在线提交", path: "competitions/submit.html" }
      ]
    },
    { key: "societies", labelEn: "Art Societies", labelZh: "美术团体", path: "societies/index.html" },
    { key: "gallery", labelEn: "Gallery", labelZh: "数字艺术馆", path: "gallery/index.html" },
    { key: "news", labelEn: "News & Events", labelZh: "新闻与活动", path: "news/index.html" },
    { key: "resources", labelEn: "Resources", labelZh: "资源下载", path: "resources/index.html" },
    { key: "contact", labelEn: "Contact", labelZh: "联络我们", path: "contact/index.html" }
  ],
  api: {
    gasEndpointStorageKey: "nas_gas_endpoint",
    defaultEndpoint: ""
  }
};
