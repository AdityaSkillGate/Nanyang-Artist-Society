/**
 * NANYANG ARTISTS SOCIETY — VERIFIED SEED DATA REGISTRY
 * 36 Relational Tables representing the official source-of-truth baseline.
 */

export const SEED_DATA = {
  Settings: [
    { key: "site_name_en", value: "Nanyang Artists Society", type: "text" },
    { key: "site_name_zh", value: "南洋美术家协会", type: "text" },
    { key: "founding_year", value: "2002", type: "text" },
    { key: "founding_master", value: "Liu Kang (刘抗)", type: "text" },
    { key: "primary_phone", value: "+65 6899 0828", type: "text" },
    { key: "secondary_phone", value: "+65 9004 8768", type: "text" },
    { key: "hq_address_en", value: "Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135", type: "text" },
    { key: "hq_address_zh", value: "新加坡裕廊门路大牌135号#03-333/335 邮编600135", type: "text" },
    { key: "mrt_station", value: "Jurong East MRT (EW24/NS1)", type: "text" }
  ],

  People: [
    {
      id: "PPL-001",
      name_en: "Dr. Teng Jiashu",
      name_zh: "滕家述",
      courtesy_name: "成夏",
      role_title_en: "President",
      role_title_zh: "会长",
      department_id: "DEP-EXE",
      discipline_specialty: "Oil Painting, Chinese Painting, Calligraphy",
      bio_en: "Born in 1962, holding a Doctoral degree. Council Member & Education Director of Federation of Art Societies (Singapore); Vice Editor-in-Chief of Singapore Art Quarterly; Web Director of Federation of Art Societies; President of Nanyang Artists Society. Painter, calligrapher, and sculptor whose works have won international accolades including Japan Peony Award and National Chinese Painting Excellence Prize.",
      bio_zh: "字成夏，1962年生，博士学位。新加坡美术总会理事教育主任；《新加坡美术》季刊副主编；新加坡美术总会网总监；南洋美术家协会会长；南洋美术总监。油画家、中国画画家、书法家。油画《山脊人家》获日本牡丹奖；中国画山水《暮色山乡》获全国优秀中国画作品奖；雕塑作品《团结-奋飞》立于新加坡南洋小学。",
      photo_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      is_board_member: true,
      is_instructor: true,
      sort_order: 1
    },
    {
      id: "PPL-002",
      name_en: "Xu Liya",
      name_zh: "许丽雅",
      role_title_en: "First Vice-President",
      role_title_zh: "第一副会长",
      department_id: "DEP-EXE",
      discipline_specialty: "Chinese Calligraphy, Chinese Painting, Oil Painting",
      bio_en: "Renowned Singapore artist and educator with over 20 years of experience. Executive Committee Member of Federation of Art Societies (Singapore), Vice President of Nanyang Artists Society. Graduate of Tsinghua University Academy of Fine Arts Zen Landscape Masterclass under Mentor Hu Yilong.",
      bio_zh: "新加坡书画家。新加坡美术总会执委，新加坡南洋美术家协会第一副会长。从事美术教育工作二十余年，在书法、油画、国画方面造诣深厚。中国清华大学美术学院高研班毕业，作品多次在国内外重要艺术展展出并被权威机构收藏。",
      photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      is_board_member: true,
      is_instructor: true,
      sort_order: 2
    },
    {
      id: "PPL-003",
      name_en: "Huang Hong",
      name_zh: "黄红",
      courtesy_name: "丹红",
      role_title_en: "Second Vice-President",
      role_title_zh: "第二副会长",
      department_id: "DEP-EXE",
      discipline_specialty: "Chinese Painting (Flower-and-Bird, Landscape)",
      bio_en: "Vice Secretary-General of Federation of Art Societies (Singapore), Second Vice President of Nanyang Artists Society. Studied under Guangzhou Academy of Fine Arts Professor Fang Chuxiong and Professor Zhang Yan. Her ink works blend classical mastery with bold modern vitality.",
      bio_zh: "字丹红，新加坡美术总会副秘书长，南洋美术家协会第二副会长。师从广州美术学院花鸟画家方楚雄教授、山水画家张彦教授等名师。作品《绽放时代》入选第十二届全国美术作品展；《梦想，在路上》入选南京国际美术展。",
      photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      is_board_member: true,
      is_instructor: true,
      sort_order: 3
    },
    {
      id: "PPL-004",
      name_en: "Deng Yiqing",
      name_zh: "邓一清",
      role_title_en: "Third Vice-President",
      role_title_zh: "第三副会长",
      department_id: "DEP-EXE",
      discipline_specialty: "Fine Arts, Studio Practice",
      bio_en: "Third Vice President of Nanyang Artists Society and Director of Yiqing Art Studio.",
      bio_zh: "南洋美术家协会第三副会长，艺青画室创办人与艺术导师。",
      photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      is_board_member: true,
      is_instructor: true,
      sort_order: 4
    },
    {
      id: "PPL-005",
      name_en: "Jason Koh Siew Sin",
      name_zh: "许修信",
      role_title_en: "English Secretary & Master Craft Instructor",
      role_title_zh: "英文秘书 / 手工与塑料折纸大师",
      department_id: "DEP-EXE",
      discipline_specialty: "Handicrafts, Sculpture, Patented Plastic Origami",
      bio_en: "Master instructor with over 30 years of teaching experience. Pioneer and inventor of patented 'Plastic Origami' geometric craft art.",
      bio_zh: "拥有30余年美术与手工艺教学经验，多次获奖。自创全新“塑料折纸”工艺，在少儿智力开发与三维空间造型领域享誉业内。",
      photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
      is_board_member: true,
      is_instructor: true,
      sort_order: 5
    }
  ],

  Consultants: [
    {
      id: "CNS-001",
      name_en: "Liang Zhenkang",
      name_zh: "梁振康",
      advisory_title_en: "President of Federation of Art Societies & Chair of Singapore Advisory Council",
      advisory_title_zh: "新加坡美术总会会长 / 新加坡顾问团委员主席",
      organization: "Federation of Art Societies",
      photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "CNS-002",
      name_en: "Qi Shengyi",
      name_zh: "齐声怡",
      advisory_title_en: "Chair of Chinese Painting Committee",
      advisory_title_zh: "南洋美术家中国画委员会主席",
      organization: "Nanyang Artists Society",
      photo_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "CNS-003",
      name_en: "Wang Hui",
      name_zh: "王辉",
      advisory_title_en: "Chair of Oil Painting Committee",
      advisory_title_zh: "南洋美术家油画委员会主席",
      organization: "Nanyang Artists Society",
      photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "CNS-004",
      name_en: "Dr. Lai Guifang",
      name_zh: "赖桂芳博士",
      advisory_title_en: "Member of Singapore Oil Painting Committee",
      advisory_title_zh: "新加坡油画委员会委员",
      organization: "Nanyang Artists Society",
      photo_url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80"
    }
  ],

  Courses: [
    {
      id: "CRS-CIA",
      category_id: "CAT-YTH",
      title_en: "Children's Intellectual Art Education",
      title_zh: "儿童智力美术",
      tagline_en: "Brain development, memory drawing, and sensory exploration for young minds",
      tagline_zh: "0-7岁大脑神经元激活，想象力与记忆力多元艺术启蒙",
      description_en: "Designed for children aged 2-6 to stimulate intellectual growth, concentration, and aesthetic perception through tactile painting, color matching, and integrated art exercises.",
      description_zh: "针对2-6岁幼儿，通过绘图、色彩配搭、综合材料与记忆训练，全面促进大脑思维、空间想象与专注力的提升。",
      age_min: 2,
      age_max: 6,
      duration_per_session: "2 hours",
      fee_display: "Enquire for current schedule and fees",
      schedule_days: "Mon - Sun",
      thumbnail_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRS-CTN",
      category_id: "CAT-YTH",
      title_en: "Creative Cartoon & Comic Drawing",
      title_zh: "儿童卡通与漫画创作",
      tagline_en: "Character design, dynamic expressions, and visual storytelling",
      tagline_zh: "造型夸张概括，动漫角色设计与生动分镜绘制",
      description_en: "Teaches fundamental comic drawing techniques, character expressions, exaggerated anatomy, and color rendering to bring storyboards to life.",
      description_zh: "培养学生对卡通人物、动物造型的概括与夸张能力，掌握线条流畅度、色彩渲染及单幅故事构图。",
      age_min: 5,
      age_max: 14,
      duration_per_session: "2 hours",
      fee_display: "Enquire for current schedule and fees",
      schedule_days: "Sat, Sun",
      thumbnail_url: "https://images.unsplash.com/photo-1569317002804-ab77bcf1bce4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRS-HDC",
      category_id: "CAT-YTH",
      title_en: "Handicraft, Pottery & 3D Sculpture",
      title_zh: "手工制作、陶艺与泥塑",
      tagline_en: "Tactile creation with clay, sculpture, plaster, and patented plastic origami",
      tagline_zh: "30年大师执教，陶艺雕塑与自创塑料折纸工艺",
      description_en: "Led by Master Jason Koh (30+ yrs experience). Develops psycho-motor skills and 3D spatial awareness through clay sculpting, pottery, and patented plastic origami.",
      description_zh: "由许修信老师主讲，通过陶艺、石膏造型、软陶及自创环保塑料折纸，培养极佳的动手能力与空间立体审美。",
      age_min: 5,
      age_max: 99,
      duration_per_session: "2 hours",
      fee_display: "Enquire for current schedule and fees",
      schedule_days: "Sat, Sun",
      thumbnail_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRS-CHP",
      category_id: "CAT-HRTG",
      title_en: "Traditional Chinese Painting (Shanshui, Bird & Flower, Figure)",
      title_zh: "中国画研修 (山水 / 花鸟 / 人物)",
      tagline_en: "Mastery of ink wash, Xieyi freehand brushwork, and Gongbi detail",
      tagline_zh: "水墨意境、写意花鸟、青绿山水与工笔重彩传习",
      description_en: "Comprehensive training in classical Chinese ink painting. Covers ink gradation (Pomo), line control, traditional composition, and poetic inscription.",
      description_zh: "深入传授写意花鸟、水墨山水与工笔技法。学习运笔、施墨、敷色与题款印章章法，由中国画委员会名师亲授。",
      age_min: 6,
      age_max: 99,
      duration_per_session: "2 hours",
      fee_display: "Enquire for current schedule and fees",
      schedule_days: "Mon - Sun",
      thumbnail_url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRS-SKT",
      category_id: "CAT-FINE",
      title_en: "Academic Sketching & Drawing",
      title_zh: "专业素描基础与进阶",
      tagline_en: "Geometric solids, still life, plaster casts, and master portraiture",
      tagline_zh: "形体透视、黑白灰光影调子、石膏圆面五官与人物头像精修",
      description_en: "Systematic academic drawing curriculum covering single geometric plaster shapes, still life arrangements, classical plaster busts, and live portraiture.",
      description_zh: "严格的学术素描训练体系：单体石膏、组合静物、五官结构、石膏头像（伏尔泰、荷马、小卫）及中青年真人头像写生。",
      age_min: 8,
      age_max: 99,
      duration_per_session: "2 hours",
      fee_display: "Enquire for current schedule and fees",
      schedule_days: "Mon - Sun",
      thumbnail_url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "CRS-SHU",
      category_id: "CAT-HRTG",
      title_en: "Chinese Calligraphy (Hard Pen & Soft Brush)",
      title_zh: "中国书法 (硬笔与软笔书法)",
      tagline_en: "Standard Regular script, ancient rubbings, Running and Cursive dynamics",
      tagline_zh: "硬笔毛笔双轨教学，楷隶行草名帖临摹与创作",
      description_en: "Instruction in both hard pen and traditional brush calligraphy. Progresses from stroke geometry and Yan/Liu regular script to Tang poetry compositions.",
      description_zh: "涵盖硬笔与软笔。临摹王羲之、智永、米芾等古代经典名帖，掌握提按转折、结体变化、章法气韵与落款铃印。",
      age_min: 6,
      age_max: 99,
      duration_per_session: "2 hours",
      fee_display: "Enquire for current schedule and fees",
      schedule_days: "Sat, Sun",
      thumbnail_url: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80"
    }
  ],

  GradeDisciplines: [
    {
      id: "DISC-CLG",
      name_en: "Chinese Calligraphy",
      name_zh: "中国书法",
      max_grade: 9,
      subcategories: "Hard Pen (硬笔 1-9), Soft Brush (软笔 1-9)",
      overview_en: "Structured assessment from standard character stroke accuracy to classical multi-style poetic creation.",
      overview_zh: "分硬笔与软笔两大门类，涵盖楷、隶、篆、行四体临摹与七言唐诗命题创作。"
    },
    {
      id: "DISC-CHP",
      name_en: "Chinese Painting",
      name_zh: "中国画",
      max_grade: 9,
      subcategories: "Flower-and-Bird, Fruit, Animal/Insect, Landscape, Figure",
      overview_en: "Grades 1 to 9 testing freehand and Gongbi ink mastery on 4-cun 3-kai Xuan paper.",
      overview_zh: "从基础花卉、蔬果禽鸟临摹，进阶到唐诗创作、多人物组合肖像及主题命题国画创作。"
    },
    {
      id: "DISC-SKT",
      name_en: "Academic Sketching",
      name_zh: "素描",
      max_grade: 9,
      subcategories: "Geometric, Still Life, Plaster Busts, Portraiture",
      overview_en: "Progresses from single geometric solids to master plaster busts (Voltaire, Homer, Roman Emperor).",
      overview_zh: "从单体几何形体写生，到多静物陶罐组合，至石膏像五官、古典石膏头像及真人肖像写生。"
    },
    {
      id: "DISC-CHD",
      name_en: "Children Art",
      name_zh: "儿童画",
      max_grade: 10,
      subcategories: "Ages 2–9 Progressive Evaluation",
      overview_en: "Grades 1 to 10 evaluating visual language, imaginative depth, color harmony, and creative uniqueness.",
      overview_zh: "针对2-9岁儿童，从线条感知与童趣表现，进阶到饱满构图、冷暖色彩谐调与时代气息表达。"
    },
    {
      id: "DISC-CTN",
      name_en: "Cartoon Drawing",
      name_zh: "卡通画",
      max_grade: 10,
      subcategories: "Single Panel Comic Art",
      overview_en: "Grades 1 to 10 testing character anatomy, expressive exaggeration, and dynamic background storytelling.",
      overview_zh: "单幅漫画创作，评估构图完整性、主体立意、角色生动度、背景配合及画面感染力。"
    },
    {
      id: "DISC-WCO",
      name_en: "Watercolor, Gouache & Oil Painting",
      name_zh: "水彩、水粉和油画",
      max_grade: 9,
      subcategories: "Watercolor (1-9), Gouache (1-10), Oil Painting (1-8/9)",
      overview_en: "Comprehensive western painting assessment from simple still life to complex multi-object drapery and plaster bust painting.",
      overview_zh: "涵盖水彩、水粉及油画。考核调色能力、光感与色调冷暖、空间层次、质感刻画及油画厚重表现力。"
    }
  ],

  ExamCentres: [
    {
      id: "EC-001",
      centre_name_en: "Federation of Art Societies (Singapore)",
      centre_name_zh: "新加坡美术总会",
      address: "10, Kampong Eunos, Singapore 417775",
      postal_code: "417775",
      district: "East",
      contact_phone: "+65 6899 0828",
      website: "http://nyart.org.sg",
      disciplines_offered: "DISC-CLG, DISC-CHP, DISC-SKT, DISC-WCO",
      is_active: true
    },
    {
      id: "EC-002",
      centre_name_en: "Nanyang Art HQ (Jurong East)",
      centre_name_zh: "南洋美术总部 (裕廊东)",
      address: "Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135",
      postal_code: "600135",
      district: "West",
      contact_phone: "+65 6899 0828",
      website: "http://nyart.org.sg",
      disciplines_offered: "DISC-CLG, DISC-CHP, DISC-SKT, DISC-CHD, DISC-CTN, DISC-WCO",
      is_active: true
    },
    {
      id: "EC-003",
      centre_name_en: "AiDe Art Studio",
      centre_name_zh: "爱德艺术工作室",
      address: "29 Tampines St 86, The Santorini #06-29, Singapore 528588",
      postal_code: "528588",
      district: "East",
      contact_phone: "+65 8428 1927",
      website: "http://www.aideartstudio.com",
      disciplines_offered: "DISC-CHD, DISC-SKT, DISC-CHP",
      is_active: true
    },
    {
      id: "EC-004",
      centre_name_en: "Butterfly Art Studio",
      centre_name_zh: "蝴蝶童话画室",
      address: "Blk 731 #B1-29 Jurong West Street 72, Singapore 640731",
      postal_code: "640731",
      district: "West",
      contact_phone: "+65 6794 9218",
      website: "http://nyart.org.sg",
      disciplines_offered: "DISC-CHD, DISC-CTN, DISC-WCO",
      is_active: true
    },
    {
      id: "EC-005",
      centre_name_en: "TianRui Art Studio",
      centre_name_zh: "天瑞艺术工作室",
      address: "Singapore",
      postal_code: "600000",
      district: "Central",
      contact_phone: "+65 9184 6885",
      website: "http://nyart.org.sg",
      disciplines_offered: "DISC-CLG, DISC-CHP",
      is_active: true
    }
  ],

  Competitions: [
    {
      id: "COMP-NSTAR",
      title_en: "Nanyang Star International Children's Art Competition",
      title_zh: "南洋之星国际儿童美术比赛",
      description_en: "Flagship international competition celebrating youth imagination, cross-cultural understanding, and artistic excellence.",
      description_zh: "协会年度旗舰国际少儿艺术大赛，旨在为全球少儿提供高水准展示与跨文化交流平台。"
    }
  ],

  CompetitionEditions: [
    {
      id: "ED-NSTAR-2020",
      competition_id: "COMP-NSTAR",
      year: 2020,
      theme_en: "Looking into the Future",
      theme_zh: "展望未来",
      status: "Concluded",
      poster_image_url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
      summary_zh: "2020年9月抗击疫情期间举办，采用线上评审模式，汇集全球少年儿童以画笔描绘未来心声与希望。"
    }
  ],

  AIKnowledge: [
    {
      id: "AIK-001",
      topic: "Society Founding",
      keywords: "founding, history, liu kang, 2002, 历史, 刘抗",
      context_payload: "Singapore Nanyang Artists Society was founded in 2002 under the initiative and titling inscription of pioneer artist Liu Kang (刘抗). It promotes the Nanyang art heritage, academic rigor, and creative art education."
    },
    {
      id: "AIK-002",
      topic: "Grade Examination Disciplines",
      keywords: "grade, exam, examination, levels, 考级, 级别, 科目",
      context_payload: "The society conducts Grade Examinations for 6 disciplines: Chinese Calligraphy (Hard & Soft Pen, Grades 1-9), Chinese Painting (Grades 1-9), Academic Sketching (Grades 1-9), Children Art (Grades 1-10), Cartoon Drawing (Grades 1-10), and Watercolor/Gouache/Oil Painting (Grades 1-9)."
    },
    {
      id: "AIK-003",
      topic: "Test Centres",
      keywords: "centre, location, jurong, eunos, tampines, 考点, 地址",
      context_payload: "Verified test centres include Federation of Art Societies (10 Kampong Eunos, Singapore 417775), Nanyang Art HQ (Blk 135 Jurong Gateway Rd #03-333/335, Singapore 600135), AiDe Art Studio in Tampines, Butterfly Art Studio in Jurong West, and TianRui Art Studio."
    }
  ]
};
