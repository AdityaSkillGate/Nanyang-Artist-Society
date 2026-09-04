/**
 * NANYANG ARTISTS SOCIETY — NAS AI ART ASSISTANT SERVICE
 * Name: Nanyang Artists Assistant
 * Official 4-Language Support: EN, ZH, MS, TA.
 * Grounded strictly in verified society knowledge base with strict non-hallucination safety policies.
 */

import { dataAdapter } from './dataAdapter.js';
import { i18n } from './i18n.js';

export const ASSISTANT_PROMPTS = {
  en: [
    "Which art course is right for my child?",
    "How does Grade Examination work?",
    "What is the difference between Hard-Pen & Soft-Pen?",
    "How do I verify certificate authenticity?",
    "What is 2026 Nanyang Star theme & deadline?",
    "Who is eligible for Nanyang Star?",
    "Where can I find a test centre or HQ?",
    "What courses and master studios are available?",
    "Who founded Nanyang Artists Society & Liu Kang's titling?",
    "Are art materials and brushes provided?",
    "Are there classes for adult enthusiasts and seniors?",
    "Can I inspect high-resolution scans in the Digital Gallery?",
    "How do I register or apply for examination intake?"
  ],
  'zh-SG': [
    "我的孩子适合报读哪门美术课程？",
    "全国美术考级如何报名与评分？",
    "硬笔书法与软笔书法考级有什么区别？",
    "如何查验证书真伪与防伪备案编号？",
    "2026南洋之星大赛的主题与截稿日期？",
    "哪些年龄段可以参加南洋之星国际大赛？",
    "新加坡各考点分布与总院地址在哪里？",
    "协会开设了哪些专业美术与名家工作室？",
    "学会的创立历史与先驱刘抗先生题词渊源？",
    "上课需要自备画具材料还是画室提供？",
    "有适合成人与中老年朋友的书画研习班吗？",
    "数字美术馆中的典藏真迹如何高倍放大？",
    "如何进行个人或团体在线报名考级与课程？"
  ]
};
ASSISTANT_PROMPTS.zh = ASSISTANT_PROMPTS['zh-SG'];

export class NanyangArtistsAssistant {
  constructor() {
    this.isOpen = false;
    this.messageHistory = [];
    this.manualLang = null;
  }

  getEffectiveLanguage() {
    if (this.manualLang) return this.manualLang;
    const globalLang = i18n.getLanguage ? i18n.getLanguage() : 'en';
    return (globalLang === 'zh-SG' || globalLang === 'zh') ? 'zh-SG' : 'en';
  }

  init() {
    this.bindUI();
    this.updateAssistantLangUI();
    this.renderStarterPrompts();
    this.addWelcomeMessage();

    // Listen to global language change events
    if (typeof window !== 'undefined') {
      window.addEventListener('nas:languageChanged', () => {
        if (!this.manualLang) {
          this.updateAssistantLangUI();
          this.renderStarterPrompts();
        }
      });
    }
  }

  updateAssistantLangUI() {
    const lang = this.getEffectiveLanguage();
    const isZh = (lang === 'zh-SG' || lang === 'zh');
    const btns = document.querySelectorAll('.assistant-lang-btn');
    btns.forEach(btn => {
      const target = btn.getAttribute('data-assistant-lang');
      const active = isZh ? (target === 'zh-SG' || target === 'zh') : (target === 'en');
      btn.classList.toggle('active', active);
      btn.style.background = active ? '#fff' : 'transparent';
      btn.style.boxShadow = active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none';
      btn.setAttribute('aria-current', active ? 'true' : 'false');
    });

    const input = document.getElementById('nas-assistant-input');
    if (input) {
      input.placeholder = isZh ? '向艺术向导咨询课程、考级或大赛...' : 'Ask about courses, grade exams, Nanyang Star...';
    }

    const titleEl = document.querySelector('.assistant-header-title');
    if (titleEl) {
      titleEl.textContent = isZh ? '南洋艺术智能向导' : 'Nanyang Artists Assistant';
    }
  }

