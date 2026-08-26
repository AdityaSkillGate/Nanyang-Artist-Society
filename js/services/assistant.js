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
    "What is Nanyang Star?",
    "How do I register?",
    "Where can I find a test centre?",
    "What courses are available?"
  ],
  zh: [
    "我的孩子适合报读哪门美术课程？",
    "全国美术考级如何报名与评分？",
    "什么是“南洋之星”国际少儿美术大赛？",
    "如何进行个人或团体参赛报名？",
    "新加坡各考点分布与总院地址在哪里？",
    "协会开设了哪些专业美术与教师认证班？"
  ],
  ms: [
    "Kursus seni manakah yang sesuai untuk anak saya?",
    "Bagaimanakah Peperiksaan Gred berfungsi?",
    "Apakah itu Nanyang Star?",
    "Bagaimanakah cara untuk mendaftar?",
    "Di manakah saya boleh mencari pusat peperiksaan?",
    "Apakah kursus yang disediakan?"
  ],
  ta: [
    "எனது குழந்தைக்கு எந்தக் கலைப் படிப்பு ஏற்றது?",
    "தேசிய தரப் பரிட்சை எவ்வாறு செயல்படுகிறது?",
    "நன்யாங் ஸ்டார் சர்வதேசப் போட்டி என்றால் என்ன?",
    "நான் எவ்வாறு பதிவு செய்வது?",
    "அங்கீகரிக்கப்பட்ட தேர்வு மையத்தை எங்கே காணலாம்?",
    "என்னென்ன கலைப் படிப்புகள் உள்ளன?"
  ]
};

export class NanyangArtistsAssistant {
  constructor() {
    this.isOpen = false;
    this.messageHistory = [];
  }

