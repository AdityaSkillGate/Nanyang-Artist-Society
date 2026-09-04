/**
 * NANYANG ARTISTS SOCIETY — STRUCTURED GRADE EXAMINATION DATA MODEL
 * Authoritative content transcribed directly from `Chinese Calligraphy（中国书法）-grades.txt`.
 * Covers Hard-Pen (硬笔书法, Grades 1–9) and Soft-Pen (软笔书法, Grades 1–9).
 */

export const CHINESE_CALLIGRAPHY_GRADES = [
  // =========================================================================
  // PART I: HARD-PEN CHINESE CALLIGRAPHY (硬笔书法)
  // =========================================================================
  {
    id: "GRADE-HP-01",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 1,
    levelNumber: 1,
    title: {
      en: "Hard-Pen Grade 1",
      zh: "硬笔书法 一级",
      ms: "Pen Keras Gred 1",
      ta: "வன் பேனா நிலை 1"
    },
    chineseTitle: "硬笔书法 · 一级",
    overview: "Foundational copybook practice using pencil, focusing on basic stroke execution and early structural awareness.",
    overview_zh: "临摹字帖一种，用铅笔，培养基础笔画与写字结体意识。",
    task: "Copy one selected practice copybook using pencil; minimum 50 characters.",
    task_zh: "临摹字帖一种，用铅笔，不少于50字。",
    characterMinimum: 50,
    characterDisplay: "50+ Characters (不少于50字)",
    durationMinutes: 60,
    durationDisplay: "60 mins (60分钟)",
    paperSize: "16K grid paper",
    paperSize_zh: "16开",
    writingTools: "Pencil",
    writingTools_zh: "铅笔",
    requiredStyles: "Regular Script (楷书)",
    requiredStyles_zh: "楷书规范字",
    assessmentCriteria: {
      strokes: "Able to copy accurately with earnest brushwork (能临摹，书写用功)",
      structure: "Demonstrates awareness of character balance and structure (有结体意识，书写认真)",
      layout: "Clean alignment in grid format (九宫/田字格对齐规范)"
    },
    criteriaSummary_zh: "笔画—能临摹，书写用功。结体—有结体意识，书写认真。",
    skillDescription: "Beginner learning stage: Starting to master basic dots, strokes, radicals, and character structures.",
    skillDescription_zh: "水平多为刚学习写字而尚未掌握基本点画偏旁和结体，未临摹过字帖或临摹帖而未入门的。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-1.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-1.png",
        title: "Hard-Pen Grade 1 Standard Copybook Plate",
        title_zh: "硬笔书法一级标准范本字帖",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Official Grade 1 pencil practice sheet demonstrating straight strokes and radical proportions."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 1
  },
  {
    id: "GRADE-HP-02",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 2,
    levelNumber: 2,
    title: {
      en: "Hard-Pen Grade 2",
      zh: "硬笔书法 二级",
      ms: "Pen Keras Gred 2",
      ta: "வன் பேனா நிலை 2"
    },
    chineseTitle: "硬笔书法 · 二级",
    overview: "Developing visual fidelity from copybooks with upright balance and symmetrical proportion.",
    overview_zh: "临摹自选字帖，点画形态初步形似，掌握平正匀称之法。",
    task: "Copy one self-selected copybook using pencil; minimum 50 characters.",
    task_zh: "临摹自选字帖一种，可用铅笔，不少于50字。",
    characterMinimum: 50,
    characterDisplay: "50+ Characters (不少于50字)",
    durationMinutes: 60,
    durationDisplay: "60 mins (60分钟)",
    paperSize: "16K grid paper",
    paperSize_zh: "16开",
    writingTools: "Pencil permitted",
    writingTools_zh: "可用铅笔",
    requiredStyles: "Regular Script (楷书)",
    requiredStyles_zh: "楷书规范字",
    assessmentCriteria: {
      strokes: "Dot and stroke forms demonstrate basic visual resemblance (点画形态已有些形似)",
      structure: "Initial grasp of upright balance and symmetrical proportion (初步掌握平正、匀称之法)",
      layout: "Consistent grid spacing (字间距整齐均匀)"
    },
    criteriaSummary_zh: "笔画—点画形态已有些形似。结体—初步掌握平正、匀称之法。",
    skillDescription: "Approaching foundational entry level: Has spent deliberate practice copying copybooks.",
    skillDescription_zh: "多为初学习写字而即将入门的，对字帖的临摹也下过一些功夫。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-2.png",
        title: "Hard-Pen Grade 2 Model Reference Plate",
        title_zh: "硬笔书法二级自选临摹参考帖",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Standard Grade 2 pencil plate displaying stroke control and balanced character posture."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 2
  },
  {
    id: "GRADE-HP-03",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 3,
    levelNumber: 3,
    title: {
      en: "Hard-Pen Grade 3",
      zh: "硬笔书法 三级",
      ms: "Pen Keras Gred 3",
      ta: "வன் பேனா நிலை 3"
    },
    chineseTitle: "硬笔书法 · 三级",
    overview: "Mastering dot and stroke morphology with pencil or pen, establishing consistent character equilibrium.",
    overview_zh: "临摹自选字帖一种，用铅笔或钢笔，基本掌握点画形态与端稳结体。",
    task: "Copy one self-selected copybook using pencil or pen; minimum 80 characters.",
    task_zh: "临摹自选字帖一种，用铅笔或钢笔，不少于80字。",
    characterMinimum: 80,
    characterDisplay: "80+ Characters (不少于80字)",
    durationMinutes: 60,
    durationDisplay: "60 mins (60分钟)",
    paperSize: "16K grid paper",
    paperSize_zh: "16开",
    writingTools: "Pencil or Pen",
    writingTools_zh: "铅笔或钢笔",
    requiredStyles: "Regular Script (楷书)",
    requiredStyles_zh: "正体楷书",
    assessmentCriteria: {
      strokes: "Fundamentally masters stroke shapes (已基本掌握点画形态)",
      structure: "Relatively upright, balanced and uniform (较平正、匀称)",
      layout: "Clear columns and margins (行列规范，留白自然)"
    },
    criteriaSummary_zh: "笔画—已基本掌握点画形态。结体—较平正、匀称。",
    skillDescription: "Entry level attained: Copybook imitation exhibits good morphological resemblance.",
    skillDescription_zh: "多为刚入门的，临摹字帖已比较形似。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-3.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-3.png",
        title: "Hard-Pen Grade 3 Standard Examination Plate",
        title_zh: "硬笔书法三级标准范本作品",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Grade 3 plate displaying 80+ character paragraph with even stroke weights and rhythm."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 3
  },
  {
    id: "GRADE-HP-04",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 4,
    levelNumber: 4,
    title: {
      en: "Hard-Pen Grade 4",
      zh: "硬笔书法 四级",
      ms: "Pen Keras Gred 4",
      ta: "வன் பேனா நிலை 4"
    },
    chineseTitle: "硬笔书法 · 四级",
    overview: "Mandatory pen execution of small regular script (小楷), transitioning to classical master model imitation.",
    overview_zh: "临摹自选小楷名帖一种，四级起必须使用钢笔，字体端稳美观。",
    task: "Copy one self-selected classical small regular-script masterwork using pen (pen mandatory for Grade 4 and above); minimum 100 characters.",
    task_zh: "临摹自选小楷名帖一种，用钢笔，四级以上必须用钢笔。不少于100字。",
    characterMinimum: 100,
    characterDisplay: "100+ Characters (不少于100字)",
    durationMinutes: 90,
    durationDisplay: "90 mins (90分钟)",
    paperSize: "8K sheet",
    paperSize_zh: "8开",
    writingTools: "Pen (Mandatory for Grade 4+)",
    writingTools_zh: "钢笔（四级以上必须用钢笔）",
    requiredStyles: "Small Regular Script (小楷)",
    requiredStyles_zh: "经典小楷名帖",
    assessmentCriteria: {
      strokes: "Stroke forms well executed and refined (点画形态好)",
      structure: "Characters upright, graceful, with few flaws (字体较为端稳美观，毛病不多)",
      layout: "Basic layout and column spacing correct (章法基本正确)"
    },
    criteriaSummary_zh: "笔画—点画形态好。结体—字体较为端稳美观，毛病不多。章法—基本正确。",
    skillDescription: "Solid foundation (approx. 2 years study): Achieved morphological fidelity with ancient master models.",
    skillDescription_zh: "多为有两年学书之功，临帖已达形似阶段，对古代优秀字帖有了一定的学习。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-4.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-4.png",
        title: "Hard-Pen Grade 4 Classical Small Regular Script Plate",
        title_zh: "硬笔书法四级小楷名帖临摹范本",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Official Grade 4 pen plate on 8K paper demonstrating refined stroke junctures and stable posture."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 4
  },
  {
    id: "GRADE-HP-05",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 5,
    levelNumber: 5,
    title: {
      en: "Hard-Pen Grade 5",
      zh: "硬笔书法 五级",
      ms: "Pen Keras Gred 5",
      ta: "வன் பேனா நிலை 5"
    },
    chineseTitle: "硬笔书法 · 五级",
    overview: "Imitating classical masters (Shi You, Wang Xizhi, Zhiyong, Wei Stele) with rhythmic tempo and density contrast.",
    overview_zh: "临摹古代经典名帖（王羲之、智永、魏碑等），点画质感与节奏变化丰富。",
    task: "Copy one self-selected ancient classical masterwork (e.g. Shi You, Wang Xizhi, Zhiyong, or Wei stele); minimum 100 characters.",
    task_zh: "临摹自选古代经典名帖一种。可选择史游、王羲之，智永的作品或魏碑等，不少于100字。",
    characterMinimum: 100,
    characterDisplay: "100+ Characters (不少于100字)",
    durationMinutes: 90,
    durationDisplay: "90 mins (90分钟)",
    paperSize: "8K sheet",
    paperSize_zh: "8开",
    writingTools: "Pen",
    writingTools_zh: "钢笔",
    requiredStyles: "Classical Masters / Wei Stele Regular Script (王羲之/智永/魏碑楷书)",
    requiredStyles_zh: "古代经典名帖（王羲之、智永、魏碑等）",
    assessmentCriteria: {
      strokes: "Good stroke form and texture with rhythmic variation (点画形态和质感较好，有一定的节奏变化)",
      structure: "Upright yet lively, balanced, with density contrasts (平正而活泼、匀称、有疏密变化)",
      layout: "Clean execution with no obvious flaws (章法无明显毛病)"
    },
    criteriaSummary_zh: "笔画—点画形态和质感较好，有一定的节奏变化。结体—平正而活泼、匀称、有疏密变化。章法—无明显毛病。",
    skillDescription: "Demonstrates substantial calligraphic proficiency and elevated copybook replication standards.",
    skillDescription_zh: "已有一定功力，临摹水平较高。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-5-1.png",
      "assets/images/grade/hard-pen/level-5-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-5-1.png",
        title: "Hard-Pen Grade 5 Master Model Copy (Plate 1)",
        title_zh: "硬笔书法五级经典法帖临本（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 showing Wei stele / classical script influence with crisp angles and firm stroke tension."
      },
      {
        plate: 2,
        image: "assets/images/grade/hard-pen/level-5-2.png",
        title: "Hard-Pen Grade 5 Master Model Copy (Plate 2)",
        title_zh: "硬笔书法五级经典法帖临本（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 presenting Wang Xizhi / Zhiyong line dynamics with lively rhythm and density contrast."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 5
  },
  {
    id: "GRADE-HP-06",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 6,
    levelNumber: 6,
    title: {
      en: "Hard-Pen Grade 6",
      zh: "硬笔书法 六级",
      ms: "Pen Keras Gred 6",
      ta: "வன் பேனா நிலை 6"
    },
    chineseTitle: "硬笔书法 · 六级",
    overview: "Running or Clerical script master copybook imitation, mastering lift/press, concealed tips, and dynamic layout.",
    overview_zh: "临摹自选古代行书或隶书名帖（王羲之、米芾、苏轼、黄庭坚或汉隶），或模仿创作。",
    task: "Copy one self-selected ancient running (行书) or clerical (隶书) masterwork (Running: Wang Xizhi, Mi Fu, Su Shi, Huang Tingjian; Clerical: Han steles) or create an imitation work in regular/clerical script; minimum 100 characters.",
    task_zh: "临摹自选古代行书或隶书名帖一种（行书可选择王羲之、米芾、苏轼、黄庭坚等书法家的行书，隶书以汉代隶书名作为主）或楷书、隶书的模仿创作，不少于100字。",
    characterMinimum: 100,
    characterDisplay: "100+ Characters (不少于100字)",
    durationMinutes: 90,
    durationDisplay: "90 mins (90分钟)",
    paperSize: "8K sheet",
    paperSize_zh: "8开",
    writingTools: "Pen",
    writingTools_zh: "钢笔",
    requiredStyles: "Running Script (行书) or Han Clerical Script (汉隶)",
    requiredStyles_zh: "古代行书（米芾/苏轼等）或汉代隶书",
    assessmentCriteria: {
      strokes: "Good stroke texture with variation; demonstrates lift/press, concealed/exposed tips, square/round turns (提按、藏露、方圆、转折笔技法)",
      structure: "Balanced center of gravity with dynamic shaping and deliberate slant (重心平稳，造型有疏密倚侧变化)",
      layout: "Interplay of void and solid, staggered sizing (虚实相生，大小错落)"
    },
    criteriaSummary_zh: "笔画—点画形态、质感较好，有提按、藏露、方圆、转折笔技法。结体—重心平稳，造型有疏密倚侧变化。章法—虚实相生，大小错落。",
    skillDescription: "Accomplished level: Strokes, character structure, and layout exist in harmonious and disciplined order.",
    skillDescription_zh: "较有功底。点画、结体、章法上呈和谐有序状态。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-6.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-6.png",
        title: "Hard-Pen Grade 6 Running / Clerical Script Plate",
        title_zh: "硬笔书法六级行书/隶书名帖临本范例",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Grade 6 plate illustrating fluid running connections and dynamic size variations across 100+ characters."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 6
  },
  {
    id: "GRADE-HP-07",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 7,
    levelNumber: 7,
    title: {
      en: "Hard-Pen Grade 7",
      zh: "硬笔书法 七级",
      ms: "Pen Keras Gred 7",
      ta: "வன் பேனா நிலை 7"
    },
    chineseTitle: "硬笔书法 · 七级",
    overview: "Original creation piece demonstrating vigorous brushwork, dynamic equilibrium, and artistic seal placement.",
    overview_zh: "创作作品一件，点画形态浑厚遒劲，字形巧妙，在动态中见平衡，用印恰当。",
    task: "Create one original calligraphic creation piece; minimum 120 characters.",
    task_zh: "创作作品一件，不少于120字。",
    characterMinimum: 120,
    characterDisplay: "120+ Characters (不少于120字)",
    durationMinutes: 120,
    durationDisplay: "120 mins (120分钟)",
    paperSize: "8K sheet or larger",
    paperSize_zh: "8开或8开以上",
    writingTools: "Pen",
    writingTools_zh: "钢笔",
    requiredStyles: "Original Creation (原创作品创作)",
    requiredStyles_zh: "书法创作（楷/行/隶等书体创作）",
    assessmentCriteria: {
      strokes: "Robust, vigorous strokes; techniques applied with instinctive mastery (点画形态浑厚、遒劲，运用得心应手)",
      structure: "Graceful, ingenious structure; balance maintained within dynamic motion (字形美观，结构巧妙，动态中见平衡)",
      layout: "Staggered layout, proper hierarchy, smooth momentum, proper seal placement (错落有致，主次得体，气势流畅，用印恰当)"
    },
    criteriaSummary_zh: "笔画—点画形态浑厚、遒劲。结体—字形美观，结构巧妙，在动态中见平衡。章法—错落有致，主次得体，气势流畅，用印恰当。",
    skillDescription: "Deep proficiency and established creative capability in calligraphic composition.",
    skillDescription_zh: "有较深功力和创作水平。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-7.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-7.png",
        title: "Hard-Pen Grade 7 Original Creation Work",
        title_zh: "硬笔书法七级创作范本作品",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Exemplary 120-character Grade 7 creation displaying cohesive text flow, side inscription, and seal balance."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 7
  },
  {
    id: "GRADE-HP-08",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 8,
    levelNumber: 8,
    title: {
      en: "Hard-Pen Grade 8",
      zh: "硬笔书法 八级",
      ms: "Pen Keras Gred 8",
      ta: "வன் பேனா நிலை 8"
    },
    chineseTitle: "硬笔书法 · 八级",
    overview: "Consummate brushwork precision, generous posture, flowing breath vitality, and pronounced creative consciousness.",
    overview_zh: "创作作品一件，点画精到，大方平正，气息流动，富有浓厚创作意识。",
    task: "Create one original calligraphic creation piece; minimum 120 characters.",
    task_zh: "创作作品一件，不少于120字。",
    characterMinimum: 120,
    characterDisplay: "120+ Characters (不少于120字)",
    durationMinutes: 150,
    durationDisplay: "150 mins (150分钟)",
    paperSize: "8K sheet or larger",
    paperSize_zh: "8开或8开以上",
    writingTools: "Pen",
    writingTools_zh: "钢笔",
    requiredStyles: "Advanced Creation (高阶创作)",
    requiredStyles_zh: "成熟书风创作",
    assessmentCriteria: {
      strokes: "Consummate, precise stroke execution (点画精到)",
      structure: "Generous, upright, aesthetic and moving (大方平正，美观动人)",
      layout: "Apt layout, flowing vitality, rich in rhythm (布局妥帖，气息流动，富有节奏感)"
    },
    criteriaSummary_zh: "笔画—点画精到。结体—大方平正，美观动人。章法—布局妥帖，气息流动，富有节奏感。",
    skillDescription: "Deep artistic mastery with pronounced and cultivated creative consciousness.",
    skillDescription_zh: "功力深厚，有浓厚的创作意识。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-8.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-8.png",
        title: "Hard-Pen Grade 8 Mastery Creation Work",
        title_zh: "硬笔书法八级创作精品作品",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Official Grade 8 creation piece showing refined pen pressure, spatial harmony, and sophisticated rhythm."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 8
  },
  {
    id: "GRADE-HP-09",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "hard-pen",
    trackName: {
      en: "Hard-Pen Calligraphy",
      zh: "硬笔书法",
      ms: "Kaligrafi Pen Keras",
      ta: "வன் பேனா சீன கையெழுத்து"
    },
    grade: 9,
    levelNumber: 9,
    title: {
      en: "Hard-Pen Grade 9",
      zh: "硬笔书法 九级",
      ms: "Pen Keras Gred 9",
      ta: "வன் பேனா நிலை 9"
    },
    chineseTitle: "硬笔书法 · 九级",
    overview: "Apex graduation level: Multi-script creation across at least two scripts (120+ chars each) displaying distinct artistic individuality.",
    overview_zh: "创作不同书体的作品各一件（不低于两件，每种不少于120字），个性、风格、意境、神韵初具。",
    task: "Create at least two separate works in different calligraphic scripts; each script must contain no fewer than 120 characters.",
    task_zh: "创作不同书体的作品各一件（不低于两件）每种书体不少于120字。",
    characterMinimum: 120,
    characterDisplay: "120+ Chars per script, 2+ Works (双书体各不少于120字)",
    durationMinutes: 180,
    durationDisplay: "180 mins (180分钟)",
    paperSize: "8K sheet or larger",
    paperSize_zh: "8开或8开以上",
    writingTools: "Pen",
    writingTools_zh: "钢笔",
    requiredStyles: "Dual Different Scripts (至少两种不同书体创作)",
    requiredStyles_zh: "两种以上书体（如楷、行、隶等）",
    assessmentCriteria: {
      strokes: "Exceptionally consummate, aesthetic form, rich internal substance (非常精到，外形美观，内含丰富)",
      structure: "Surprise found within balance, fresh mastery, profound aesthetic resonance (平中见奇，熟而出新，意趣深邃，富有神韵)",
      layout: "Vivid spirit resonance, ingenious layout, enduring aftertaste, mature individuality and mood (气韵生动，布局巧妙，堪称上乘，个性风韵初具)"
    },
    criteriaSummary_zh: "笔画—非常精到，外形美观，内含丰富。结体—平中见奇，熟而出新，意趣深邃，富有神韵。章法—气韵生动，布局巧妙，耐人寻味，堪称上乘。个性、风格、意境、神韵初具。",
    skillDescription: "Profound mastery: Mature artistic personal style, highly skilled in two or more calligraphy scripts.",
    skillDescription_zh: "功力深厚，有比较成熟的风格，并擅长两种以上的字体。",
    referenceImages: [
      "assets/images/grade/hard-pen/level-9.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/hard-pen/level-9.png",
        title: "Hard-Pen Grade 9 Apex Graduation Work",
        title_zh: "硬笔书法九级毕业高阶创作作品",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Apex Grade 9 creation displaying profound artistic spirit, mature rhythm, and multi-script mastery."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 9
  },

  // =========================================================================
  // PART II: SOFT-PEN CHINESE CALLIGRAPHY (软笔书法)
  // =========================================================================
  {
    id: "GRADE-SP-01",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 1,
    levelNumber: 1,
    title: {
      en: "Soft-Pen Grade 1",
      zh: "软笔书法 一级",
      ms: "Berus Lembut Gred 1",
      ta: "மென்மையான தூரிகை நிலை 1"
    },
    chineseTitle: "软笔书法 · 一级",
    overview: "Accurate model copying of a selected Regular Script passage forming a complete phrase with side signature.",
    overview_zh: "自选一段楷书准确对临，不少于4字且必须成句，能较好模仿书法一般书写技能。",
    task: "Copy one self-selected passage of Regular Script (楷书) accurately from model; minimum 4 characters (must form a complete phrase).",
    task_zh: "自选一段楷书，准确对临。字数不少于四个字（必须成句）。",
    characterMinimum: 4,
    characterDisplay: "4+ Characters, Must Form Phrase (不少于4字，必须成句)",
    durationMinutes: 90,
    durationDisplay: "90 mins (90分钟)",
    paperSize: "4-Foot Half Sheet (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺对开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（自带临摹字帖，须落款）",
    requiredStyles: "Regular Script (楷书)",
    requiredStyles_zh: "楷书（颜/柳/欧/赵等经典法帖）",
    assessmentCriteria: {
      strokes: "Demonstrates general brushwork imitation skills (能较好模仿书法中的一般书写技能)",
      structure: "Recognizable character structure conforming to model (笔画位置基本对位，字体端正)",
      layout: "Must include calligrapher's side inscription (须落款)"
    },
    criteriaSummary_zh: "考核标准：能较好模仿书法中的一般书写技能（自带临摹字帖，须落款）。",
    skillDescription: "Foundational brush control: Learning brush grip, ink dipping, and basic stroke execution on Xuan paper.",
    skillDescription_zh: "初学毛笔书法，能初步掌握执笔与基本笔画运行，对帖临摹出完整词句。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-1.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-1.png",
        title: "Soft-Pen Grade 1 Regular Script Examination Plate",
        title_zh: "软笔书法一级楷书对临参考范件",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Official Grade 1 soft-pen plate illustrating standard four-character phrase with side inscription."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 10
  },
  {
    id: "GRADE-SP-02",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 2,
    levelNumber: 2,
    title: {
      en: "Soft-Pen Grade 2",
      zh: "软笔书法 二级",
      ms: "Berus Lembut Gred 2",
      ta: "மென்மையான தூரிகை நிலை 2"
    },
    chineseTitle: "软笔书法 · 二级",
    overview: "Direct model copying of a Standard Script passage (Regular, Clerical, or Seal) forming a complete sentence with line strength.",
    overview_zh: "自选一段正书（楷、隶、篆）准确对临，不少于12字，考核笔法结构准确度与线条力度。",
    task: "Copy one self-selected passage of Standard Script (Regular, Clerical, or Seal Script) accurately from model; minimum 12 characters (must form a complete phrase).",
    task_zh: "自选一段正书。（楷、隶、篆）准确对临。字数不少于12个字（必须成句）。",
    characterMinimum: 12,
    characterDisplay: "12+ Characters, Must Form Phrase (不少于12字，必须成句)",
    durationMinutes: 90,
    durationDisplay: "90 mins (90分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（自带临摹字帖，须落款）",
    requiredStyles: "Standard Script: Regular, Clerical, or Seal (楷、隶、篆三体任选)",
    requiredStyles_zh: "正书类（楷书、隶书、篆书）",
    assessmentCriteria: {
      strokes: "Brush lift/press, pauses, and linear strength expression (用笔的提按、顿挫及线条的力度表现)",
      structure: "Fidelity to original model brushwork and character structure (模仿原帖笔法、结构的准确度)",
      layout: "Orderly column alignment with signature (自带临摹字帖，须落款)"
    },
    criteriaSummary_zh: "考核标准：模仿原帖笔法、结构的准确度；用笔的提按、顿挫及线条的力度表现（自带临摹字帖，须落款）。",
    skillDescription: "Growing brushwork control: Capable of reproducing brush nuances across 12+ characters.",
    skillDescription_zh: "掌握正书基本笔法，用笔有提按停顿，线条具有初步骨力，落款章法工整。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-2.png",
        title: "Soft-Pen Grade 2 Standard Script Reference Plate",
        title_zh: "软笔书法二级正书对临范本",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Official Grade 2 reference work showcasing 12-character poem lines with balanced lift-and-press brushwork."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 11
  },
  {
    id: "GRADE-SP-03",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 3,
    levelNumber: 3,
    title: {
      en: "Soft-Pen Grade 3",
      zh: "软笔书法 三级",
      ms: "Berus Lembut Gred 3",
      ta: "மென்மையான தூரிகை நிலை 3"
    },
    chineseTitle: "软笔书法 · 三级",
    overview: "Direct model copying of an 18-character Standard Script passage, introducing holistic composition awareness.",
    overview_zh: "自选一段正书（楷、隶、篆）准确对临，不少于18字，要求笔法准确度与作品全局意识。",
    task: "Copy one self-selected passage of Standard Script (Regular, Clerical, or Seal Script) accurately from model; minimum 18 characters (must form a complete phrase).",
    task_zh: "自选一段正书。（楷、隶、篆）准确对临。字数不少于18个字（必须成句）。",
    characterMinimum: 18,
    characterDisplay: "18+ Characters, Must Form Phrase (不少于18字，必须成句)",
    durationMinutes: 120,
    durationDisplay: "120 mins (120分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（自带临摹字帖，须落款）",
    requiredStyles: "Standard Script: Regular, Clerical, or Seal (楷、隶、篆任选)",
    requiredStyles_zh: "正书（楷/隶/篆）",
    assessmentCriteria: {
      strokes: "Fidelity of stroke technique, lift/press, and pause execution (用笔的提按、顿挫及线条力度)",
      structure: "Accuracy of character structures compared to model (模仿原帖笔法、结构的准确度)",
      layout: "Holistic compositional awareness across the entire scroll (作品的全局意识，须落款)"
    },
    criteriaSummary_zh: "考核标准：模仿原帖笔法、结构的准确度；用笔的提按、顿挫及线条的力度表现；作品的全局意识（自带临摹字帖，须落款）。",
    skillDescription: "Entry mastery: Able to maintain structural consistency and rhythmic lines over multi-line text.",
    skillDescription_zh: "具备较好的字帖临摹准确度，在18字篇幅内展现线条节奏与整体章法布局。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-3-1.png",
      "assets/images/grade/soft-pen/level-3-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-3-1.png",
        title: "Soft-Pen Grade 3 Model Practice (Plate 1)",
        title_zh: "软笔书法三级标准临帖作品（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 showing accurate stroke structure and character alignment in standard script."
      },
      {
        plate: 2,
        image: "assets/images/grade/soft-pen/level-3-2.png",
        title: "Soft-Pen Grade 3 Composition Layout (Plate 2)",
        title_zh: "软笔书法三级整体篇幅布局（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 illustrating 18-character arrangement with balanced margins and side inscription."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 12
  },
  {
    id: "GRADE-SP-04",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 4,
    levelNumber: 4,
    title: {
      en: "Soft-Pen Grade 4",
      zh: "软笔书法 四级",
      ms: "Berus Lembut Gred 4",
      ta: "மென்மையான தூரிகை நிலை 4"
    },
    chineseTitle: "软笔书法 · 四级",
    overview: "Direct model copying of an ancient classical Regular or Clerical script passage (24+ chars) with official seal stamping.",
    overview_zh: "自选一段古代经典楷书或隶书准确对临，不少于24字，须落款加盖印章。",
    task: "Copy one self-selected passage of ancient classical Regular or Clerical script accurately from model; minimum 24 characters.",
    task_zh: "自选一段古代经典楷书或隶书，准确对临。字数不少于24个字。",
    characterMinimum: 24,
    characterDisplay: "24+ Characters (不少于24字)",
    durationMinutes: 120,
    durationDisplay: "120 mins (120分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（须落款加盖印章）",
    requiredStyles: "Ancient Classical Regular or Clerical Script (古代经典楷书或隶书)",
    requiredStyles_zh: "古代经典楷书或隶书",
    assessmentCriteria: {
      strokes: "Stroke imitation fidelity, lift/press, pauses, and line tension (用笔的提按、顿挫及线条的力度表现)",
      structure: "Precise structural adherence to classical models (模仿原帖笔法、结构的准确度)",
      layout: "Complete scroll layout with side inscription and red artist seal (全局意识，须落款加盖印章)"
    },
    criteriaSummary_zh: "考核标准：模仿原帖笔法、结构的准确度；用笔的提按、顿挫及线条的力度表现；作品的全局意识（自带临摹字帖，须落款加盖印章）。",
    skillDescription: "Intermediate advancement: Proficient handling of ancient model nuances, complete formatting with artist seal.",
    skillDescription_zh: "对经典法帖具备成熟的临摹能力，作品具备完整落款与钤印规制。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-4-1.png",
      "assets/images/grade/soft-pen/level-4-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-4-1.png",
        title: "Soft-Pen Grade 4 Classical Model Copy (Plate 1)",
        title_zh: "软笔书法四级古代经典对临（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 illustrating 24+ character classical model imitation with steady centerline and bone-structure."
      },
      {
        plate: 2,
        image: "assets/images/grade/soft-pen/level-4-2.png",
        title: "Soft-Pen Grade 4 Inscription & Seal Detail (Plate 2)",
        title_zh: "软笔书法四级落款印章范例（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 displaying correct placement of side signature and vermilion artist seal."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 13
  },
  {
    id: "GRADE-SP-05",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 5,
    levelNumber: 5,
    title: {
      en: "Soft-Pen Grade 5",
      zh: "软笔书法 五级",
      ms: "Berus Lembut Gred 5",
      ta: "மென்மையான தூரிகை நிலை 5"
    },
    chineseTitle: "软笔书法 · 五级",
    overview: "Dual examination: Direct model copy (20+ chars) plus recitation from memory (背临, 20+ chars) of ancient classical regular/clerical script.",
    overview_zh: "对临古代经典楷/隶不少于20字，并自选经典背临不少于20字，考查默写内化功力。",
    task: "Part 1: Direct copy of ancient classical regular or clerical script (min. 20 chars). Part 2: Recite from memory (背临) ancient classical regular or clerical script (min. 20 chars).",
    task_zh: "自选一段古代经典楷书或隶书，准确对临。字数不少于20个字。自选一段古代经典楷书或隶书的背临。字数不少于20个字。",
    characterMinimum: 40,
    characterDisplay: "20+ Chars Copy + 20+ Chars Recite (对临20字+背临20字)",
    durationMinutes: 120,
    durationDisplay: "120 mins (120分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（须落款加盖印章）",
    requiredStyles: "Classical Regular or Clerical Script: Direct Copy & Memory Recitation (楷书/隶书对临与背临)",
    requiredStyles_zh: "古代经典楷书或隶书（对临与背临）",
    assessmentCriteria: {
      strokes: "Stroke fidelity, line firmness, and variation under memory recitation (提按、顿挫及线条力度)",
      structure: "Structural accuracy preserved without model presence (背临原帖笔法结构的准确度)",
      layout: "Dual-segment balance on scroll with signature and seal (整体章法，须落款加盖印章)"
    },
    criteriaSummary_zh: "考核标准：模仿原帖笔法、结构的准确度；用笔的提按、顿挫及线条的力度表现；作品的全局意识（须落款加盖印章）。",
    skillDescription: "Advanced memory retention: Able to faithfully recreate classical brush structures from internal memory.",
    skillDescription_zh: "已熟读深思古代名帖，能在无字帖参考下准确背临出经典笔法与结体特征。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-5-1.png",
      "assets/images/grade/soft-pen/level-5-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-5-1.png",
        title: "Soft-Pen Grade 5 Direct Copy Plate (Plate 1)",
        title_zh: "软笔书法五级经典对临范例（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 illustrating accurate direct model transcription of classical Han or Tang characters."
      },
      {
        plate: 2,
        image: "assets/images/grade/soft-pen/level-5-2.png",
        title: "Soft-Pen Grade 5 Memory Recitation Plate (Plate 2)",
        title_zh: "软笔书法五级背临范例（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 presenting memory recitation work demonstrating internal command of brush morphology."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 14
  },
  {
    id: "GRADE-SP-06",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 6,
    levelNumber: 6,
    title: {
      en: "Soft-Pen Grade 6",
      zh: "软笔书法 六级",
      ms: "Berus Lembut Gred 6",
      ta: "மென்மையான தூரிகை நிலை 6"
    },
    chineseTitle: "软笔书法 · 六级",
    overview: "Memory recitation of classical model (20+ chars) plus original Regular Script themed creation of a Five-Character Quatrain (20 chars).",
    overview_zh: "经典法帖背临不少于20字（楷/隶任选），并进行楷书命题创作五言绝句20字。",
    task: "Part 1: Recitation from memory (背临) of ancient classical model in regular or clerical script (min. 20 chars). Part 2: Themed creation in Regular Script (Five-Character Quatrain 五言绝句, 20 chars).",
    task_zh: "自选一种古代经典法帖中一段的背临。（楷、隶二体，任选其一）不少于20个字。楷书命题创作（五言绝句），20个字。",
    characterMinimum: 40,
    characterDisplay: "20 Chars Recite + 20 Chars Creation (背临20字+五言绝句创作20字)",
    durationMinutes: 150,
    durationDisplay: "150 mins (150分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（须落款加盖印章）",
    requiredStyles: "Regular or Clerical Recitation + Regular Script Themed Creation (楷/隶背临 + 楷书五言绝句创作)",
    requiredStyles_zh: "背临（楷/隶）及楷书命题创作",
    assessmentCriteria: {
      strokes: "Strength of line and variation across memory and thematic prompt (提按、顿挫与线条力度)",
      structure: "Mastery of structure in independent poetic creation (命题创作中笔法、结构的表现能力)",
      layout: "Overall compositional arrangement of Five-Character Quatrain with seal (章法表现能力，须落款加盖印章)"
    },
    criteriaSummary_zh: "考核标准：模仿原帖笔法、结构的准确度；用笔的提按、顿挫及线条的力度表现；作品的全局意识；命题创作中笔法、结构、章法的表现能力（须落款加盖印章）。",
    skillDescription: "Transition to original creation: Combines memory mastery with creative stanza synthesis.",
    skillDescription_zh: "从纯临摹成功过渡至主题创作，在五言绝句创作中准确呈现法度与意境。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-6-1.png",
      "assets/images/grade/soft-pen/level-6-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-6-1.png",
        title: "Soft-Pen Grade 6 Model Recitation (Plate 1)",
        title_zh: "软笔书法六级法帖背临作品（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 showing classical regular/clerical script recitation section."
      },
      {
        plate: 2,
        image: "assets/images/grade/soft-pen/level-6-2.png",
        title: "Soft-Pen Grade 6 Five-Character Quatrain Creation (Plate 2)",
        title_zh: "软笔书法六级五言绝句命题创作（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 illustrating 20-character Five-Character Quatrain regular script creation with seal."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 15
  },
  {
    id: "GRADE-SP-07",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 7,
    levelNumber: 7,
    title: {
      en: "Soft-Pen Grade 7",
      zh: "软笔书法 七级",
      ms: "Berus Lembut Gred 7",
      ta: "மென்மையான தூரிகை நிலை 7"
    },
    chineseTitle: "软笔书法 · 七级",
    overview: "Creative imitation of themed Five-Character Quatrains utilizing two distinct classical master styles (Regular and Clerical).",
    overview_zh: "用两种古代经典法帖风格形态（楷、隶二体），对命题五言绝句进行模仿创作，整体布局协调合理。",
    task: "Creative imitation of themed prompt using two classical master styles (Regular and Clerical). Content: Five-Character Quatrains (五言绝句). Brushwork, structure, and composition must align closely with selected models with harmonious layout.",
    task_zh: "用两种古代经典法帖中的风格形态，对命题进行模仿创作（楷、隶二体）。内容五言绝句。模仿作品与所选法帖笔法、结构、章法的特点接近，整体布局协调合理。",
    characterMinimum: 40,
    characterDisplay: "Dual Five-Character Quatrains (楷隶双体五言绝句)",
    durationMinutes: 150,
    durationDisplay: "150 mins (150分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（须落款加盖印章）",
    requiredStyles: "Dual Classical Styles: Regular and Clerical (楷、隶二体模仿创作)",
    requiredStyles_zh: "楷体与隶体双风格形态创作",
    assessmentCriteria: {
      strokes: "Fidelity to style nuances of both selected classical schools (两种书体笔法风格的贴合度与力度)",
      structure: "Structural characteristics closely conforming to respective master steles (结构特点接近原帖，平稳生动)",
      layout: "Harmonious, coordinated dual-poem composition across scrolls (整体布局协调合理，落款印章严谨)"
    },
    criteriaSummary_zh: "考核标准：模仿原帖笔法、结构的准确度；用笔的提按、顿挫及线条的力度表现；作品的全局意识；命题创作中笔法、结构、章法的表现能力（须落款加盖印章）。",
    skillDescription: "Dual-style proficiency: Fluently translates poetic themes into distinct Regular and Clerical calligraphic aesthetics.",
    skillDescription_zh: "精熟楷、隶两种风格流派，能够准确提取不同字帖风格进行格律诗创作。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-7-1.png",
      "assets/images/grade/soft-pen/level-7-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-7-1.png",
        title: "Soft-Pen Grade 7 Regular Script Style (Plate 1)",
        title_zh: "软笔书法七级楷书风格创作（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 showing Regular Script Five-Character Quatrain imitation composition."
      },
      {
        plate: 2,
        image: "assets/images/grade/soft-pen/level-7-2.png",
        title: "Soft-Pen Grade 7 Clerical Script Style (Plate 2)",
        title_zh: "软笔书法七级隶书风格创作（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 demonstrating Han Dynasty Clerical Script Five-Character Quatrain imitation."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 16
  },
  {
    id: "GRADE-SP-08",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 8,
    levelNumber: 8,
    title: {
      en: "Soft-Pen Grade 8",
      zh: "软笔书法 八级",
      ms: "Berus Lembut Gred 8",
      ta: "மென்மையான தூரிகை நிலை 8"
    },
    chineseTitle: "软笔书法 · 八级",
    overview: "Creative composition in Standard Script (正书) and Running/Cursive Script (行草) (Seven-Character Quatrains, 28+ chars each) emphasizing inventive personal expression.",
    overview_zh: "正书类与行草类各一种风格命题创作（七言绝句），章法完善，点画有力，提倡创造性。",
    task: "Themed creation of one work in Standard Script (正书) and one in Running/Cursive Script (行草) (Seven-Character Quatrain 七言绝句). Complete composition, powerful strokes, grounded in deep traditional understanding with encouraged creativity.",
    task_zh: "正书类和行草类各一种风格的命题创作（七言绝句）。作品章法完善，点画有力，风格是出于对传统的理解而不是简单的模仿，提倡创造性。",
    characterMinimum: 56,
    characterDisplay: "Dual Seven-Character Quatrains: Standard & Running/Cursive (正书与行草七言绝句各一)",
    durationMinutes: 180,
    durationDisplay: "180 mins (180分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（须落款加盖印章）",
    requiredStyles: "Standard Script + Running/Cursive Script (正书类与行草类)",
    requiredStyles_zh: "正书类及行草类各一种风格",
    assessmentCriteria: {
      strokes: "Depth of traditional mastery demonstrated in brush stroke weight (传统功力的深浅，点画有力)",
      structure: "Strength and individuality of creative stylistic execution (创作中体现出个人风格创造性和强弱)",
      layout: "Flawless overall composition and spatial momentum (作品章法完善，整体艺术效果)"
    },
    criteriaSummary_zh: "考核标准：创作中体现出的传统功力的深浅；创作中体现出个人风格创造性和强弱；作品的整体效果。",
    skillDescription: "Deep traditional foundation: Moves beyond simple imitation into creative calligraphy with personal artistic voice.",
    skillDescription_zh: "书法风格植根于传统积淀，在正书与行草的七言绝句创作中表现出独特的创造性与笔墨气度。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-8-1.png",
      "assets/images/grade/soft-pen/level-8-2.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-8-1.png",
        title: "Soft-Pen Grade 8 Standard Script Creation (Plate 1)",
        title_zh: "软笔书法八级正书创作作品（范件一）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 1 showcasing Seven-Character Quatrain regular/standard script creation."
      },
      {
        plate: 2,
        image: "assets/images/grade/soft-pen/level-8-2.png",
        title: "Soft-Pen Grade 8 Running/Cursive Creation (Plate 2)",
        title_zh: "软笔书法八级行草创作作品（范件二）",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Plate 2 illustrating flowing Running/Cursive Seven-Character Quatrain with dynamic tempo."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 17
  },
  {
    id: "GRADE-SP-09",
    discipline: "chinese-calligraphy",
    discipline_zh: "中国书法",
    track: "soft-pen",
    trackName: {
      en: "Soft-Pen Calligraphy",
      zh: "软笔书法",
      ms: "Kaligrafi Berus Lembut",
      ta: "மென்மையான தூரிகை சீன கையெழுத்து"
    },
    grade: 9,
    levelNumber: 9,
    title: {
      en: "Soft-Pen Grade 9",
      zh: "软笔书法 九级",
      ms: "Berus Lembut Gred 9",
      ta: "மென்மையான தூரிகை நிலை 9"
    },
    chineseTitle: "软笔书法 · 九级",
    overview: "Apex graduation masterclass: Standard Script (choice of 2 from Regular, Clerical, Seal) plus two Running Script styles (Seven-Character Quatrains), expressing poetic lyrical emotion.",
    overview_zh: "正书类（楷/隶/篆选两体）与两种行书命题创作（七言绝句），线条与风神意韵完美展现作品抒情性。",
    task: "Themed creation: Standard Script category (choose two from Regular, Clerical, or Seal Script), plus two Running Script styles (Seven-Character Quatrains 七言绝句). Complete composition, powerful brushwork, with pronounced individual stylistic expression.",
    task_zh: "正书类（楷、隶、篆三体中任选两体），两种行书的命题创作（七言绝句）。作品章法完整，点画有力，有一定个性的风格表现。",
    characterMinimum: 112,
    characterDisplay: "Four Seven-Character Quatrains Total: 2 Standard + 2 Running (两首正书+两首行书七言绝句)",
    durationMinutes: 180,
    durationDisplay: "180 mins (180分钟)",
    paperSize: "4-Foot 3-Cut (66×45cm) or 4-Foot 4-Cut (66×33cm)",
    paperSize_zh: "四尺三开66*45cm或四尺四开66*33cm",
    writingTools: "Chinese Calligraphy Brush (毛笔)",
    writingTools_zh: "毛笔（须落款加盖印章）",
    requiredStyles: "Standard Script (Two chosen from Regular/Clerical/Seal) + Two Running Script Styles (正书选两体+两体行书)",
    requiredStyles_zh: "正书两体（楷/隶/篆选二）及两种行书风格",
    assessmentCriteria: {
      strokes: "Profound traditional brushwork depth and commanding stroke tension (传统功力深浅，点画有力)",
      structure: "Distinct individual stylistic identity, sophisticated character shaping (个人风格创造性与鲜明个性)",
      layout: "Complete scroll composition and lyrical poetic atmosphere (整体艺术效果，线条与风神意韵之抒情性)"
    },
    criteriaSummary_zh: "考核标准：创作中体现出的传统功力的深浅；创作中体现出个人风格创造性和强弱；作品的整体效果；作品线条与风神意韵的表现，体现作品的抒情性。",
    skillDescription: "Mastery graduation echelon: Mastery of multiple scripts, individual calligraphic spirit, expressive poetic resonance.",
    skillDescription_zh: "博通多体，诗书画印气韵融通，具有成熟鲜明的艺术面貌与深刻的文人抒情性。",
    referenceImages: [
      "assets/images/grade/soft-pen/level-9.png"
    ],
    artworks: [
      {
        plate: 1,
        image: "assets/images/grade/soft-pen/level-9.png",
        title: "Soft-Pen Grade 9 Master Graduation Work",
        title_zh: "软笔书法九级毕业大师级创作作品",
        poemTitle: null,
        poemStatus: "clientConfirmationRequired",
        description: "Official Grade 9 graduation work exemplifying high aesthetic vitality, fluid lines, and profound calligraphic spirit."
      }
    ],
    status: "active",
    contentStatus: "verifiedFromSource",
    sortOrder: 18
  }
];

export function getGradesByTrack(track) {
  return CHINESE_CALLIGRAPHY_GRADES.filter(g => g.track === track);
}

export function getGradeByTrackAndLevel(track, level) {
  const lvlNum = parseInt(level, 10);
  return CHINESE_CALLIGRAPHY_GRADES.find(g => g.track === track && g.grade === lvlNum);
}