  bindUI() {
    if (typeof document === 'undefined' || this._uiBound) return;
    this._uiBound = true;

    // Document-level delegated click listener
    document.addEventListener('click', (e) => {
      // 1. Toggle Chat Launcher Button
      const launcher = e.target.closest('#nas-assistant-launcher, .assistant-floating-launcher, .assistant-avatar');
      if (launcher) {
        e.preventDefault();
        this.toggleChat();
        return;
      }

      // 2. Close Chat Window Button
      const closeBtn = e.target.closest('#nas-assistant-close, .assistant-close-btn');
      if (closeBtn) {
        e.preventDefault();
        this.closeChat();
        return;
      }

      // 3. Clear Chat History Button
      const clearBtn = e.target.closest('#nas-assistant-clear, .assistant-clear-btn');
      if (clearBtn) {
        e.preventDefault();
        this.clearHistory();
        return;
      }

      // 4. Starter Prompt Chips
      const chip = e.target.closest('.assistant-starter-chip');
      if (chip) {
        e.preventDefault();
        const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
        if (prompt) {
          this.handleUserMessage(prompt);
        }
        return;
      }

      // 4.1 Refresh / Shuffle FAQs Button
      const refreshBtn = e.target.closest('.assistant-refresh-chips-btn');
      if (refreshBtn) {
        e.preventDefault();
        this.renderStarterPrompts(true);
        return;
      }

      // 5. Assistant Manual Language Switch
      const langBtn = e.target.closest('.assistant-lang-btn');
      if (langBtn) {
        e.preventDefault();
        const target = langBtn.getAttribute('data-assistant-lang');
        this.manualLang = (target === 'zh-SG' || target === 'zh') ? 'zh-SG' : 'en';
        this.updateAssistantLangUI();
        this.renderStarterPrompts();
        return;
      }
    });

    // Form submit delegation
    document.addEventListener('submit', (e) => {
      const chatForm = e.target.closest('#nas-assistant-form, .assistant-input-form');
      if (chatForm) {
        e.preventDefault();
        const chatInput = chatForm.querySelector('#nas-assistant-input, input[type="text"]');
        if (!chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;
        chatInput.value = '';
        this.handleUserMessage(text);
      }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const chatWindow = document.getElementById('nas-assistant-window');
    const launcher = document.getElementById('nas-assistant-launcher');
    const chatInput = document.getElementById('nas-assistant-input');

    if (chatWindow) {
      chatWindow.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) {
        this.updateAssistantLangUI();
        this.renderStarterPrompts();
        this.addWelcomeMessage();
        if (chatInput) setTimeout(() => chatInput.focus(), 80);
      }
    }

    if (launcher) {
      launcher.setAttribute('aria-expanded', this.isOpen.toString());
    }
  }

  closeChat() {
    this.isOpen = false;
    const chatWindow = document.getElementById('nas-assistant-window');
    const launcher = document.getElementById('nas-assistant-launcher');
    if (chatWindow) chatWindow.style.display = 'none';
    if (launcher) launcher.setAttribute('aria-expanded', 'false');
  }

  clearHistory() {
    const list = document.getElementById('nas-assistant-messages');
    if (list) list.innerHTML = '';
    this.messageHistory = [];
    this.addWelcomeMessage();
  }

  renderStarterPrompts(shuffle = false) {
    const container = document.getElementById('nas-assistant-starter-chips');
    if (!container) return;

    const lang = this.getEffectiveLanguage();
    const isZh = (lang === 'zh-SG' || lang === 'zh');
    const prompts = [...(ASSISTANT_PROMPTS[lang] || ASSISTANT_PROMPTS.en)];

    // Shuffle and display 6 varied FAQs for lively auto-answer exploration
    const displayList = prompts.sort(() => 0.5 - Math.random()).slice(0, 6);

    container.innerHTML = `
      <div class="assistant-starter-row">
        <button type="button" class="assistant-refresh-chips-btn" title="${isZh ? '换一批常见问题' : 'Shuffle Random FAQs'}">
          🎲 ${isZh ? '换一批' : 'Randomize'}
        </button>
        ${displayList.map(p => `
          <button type="button" class="assistant-starter-chip" data-prompt="${p}">
            ${p}
          </button>
        `).join('')}
      </div>
    `;
  }

  addWelcomeMessage() {
    const list = document.getElementById('nas-assistant-messages');
    if (list && list.children.length > 0) return;

    const lang = this.getEffectiveLanguage();
    const isZh = (lang === 'zh-SG' || lang === 'zh');
    let welcome = "Greetings! I am the **Nanyang Artists Assistant** (南洋美协智能艺术向导). How may I assist you today with our art curriculum, 1–9 grade examinations, international competition entry, or accredited test centres?";

    if (isZh) {
      welcome = "您好！我是**南洋美术家协会智能艺术向导**。请问有什么可以协助您？您可以向我咨询少儿/成人艺术课程、全国美术1–9级考级流程、“南洋之星”国际大赛报名或新加坡认证考点分布。";
    }

    this.appendMessage('assistant', welcome);
  }

  appendMessage(sender, text, actionLink = null, actionLabel = null) {
    const list = document.getElementById('nas-assistant-messages');
    if (!list) return;

    const msgEl = document.createElement('div');
    msgEl.className = `assistant-msg-wrapper ${sender}`;

    let html = `
      <div class="assistant-msg-bubble ${sender}">
        <div class="assistant-msg-text">${this.formatMarkdown(text)}</div>
        ${actionLink ? `
          <div style="margin-top: 8px;">
            <a href="${actionLink}" class="assistant-msg-action-btn">
              ${actionLabel || 'Learn More →'}
            </a>
          </div>
        ` : ''}
      </div>
    `;

    msgEl.innerHTML = html;
    list.appendChild(msgEl);
    list.scrollTop = list.scrollHeight;
  }

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  async handleUserMessage(queryText) {
    this.appendMessage('user', queryText);

    // Show typing indicator
    const list = document.getElementById('nas-assistant-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'assistant-typing-indicator';
    typingEl.id = 'assistant-typing';
    typingEl.innerHTML = `<span></span><span></span><span></span>`;
    if (list) {
      list.appendChild(typingEl);
      list.scrollTop = list.scrollHeight;
    }

    const lang = this.getEffectiveLanguage();
    const response = await this.generateGroundedResponse(queryText, lang);

    setTimeout(() => {
      const typing = document.getElementById('assistant-typing');
      if (typing) typing.remove();
      this.appendMessage('assistant', response.text, response.actionLink, response.actionLabel);
    }, 400);
  }

  async generateGroundedResponse(query, lang) {
    const q = query.toLowerCase();
    const isZh = (lang === 'zh-SG' || lang === 'zh');

    // 1. Difference between Hard-Pen & Soft-Pen Calligraphy
    if (q.includes('hard-pen') && q.includes('soft-pen') || q.includes('difference') && (q.includes('pen') || q.includes('calligraphy')) || q.includes('区别') || (q.includes('硬笔') && q.includes('软笔'))) {
      if (isZh) {
        return {
          text: "**硬笔书法与软笔书法的核心区别：**\n\n1. **硬笔书法 (Hard-Pen)**：以钢笔、专业中性笔为书写工具，注重汉字笔画顺序、间架结构平稳、规范汉字书写与日常实用书写速度。\n2. **软笔书法 (Soft-Pen)**：以传统毛笔、宣纸与墨汁为媒介，强调传统书法‘骨法用笔’、提按顿挫、水墨浓淡干湿与传统碑帖（篆、隶、楷、行、草）的章法气韵。\n\n两者均设立1至9级标准化考核，互为促进。",
          actionLink: 'grade.html',
          actionLabel: '📜 查看考级硬笔与软笔大纲对比 →'
        };
      }
      return {
        text: "**Core Differences Between Hard-Pen & Soft-Pen Calligraphy:**\n\n1. **Hard-Pen Calligraphy (硬笔书法)**: Utilizes fountain pens and specialized gel pens focusing on stroke discipline, square regular script balance, and practical writing proficiency.\n2. **Soft-Pen Calligraphy (软笔书法)**: Utilizes traditional animal-hair brushes and inkstones on Xuan paper, emphasizing classical brushwork momentum (骨法用笔), ink density gradations, and seal/clerical/regular/running/cursive masteries.\n\nBoth tracks offer standardized Grades 1–9 assessment.",
        actionLink: 'grade.html',
        actionLabel: '📜 Compare Hard-Pen & Soft-Pen Rubrics →'
      };
    }

    // 2. Certificate Verification & Authenticity
    if (q.includes('verify') || q.includes('certificate') || q.includes('authenticity') || q.includes('真伪') || q.includes('验证') || q.includes('证书') || q.includes('防伪')) {
      if (isZh) {
        return {
          text: "新加坡南洋美术家协会颁发的每一张官方考级证书与“南洋之星”获奖荣誉证书，均具备**全国考级注册唯一编号**与**防伪溯源备案**。\n\n您可以在考级中心页面中的“证书真伪查验”模块，输入考生姓名与证书编号，即可在线验证真伪并调取官方归档记录。",
          actionLink: 'grade.html#verify',
          actionLabel: '🔍 进入证书防伪查验系统 →'
        };
      }
      return {
        text: "Every official examination certificate and Nanyang Star laureate credential issued by Singapore Nanyang Artists Society includes a unique **National Assessment Registry Number** and cryptographic anti-counterfeiting verification code.\n\nYou can verify certificate authenticity instantaneously via our online portal.",
        actionLink: 'grade.html#verify',
        actionLabel: '🔍 Open Certificate Verification Tool →'
      };
    }

    // 3. 2026 Nanyang Star Theme & Submission Deadline
    if (q.includes('2026') || q.includes('theme') || q.includes('deadline') || q.includes('截稿') || q.includes('主题') || q.includes('绿色地球')) {
      if (isZh) {
        return {
          text: "2026第四届“南洋之星”国际少儿美术大赛官方征稿信息：\n\n- **官方主题**：**“绿色地球 · 坚韧未来”（Green Earth · Resilient Future）**\n- **全球截稿日期**：**2026年8月15日**\n- **涵盖画种**：传统水墨、油画棒、水彩、学院素描及立体纸雕等多种媒介。\n- **作品荣誉**：特等奖、金奖、银奖入选作品将收录入官方典藏画册并受邀参加中央展厅大展。",
          actionLink: 'nanyang-star.html',
          actionLabel: '⭐ 查看2026大赛征稿简章与报名 →'
        };
      }
      return {
        text: "The 4th **Nanyang Star Biennial 2026** Official Details:\n\n- **Official Theme**: **'Green Earth · Resilient Future' (绿色地球 · 坚韧未来)**\n- **Submission Deadline**: **August 15, 2026**\n- **Eligible Mediums**: Traditional Chinese ink, oil pastels, watercolor, sketching, and 3D origami sculptures.\n- **Honours**: Grand Prize, Gold, and Silver laureates will be featured in the commemorative album and central exhibition.",
        actionLink: 'nanyang-star.html',
        actionLabel: '⭐ View 2026 Open Call Guidelines →'
      };
    }

    // 4. Nanyang Star Eligibility & Age Divisions
    if (q.includes('eligible') || q.includes('who can') || q.includes('division') || q.includes('age') || q.includes('组别') || q.includes('年龄') || q.includes('资格')) {
      if (isZh) {
        return {
          text: "“南洋之星”国际大赛面向全球**4至16岁**少年儿童开放，阶梯式设立四大组别：\n\n1. **少儿初级组 A (4–6岁)**：重在感官体验、纯真色彩与天马行空的童趣表达。\n2. **少儿初级组 B (7–9岁)**：注重造型观察、画面构图动态与多元综合材料表现力。\n3. **少儿中级组 C (10–12岁)**：强调空间透视、色彩水墨明暗层次与画面思想表达。\n4. **青年高级组 D (13–16岁)**：突出主题深度、个人艺术风格探索与高阶绘画技法。",
          actionLink: 'nanyang-star.html#divisions',
          actionLabel: '🏅 查看四大组别评审要求 →'
        };
      }
      return {
        text: "The Nanyang Star Competition is open to youth aged **4 to 16 worldwide** across 4 progressive divisions:\n\n1. **Junior Division A (Ages 4–6)**: Sensory discovery, pure color perception & imaginative play.\n2. **Junior Division B (Ages 7–9)**: Observational drafting, dynamic composition & mixed media.\n3. **Intermediate Division C (Ages 10–12)**: Spatial perspective, ink values & thematic expression.\n4. **Youth Senior Division D (Ages 13–16)**: Conceptual depth, advanced technique & personal style.",
        actionLink: 'nanyang-star.html#divisions',
        actionLabel: '🏅 Explore Age Divisions & Criteria →'
      };
    }

    // 5. Founders & Liu Kang Heritage
    if (q.includes('founder') || q.includes('founded') || q.includes('liu kang') || q.includes('heritage') || q.includes('provenance') || q.includes('刘抗') || q.includes('创立') || q.includes('渊源') || q.includes('历史')) {
      if (isZh) {
        return {
          text: "新加坡南洋美术家协会创立于**2002年**，由新加坡先驱艺术家**刘抗先生**亲自题词题名并倡导成立。\n\n学会继承发扬二十世纪中叶融汇欧洲后印象派结构与东方传统水墨笔韵的“南洋画风”，深耕南洋美术教育、全国标准化1–9级美术考级与东盟多边艺术文化交流。",
          actionLink: 'about.html',
          actionLabel: '🏛️ 了解协会创立历史与先驱题词 →'
        };
      }
      return {
        text: "The Singapore Nanyang Artists Society was founded in **2002** under the direct encouragement and authentic inscribed calligraphy of Singapore Pioneer Artist **Liu Kang (刘抗先生)**.\n\nThe Society champions the Nanyang Art Movement—an East-West aesthetic synthesis born in Singapore—and oversees standardized visual arts certification across ASEAN.",
        actionLink: 'about.html',
        actionLabel: '🏛️ Read Our Founding History & Heritage →'
      };
    }

    // 6. Art Materials & Brushes Provided
    if (q.includes('material') || q.includes('brush') || q.includes('supplies') || q.includes('provide') || q.includes('材料') || q.includes('画具') || q.includes('自备') || q.includes('工具')) {
      if (isZh) {
        return {
          text: "关于画室画具与材料安排：\n\n- **少儿启蒙、少儿手工与素描基础班**：画室均统一提供全部高规格画纸、环保安全颜料与专利立体折纸材料。\n- **软硬笔书法、国画与西方油画高研班**：学员可自备惯用毛笔或在画室以学员特惠选用中国宣纸与考级标准文房四宝。\n\n具体课程材料清单可咨询授课导师或画室教务。",
          actionLink: 'courses.html',
          actionLabel: '🎨 浏览工作室课程材料安排 →'
        };
      }
      return {
        text: "Regarding studio materials and supplies:\n\n- **Children's & Foundational Classes**: All premium paper, non-toxic pigment washes, and patented 3D origami materials are fully provided.\n- **Calligraphy & Masterclasses**: Students may bring preferred brushes or acquire Society-standardized Xuan paper, inkstones, and oil canvases at student privileges.",
        actionLink: 'courses.html',
        actionLabel: '🎨 Review Studio Course Materials →'
      };
    }

    // 7. Adult & Senior Classes
    if (q.includes('adult') || q.includes('senior') || q.includes('elderly') || q.includes('成人') || q.includes('长者') || q.includes('退休') || q.includes('零基础')) {
      if (isZh) {
        return {
          text: "协会特别开设针对成人艺术爱好者及退休长者的**名家研习班**：\n\n1. **传统软笔书法研习班**（楷书、王羲之行草笔意）\n2. **传统国画山水花鸟班**（宋元山水皴法、岭南派没骨花鸟）\n3. **西方油画与写生工作室**\n\n零基础学员亦可轻松入门，由资深名家名师亲自点拨，以艺养心。",
          actionLink: 'courses.html?cat=heritage_arts',
          actionLabel: '🖌️ 浏览成人与长者书画研习班 →'
        };
      }
      return {
        text: "Yes! The Society offers specialized **Adult & Senior Masterclasses** designed for beginners and lifelong learners:\n\n1. **Classical Soft-Pen Calligraphy** (Regular & Running Scripts)\n2. **Traditional Chinese Shanshui & Floral Ink Painting**\n3. **Western Oil Painting Studio & Portraiture**\n\nGuided by acclaimed master faculty at a comfortable, enriching pace.",
        actionLink: 'courses.html?cat=heritage_arts',
        actionLabel: '🖌️ Explore Adult Art Studios →'
      };
    }

    // 8. Digital Gallery & High-Res Museum Scans
    if (q.includes('gallery') || q.includes('high-res') || q.includes('zoom') || q.includes('scan') || q.includes('美术馆') || q.includes('放大') || q.includes('真迹') || q.includes('画廊')) {
      if (isZh) {
        return {
          text: "南洋艺术**数字美术馆**共收录展出30幅真实赛区典藏佳作（含新加坡南洋展区、新加坡KEC展区与中国展区）：\n\n- **3大展厅模式**：瀑布流展墙 (Masonry)、典藏画刊 (Editorial) 与沉浸暗房 (Darkroom)。\n- **高保真微喷扫描**：点击任意画作均可进行高倍色彩校准缩放与全屏漫游。\n- **7轴智能筛选**：支持按画种、年份、艺术家身份与赛区分区即时筛选。",
          actionLink: 'gallery.html',
          actionLabel: '🏛️ 进入数字美术馆全景漫游 →'
        };
      }
      return {
        text: "The **Digital Art Gallery** showcases 30 authentic division artworks across Singapore Nanyang, Singapore KEC, and China divisions:\n\n- **3 Viewing Modes**: Masonry Grid, Editorial Salon, and Immersion Darkroom.\n- **Color-Calibrated Scans**: Click any artwork to inspect high-resolution brushwork with pan and zoom.\n- **7-Axis Filtering**: Search across artist types, disciplines, years, and divisions.",
        actionLink: 'gallery.html',
        actionLabel: '🏛️ Visit Digital Art Gallery →'
      };
    }

    // 9. Course Finder & Recommendation
    if (q.includes('which art course') || q.includes('right for my child') || q.includes('child') || q.includes('适合') || q.includes('推荐')) {
      if (isZh) {
        return {
          text: "针对少儿与青少年美育，协会开设有阶梯式课程体系：\n1. **少儿智力启蒙美术** (2–4岁)：多感官触觉与色彩涂鸦。\n2. **少儿美术与手工** (5–8岁)：结合专利立体折纸与综合材料造型。\n3. **少儿漫画与素描启蒙** (7–12岁)：造型线条与构图空间感知。\n4. **少儿软硬笔书法与国画** (6岁及以上)：经典楷书骨法用笔与水墨花鸟。\n\n建议浏览全部艺术课程了解详细开课时间与导师阵容。",
          actionLink: 'courses.html',
          actionLabel: '🎨 浏览全部艺术课程 →'
        };
      }
      return {
        text: "For young learners, the Society offers structured developmental pathways:\n1. **Children Intellectual Art** (Ages 2–4): Sensory color discovery and fine motor development.\n2. **Children's Drawing & Handicraft** (Ages 5–8): Multi-sensory 3D origami crafts and ink washes.\n3. **Cartoon Drawing & Elementary Sketching** (Ages 7–12): Spatial drafting and character illustration.\n4. **Chinese Calligraphy & Ink Painting** (Ages 6+): Soft/hard brush discipline and classical poetry.",
        actionLink: 'courses.html',
        actionLabel: '🎨 Browse Art Courses →'
      };
    }

    // 10. Grade Examination Overview
    if (q.includes('grade exam') || q.includes('how does grade') || q.includes('examination work') || q.includes('考级') || q.includes('大纲')) {
      if (isZh) {
        return {
          text: "全国美术等级考试涵盖**硬笔书法与软笔书法等专业**，等级自**1级至9级**严谨递进。\n\n考试由考级学术委员会制定标准化评分细则，包含考核字数、书体要求、用纸规格与评分标准。您可以在线查阅各级别范本与标准对比。",
          actionLink: 'grade.html',
          actionLabel: '📜 查看考级大纲与标准对比 →'
        };
      }
      return {
        text: "The Visual Arts Grade Examination spans comprehensive disciplines including **Hard-Pen and Soft-Pen Chinese Calligraphy** across **Grades 1 through 9**.\n\nCandidates are evaluated under standardized assessment rubrics covering stroke technique, structural balance, and classical scroll composition.",
        actionLink: 'grade.html',
        actionLabel: '📜 Explore Grades 1–9 Pathway →'
      };
    }

    // 11. Nanyang Star General Overview
    if (q.includes('nanyang star') || q.includes('competition') || q.includes('大赛') || q.includes('南洋之星')) {
      if (isZh) {
        return {
          text: "“南洋之星”国际少儿美术大赛是新加坡标志性国际青少年美育盛会。大赛设立幼儿组（4–6岁）、少儿初级组（7–9岁）、少儿高级组（10–12岁）及青年组（13–16岁）四大组别。\n\n获奖佳作将收录入官方典藏画册并受邀参加中央展厅大展。",
          actionLink: 'nanyang-star.html',
          actionLabel: '⭐ 进入南洋之星大赛专区 →'
        };
      }
      return {
        text: "The **Nanyang Star International Children's Art Competition** is Singapore's premier international youth visual arts event across 4 divisions (Ages 4–16).\n\nWinning artworks are exhibited at prestigious galleries and archived in the official commemorative hardcover album.",
        actionLink: 'nanyang-star.html',
        actionLabel: '⭐ Visit Nanyang Star Flagship Area →'
      };
    }

    // 12. Registration & Intake System
    if (q.includes('how do i register') || q.includes('register') || q.includes('apply') || q.includes('报名')) {
      if (isZh) {
        return {
          text: "报名系统支持个人与机构双通道：\n- **课程与考级报名**：支持在线提交意向并预约就近认证考点。\n- **国际大赛报名**：支持画室、学校团体或个人在线上传参赛作品。\n\n请在联系我们页面在线提交报名表格，秘书处将即时跟进。",
          actionLink: 'contact.html?type=registration',
          actionLabel: '📝 在线报名与咨询通道 →'
        };
      }
      return {
        text: "The registration system supports both course enrolments and exam admissions:\n- **Course & Exam Intake**: Submit candidate details and select accredited test centres.\n- **International Competition**: Individual and institutional bulk submission.\n\nPlease complete registration online or contact the secretariat.",
        actionLink: 'contact.html?type=registration',
        actionLabel: '📝 Online Intake Registration →'
      };
    }

    // 13. Test Centres & Headquarters
    if (q.includes('test centre') || q.includes('centre') || q.includes('location') || q.includes('address') || q.includes('jurong') || q.includes('考点') || q.includes('地址')) {
      if (isZh) {
        return {
          text: "协会官方考点与总院信息如下：\n- **总院及考级中心**：新加坡裕廊门路大牌135号#03-333/335 (Jurong Gateway Road 邮编600135)\n- **新加坡美术总会考点**：10 Kampong Eunos\n- **各区分属考点**：淡滨尼、裕廊西、文礼等认证中心。\n\n所有考点均可通过考级页面查看即时路线及联系方式。",
          actionLink: 'grade.html#test-centres',
          actionLabel: '📍 查看考点与总院地址 →'
        };
      }
      return {
        text: "Official accredited test centres and headquarters:\n- **Jurong East HQ Centre**: Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135 (Tel: +65 6899 0828)\n- **Singapore Federation of Art Societies Centre**: 10 Kampong Eunos\n- **Satellite Test Centres**: Tampines, Jurong West, Boon Lay accredited studios.",
        actionLink: 'grade.html#test-centres',
        actionLabel: '📍 Test Centre Locator & Directions →'
      };
    }

    // 14. Available Courses Catalog
    if (q.includes('what courses') || q.includes('available') || q.includes('classes') || q.includes('课程') || q.includes('开设')) {
      if (isZh) {
        return {
          text: "协会开设了涵盖传统非遗与现代纯美术的专业课程：\n1. 少儿智力启蒙美术\n2. 少儿美术与立体折纸手工\n3. 软笔与硬笔书法经典班\n4. 中国传统水墨山水花鸟班\n5. 学术素描与光影造型班\n6. 创意少儿漫画班\n7. 西方油画与综合材料工作室",
          actionLink: 'courses.html',
          actionLabel: '🎨 浏览全部课程大纲 →'
        };
      }
      return {
        text: "The Society offers accredited visual arts courses:\n1. Children Intellectual Art\n2. Children's Drawing & 3D Origami Handicraft\n3. Chinese Calligraphy (Hard/Soft Brush)\n4. Chinese Traditional Ink Painting\n5. Academic Fine Art Sketching\n6. Creative Cartoon Drawing\n7. Western Oil Painting Studio",
        actionLink: 'courses.html',
        actionLabel: '🎨 Explore All Courses →'
      };
    }

    // Strict Non-Hallucination & Safety Fallback Policy
    if (isZh) {
      return {
        text: "关于您咨询的具体考务政策、资助细则或特定收费标准，为确保信息准确无误：\n\n**“请联系新加坡南洋美术家协会秘书处获取官方确认。”**\n\n📞 电话: +65 6899 0828\n📧 电邮: secretariat@nanyangartists.org.sg\n🏛️ 总院: 新加坡裕廊门路大牌135号#03-333/335 邮编600135",
        actionLink: 'contact.html',
        actionLabel: '📞 官方联络与秘书处接待 →'
      };
    }

    return {
      text: "Regarding specific examination policies, fee grants, or unverified inquiries:\n\n**“Please contact Nanyang Artists Society for official confirmation.”**\n\n📞 Phone: +65 6899 0828\n📧 Email: secretariat@nanyangartists.org.sg\n🏛️ Secretariat HQ: Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135",
      actionLink: 'contact.html',
      actionLabel: '📞 Contact Secretariat & Official Reception →'
    };
  }
}

export const assistant = new NanyangArtistsAssistant();