  init() {
    this.bindUI();
    this.renderStarterPrompts();
    this.addWelcomeMessage();

    // Listen to global language change events
    if (typeof window !== 'undefined') {
      window.addEventListener('nas:languageChanged', () => {
        this.renderStarterPrompts();
      });
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
    const messagesList = document.getElementById('nas-assistant-messages');
    if (messagesList) messagesList.innerHTML = '';
    this.messageHistory = [];
    this.addWelcomeMessage();
  }

  renderStarterPrompts() {
    const container = document.getElementById('nas-assistant-starter-chips');
    if (!container) return;

    const lang = i18n.getLanguage ? i18n.getLanguage() : 'en';
    const prompts = ASSISTANT_PROMPTS[lang] || ASSISTANT_PROMPTS.en;

    container.innerHTML = prompts.map(p => `
      <button type="button" class="assistant-starter-chip" data-prompt="${p}">
        ${p}
      </button>
    `).join('');

    const chips = container.querySelectorAll('.assistant-starter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-prompt');
        if (query) {
          this.handleUserMessage(query);
        }
      });
    });
  }

  addWelcomeMessage() {
    const lang = i18n.getLanguage ? i18n.getLanguage() : 'en';
    let welcome = "Greetings! I am the **Nanyang Artists Assistant** (南洋美协智能艺术向导). How may I assist you today with our art curriculum, 1–9 grade examinations, international competition entry, or accredited test centres?";

    if (lang === 'zh') {
      welcome = "您好！我是**南洋美术家协会智能艺术向导**。请问有什么可以协助您？您可以向我咨询少儿/成人艺术课程、全国美术1–9级考级流程、“南洋之星”国际大赛报名或新加坡认证考点分布。";
    } else if (lang === 'ms') {
      welcome = "Salam sejahtera! Saya ialah **Pembantu Artis Nanyang**. Bagaimanakah saya boleh membantu anda hari ini mengenai kurikulum seni, peperiksaan gred 1–9, pendaftaran pertandingan, atau pusat peperiksaan bertauliah?";
    } else if (lang === 'ta') {
      welcome = "வணக்கம்! நான் **நன்யாங் கலைஞர்கள் சங்கத்தின் AI வழிகாட்டி**. எங்கள் கலைப் படிப்புகள், 1–9 தரப் பரிட்சைகள், சர்வதேசப் போட்டிகள் அல்லது தேர்வு மையங்கள் குறித்த தகவல்களை அறிய என்னிடம் கேட்கலாம்.";
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
            <a href="${actionLink}" class="btn btn-outline btn-sm" style="font-size: 11px; padding: 4px 10px; text-decoration: none; display: inline-block;">
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

    const lang = i18n.getLanguage ? i18n.getLanguage() : 'en';
    const response = await this.generateGroundedResponse(queryText, lang);

    setTimeout(() => {
      const typing = document.getElementById('assistant-typing');
      if (typing) typing.remove();
      this.appendMessage('assistant', response.text, response.actionLink, response.actionLabel);
    }, 450);
  }

  async generateGroundedResponse(query, lang) {
    const q = query.toLowerCase();

    // 1. Course Finder & Recommendation
    if (q.includes('which art course') || q.includes('right for my child') || q.includes('child') || q.includes('适合') || q.includes('推荐') || q.includes('anak') || q.includes('குழந்தை')) {
      if (lang === 'zh') {
        return {
          text: "针对少儿美育，协会开设有：\n1. **少儿智力启蒙美术** (2–4岁)：多感官触觉与色彩涂鸦。\n2. **少儿美术与手工** (5–8岁)：结合专利立体折纸与国画撕纸综合造型。\n3. **少儿漫画与素描启蒙** (7–12岁)：造型线条与构图感知。\n4. **少儿软硬笔书法与国画** (6岁及以上)：经典楷书骨法用笔与水墨花鸟。\n\n建议使用我们的**互动选课自测向导**快速匹配最适合的课程与班级。",
          actionLink: '../courses/finder.html',
          actionLabel: '🎨 开启选课向导 (Course Finder Quiz) →'
        };
      }
      return {
        text: "For young learners, the Society offers structured developmental pathways:\n1. **Children Intellectual Art** (Ages 2–4): Sensory color discovery and fine motor development.\n2. **Children's Drawing & Handicraft** (Ages 5–8): Multi-sensory 3D origami crafts and boneless ink washes.\n3. **Cartoon Drawing & Elementary Sketching** (Ages 7–12): Spatial drafting and creative character design.\n4. **Chinese Calligraphy & Ink Painting** (Ages 6+): Soft/hard brush discipline and classical poetry.",
        actionLink: '../courses/finder.html',
        actionLabel: '🎨 Launch Course Finder Quiz →'
      };
    }

    // 2. Grade Examination
    if (q.includes('grade exam') || q.includes('how does grade') || q.includes('examination work') || q.includes('考级') || q.includes('大纲') || q.includes('peperiksaan') || q.includes('பரிட்சை')) {
      if (lang === 'zh') {
        return {
          text: "全国美术等级考试涵盖**六大专业**（书法、国画、素描、少儿美术、水彩水粉油画、漫画），等级自**1级至9级**严谨递进。\n\n考试由考级学术委员会制定标准化评分细则，成绩分为“合格”、“良好”、“优秀”三等，颁发防伪等级证书。您可以在线查阅各专业大纲规范与真伪查验。",
          actionLink: '../grade-examination/index.html',
          actionLabel: '📜 查看考级大纲与评分标准 →'
        };
      }
      return {
        text: "The National Visual Arts Grade Examination spans **6 verified disciplines** (Chinese Calligraphy, Chinese Painting, Academic Sketching, Children Art, Watercolor/Gouache/Oil Painting, and Cartoon Drawing) across **Grades 1 through 9**.\n\nCandidates are graded under standardized assessment rubrics into Pass, Merit, and Distinction with anti-counterfeit accredited diplomas.",
        actionLink: '../grade-examination/index.html',
        actionLabel: '📜 Explore Grades 1–9 Pathway →'
      };
    }

    // 3. Nanyang Star Competition
    if (q.includes('nanyang star') || q.includes('competition') || q.includes('大赛') || q.includes('南洋之星') || q.includes('pertandingan') || q.includes('போட்டி')) {
      if (lang === 'zh') {
        return {
          text: "“南洋之星”国际少儿美术大赛是新加坡标志性国际青少年美育盛会。2026年第五届大赛以**“无限视界·绿色家园”**为主题，设立幼儿组（4–6岁）、少儿初级组（7–9岁）、少儿高级组（10–12岁）及青年组（13–16岁）四大组别。\n\n获奖佳作将收录入精装典藏画册并受邀参加中央展厅大展。",
          actionLink: '../competitions/nanyang-star.html',
          actionLabel: '⭐ 进入南洋之星大赛专区 →'
        };
      }
      return {
        text: "The **Nanyang Star International Children's Art Competition** is Singapore's premier international youth visual arts event. The 2026 5th Edition celebrates *'Infinite Horizons & Green Cities'* across 4 divisions (Ages 4–16).\n\nWinning artworks are exhibited at the Federation of Art Societies Gallery and archived in the official commemorative hardcover album.",
        actionLink: '../competitions/nanyang-star.html',
        actionLabel: '⭐ Visit Nanyang Star Flagship Area →'
      };
    }

    // 4. Registration System
    if (q.includes('how do i register') || q.includes('register') || q.includes('apply') || q.includes('报名') || q.includes('daftar') || q.includes('பதிவு')) {
      if (lang === 'zh') {
        return {
          text: "报名系统支持个人与机构双通道：\n- **个人参赛报名**：支持在线填写14项资料、上传原画作照片并生成准考凭证。\n- **机构/团体报名**：支持画室、学校批量录入学员并自动核算各组别总人数。\n\n请在官方截止日前完成报名提交。",
          actionLink: '../competitions/register.html',
          actionLabel: '📝 个人在线报名通道 →'
        };
      }
      return {
        text: "The registration system supports both individual and school submissions:\n- **Individual Registration**: Complete contestant bio, parental consent, upload artwork preview, and download official registration slip.\n- **Team / School Bulk Registration**: Batch register student cohorts with automatic age-group headcount tallying.",
        actionLink: '../competitions/register.html',
        actionLabel: '📝 Individual Entry Portal →'
      };
    }

    // 5. Test Centres
    if (q.includes('test centre') || q.includes('centre') || q.includes('location') || q.includes('address') || q.includes('jurong') || q.includes('考点') || q.includes('地址') || q.includes('pusat') || q.includes('மையம்')) {
      if (lang === 'zh') {
        return {
          text: "协会官方考点与总院信息如下：\n- **总院及考级中心**：新加坡裕廊门路大牌135号#03-333/335 (Jurong Gateway Road)\n- **新加坡美术总会考点**：10 Kampong Eunos\n- **淡滨尼考点**：爱德艺术中心 (Tampines St 81)\n- **裕廊西考点**：蝶彩艺术画室 (Jurong West St 41)\n- **文礼考点**：天睿艺术中心 (Boon Lay Way)\n\n所有考点均可通过考点查询系统查看支持画种及即时路线导引。",
          actionLink: '../grade-examination/test-centres.html',
          actionLabel: '📍 考点与路线查询系统 →'
        };
      }
      return {
        text: "Official accredited test centres and headquarters:\n- **Jurong East HQ Centre**: Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135 (Tel: +65 6899 0828)\n- **Singapore Federation of Art Societies Centre**: 10 Kampong Eunos\n- **Tampines Satellite Centre**: AiDe Art Studio, Blk 828 Tampines St 81\n- **Jurong West Satellite Centre**: Butterfly Art Studio, Blk 492 Jurong West St 41\n- **Boon Lay Satellite Centre**: TianRui Art Studio, TradeHub 21",
        actionLink: '../grade-examination/test-centres.html',
        actionLabel: '📍 Test Centre Locator & Directions →'
      };
    }

    // 6. Available Courses
    if (q.includes('what courses') || q.includes('available') || q.includes('classes') || q.includes('课程') || q.includes('开设') || q.includes('kursus') || q.includes('படிப்புகள்')) {
      if (lang === 'zh') {
        return {
          text: "协会开设了**9门专业艺术课程与研修认证**：\n1. 少儿智力启蒙美术 (2–4岁)\n2. 少儿美术与手工 (5–8岁)\n3. 软硬笔书法标准班 (5岁及以上)\n4. 中国传统水墨山水花鸟班 (6岁至成人)\n5. 学术古典素描与光影研习班 (8岁至成人)\n6. 创意少儿漫画班 (7–14岁)\n7. 水彩水粉综合造型班 (6岁至成人)\n8. 青年/成人西方油画工作室 (13岁至成人)\n9. 美术教师专业培训认证研修班 (教师与考评员)",
          actionLink: '../courses/index.html',
          actionLabel: '🎨 浏览九大课程大纲与课表 →'
        };
      }
      return {
        text: "The Society offers **9 accredited visual arts courses and masterclasses**:\n1. Children Intellectual Art (Ages 2–4)\n2. Children's Drawing & Handicraft (Ages 5–8)\n3. Chinese Calligraphy (Hard/Soft Brush, Ages 5+)\n4. Chinese Traditional Painting (Ages 6+)\n5. Academic Sketching (Ages 8+)\n6. Cartoon Drawing (Ages 7–14)\n7. Watercolor & Gouache Painting (Ages 6+)\n8. Western Oil Painting Studio (Ages 13+)\n9. Short Course for Art Teacher Professional Training",
        actionLink: '../courses/index.html',
        actionLabel: '🎨 Explore All 9 Courses →'
      };
    }

    // Strict Non-Hallucination & Safety Fallback Policy
    if (lang === 'zh') {
      return {
        text: "关于您咨询的具体考务政策、资助细则或特定收费标准，为确保信息准确无误：\n\n**“请联系新加坡南洋美术家协会秘书处获取官方确认。”**\n\n📞 电话: +65 6899 0828\n📧 电邮: secretariat@nanyangartists.org.sg\n🏛️ 总院: 新加坡裕廊门路大牌135号#03-333/335 邮编600135",
        actionLink: '../contact/index.html',
        actionLabel: '📞 官方联络与秘书处接待 →'
      };
    }

    return {
      text: "Regarding specific examination policies, fee grants, or unverified inquiries:\n\n**“Please contact Nanyang Artists Society for official confirmation.”**\n\n📞 Phone: +65 6899 0828\n📧 Email: secretariat@nanyangartists.org.sg\n🏛️ Secretariat HQ: Blk 135 Jurong Gateway Road #03-333/335, Singapore 600135",
      actionLink: '../contact/index.html',
      actionLabel: '📞 Contact Secretariat & Official Reception →'
    };
  }
}

export const assistant = new NanyangArtistsAssistant();
