/**
 * NANYANG ARTISTS SOCIETY — GLOBAL UNIFIED SEARCH ENGINE
 * Universal indexing across 10 distinct entities:
 * 1. Courses, 2. Artists, 3. Grade Syllabi, 4. Competitions, 5. Winners,
 * 6. Artworks, 7. News, 8. Events, 9. Resources, 10. FAQs.
 *
 * Supports 7 category filters: 'all', 'courses', 'artists', 'artwork', 'competitions', 'news', 'events'.
 */

import { dataAdapter } from './dataAdapter.js';

export class GlobalSearchService {
  constructor() {
    this.cachedIndex = null;
  }

  async buildIndex() {
    const index = [];

    try {
      // 1. Courses
      const courses = await dataAdapter.getTable('Courses');
      if (Array.isArray(courses)) {
        courses.forEach(c => {
          index.push({
            id: c.id || c.slug,
            type: 'Course / 课程',
            filterCategory: 'courses',
            title: `${c.title_en || c.title || ''} ${c.title_zh ? '(' + c.title_zh + ')' : ''}`,
            snippet: c.tagline_en || c.description_en || c.description || '',
            url: `courses/detail.html?id=${c.id || c.slug}`,
            thumbnail: c.hero_image || c.image || '',
            keywords: `${c.title_en} ${c.title_zh} ${c.category} ${c.target_audience_en}`
          });
        });
      }

      // 2. Artists / Faculty (People)
      const people = await dataAdapter.getTable('People');
      if (Array.isArray(people)) {
        people.forEach(p => {
          const nameEn = p.name_en || p.name || '';
          const nameZh = p.name_zh || p.chineseName || '';
          const role = p.role_title_en || p.role || '';
          const disc = p.discipline_specialty || p.discipline || '';
          const bio = p.bio_en || p.biography || '';

          index.push({
            id: p.id,
            type: 'Artist / 名家',
            filterCategory: 'artists',
            title: `${nameEn} ${nameZh ? '(' + nameZh + ')' : ''}`,
            snippet: `${role} · ${disc} · ${bio ? bio.slice(0, 100) + '...' : ''}`,
            url: `artists/detail.html?id=${p.id}`,
            thumbnail: p.photo_url || p.portrait || '',
            keywords: `${nameEn} ${nameZh} ${role} ${disc} ${p.category || ''}`
          });
        });
      }


      // 3. Grade Disciplines & Syllabi
      const disciplines = await dataAdapter.getTable('Disciplines');
      if (Array.isArray(disciplines)) {
        disciplines.forEach(d => {
          index.push({
            id: d.id,
            type: 'Grade Exam / 考级大纲',
            filterCategory: 'courses',
            title: `${d.name_en || d.name || ''} ${d.name_zh ? '(' + d.name_zh + ')' : ''}`,
            snippet: d.overview_en || d.description || 'Official 1–9 grade syllabus & evaluation standards.',
            url: `grade-examination/index.html#${d.id}`,
            thumbnail: d.image || '',
            keywords: `${d.name_en} ${d.name_zh} grade exam syllabus criteria`
          });
        });
      }

      // 4. Competitions
      const competitions = await dataAdapter.getTable('Competitions');
      if (Array.isArray(competitions)) {
        competitions.forEach(comp => {
          index.push({
            id: comp.id,
            type: 'Competition / 大赛',
            filterCategory: 'competitions',
            title: `${comp.title} (${comp.year})`,
            snippet: comp.theme ? `Theme: "${comp.theme}" · ${comp.description || ''}` : comp.description || '',
            url: comp.id === 'COMP-2020-01' ? 'competitions/winners.html' : 'competitions/nanyang-star.html',
            thumbnail: comp.poster || '',
            keywords: `${comp.title} ${comp.theme} ${comp.year} nanyang star competition`
          });
        });
      }

      // 5. Winners / Laureates
      const winners = await dataAdapter.getTable('CompetitionWinners');
      if (Array.isArray(winners)) {
        winners.forEach(w => {
          index.push({
            id: w.id,
            type: 'Competition Winner / 获奖者',
            filterCategory: 'competitions',
            title: `${w.name} ${w.chineseName ? '(' + w.chineseName + ')' : ''} — ${w.award}`,
            snippet: `Artwork: "${w.artwork}" · Group: ${w.ageGroup} (${w.year})`,
            url: `competitions/winners.html`,
            thumbnail: w.artwork_image || '',
            keywords: `${w.name} ${w.chineseName} ${w.artwork} ${w.award} ${w.ageGroup} laureate`
          });
        });
      }

      // 6. Artwork (GalleryArtworks)
      const artworks = await dataAdapter.getTable('GalleryArtworks');
      if (Array.isArray(artworks)) {
        artworks.forEach(art => {
          index.push({
            id: art.id,
            type: 'Gallery Artwork / 馆藏作品',
            filterCategory: 'artwork',
            title: `${art.title} ${art.title_zh ? '(' + art.title_zh + ')' : ''}`,
            snippet: `By ${art.artist} (${art.year}) · ${art.discipline || art.category} · ${art.award ? '★ ' + art.award : ''}`,
            url: `gallery/index.html?artId=${art.id}`,
            thumbnail: art.image || '',
            keywords: `${art.title} ${art.title_zh} ${art.artist} ${art.discipline} ${art.category}`
          });
        });
      }

      // 7. News Articles
      const news = await dataAdapter.getTable('News');
      if (Array.isArray(news)) {
        news.forEach(n => {
          index.push({
            id: n.id,
            type: 'News / 动态快讯',
            filterCategory: 'news',
            title: `${n.title} ${n.title_zh ? '(' + n.title_zh + ')' : ''}`,
            snippet: n.excerpt || n.excerpt_zh || '',
            url: `news/detail.html?id=${n.slug}`,
            thumbnail: n.image || '',
            keywords: `${n.title} ${n.title_zh} ${n.category} ${n.author} ${n.tags ? n.tags.join(' ') : ''}`
          });
        });
      }

      // 8. Events
      const events = await dataAdapter.getTable('Events');
      if (Array.isArray(events)) {
        events.forEach(e => {
          index.push({
            id: e.id,
            type: 'Event / 活动日程',
            filterCategory: 'events',
            title: `${e.title} ${e.title_zh ? '(' + e.title_zh + ')' : ''}`,
            snippet: `📅 ${e.date} · ⏰ ${e.time} · 📍 ${e.location}`,
            url: `events/detail.html?id=${e.slug}`,
            thumbnail: e.image || '',
            keywords: `${e.title} ${e.title_zh} ${e.eventType} ${e.location}`
          });
        });
      }

      // 9. Resources & Documents
      const docs = await dataAdapter.getTable('Documents');
      if (Array.isArray(docs)) {
        docs.forEach(d => {
          index.push({
            id: d.id,
            type: 'Resource / 官方文献',
            filterCategory: 'courses',
            title: `${d.title} ${d.title_zh ? '(' + d.title_zh + ')' : ''}`,
            snippet: `Category: ${d.category} · Format: ${d.fileFormat} (${d.fileSize})`,
            url: `resources/index.html?docId=${d.id}`,
            thumbnail: d.thumbnail || '',
            keywords: `${d.title} ${d.title_zh} ${d.category} ${d.fileFormat} download syllabus`
          });
        });
      }

      // 10. FAQs / Frequently Asked Questions
      index.push({
        id: 'FAQ-01',
        type: 'FAQ / 常见问答',
        filterCategory: 'courses',
        title: 'How does Grade Examination work? (考级流程与大纲说明)',
        snippet: 'Examinations cover 6 visual disciplines across Grades 1–9 under standardized assessment rubrics.',
        url: 'grade-examination/index.html',
        keywords: 'how exam works grade assessment test centres passing criteria syllabus'
      });
      index.push({
        id: 'FAQ-02',
        type: 'FAQ / 常见问答',
        filterCategory: 'competitions',
        title: 'How to enter Nanyang Star Competition? (如何参加南洋之星国际大赛)',
        snippet: 'Individual contestants and school teams can submit artwork directly via the online portal.',
        url: 'competitions/nanyang-star.html',
        keywords: 'how to register nanyang star competition entry rules fees individual group'
      });

      this.cachedIndex = index;
    } catch (err) {
      console.error('[GlobalSearchService] Error building index:', err);
    }
  }

  async query(queryString, filterCategory = 'all') {
    if (!this.cachedIndex) {
      await this.buildIndex();
    }

    const q = (queryString || '').toLowerCase().trim();
    if (!q && filterCategory === 'all') return [];

    let results = this.cachedIndex || [];

    // Apply Filter Category
    if (filterCategory && filterCategory !== 'all') {
      results = results.filter(item => item.filterCategory === filterCategory.toLowerCase());
    }

    // If query string exists, filter by keyword matching
    if (q) {
      results = results.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const snippetMatch = item.snippet.toLowerCase().includes(q);
        const keywordMatch = item.keywords && item.keywords.toLowerCase().includes(q);
        return titleMatch || snippetMatch || keywordMatch;
      });
    }

    return results;
  }
}

export const search = new GlobalSearchService();
