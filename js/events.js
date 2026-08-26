/**
 * NANYANG ARTISTS SOCIETY — EVENTS & CALENDAR PLATFORM CONTROLLER
 * Interactive Monthly Calendar Grid, Day Dot Indicators, List View Toggle,
 * 7 Event Type Filters, and Event Search.
 */

import { dataAdapter } from './services/dataAdapter.js';
import { i18n } from './services/i18n.js';

export class EventsController {
  constructor() {
    this.events = [];
    this.filteredEvents = [];
    this.viewMode = 'calendar'; // 'calendar' or 'list'
    this.currentMonth = new Date(2026, 8, 1); // September 2026 default
    this.selectedDate = null;
    this.filters = {
      query: '',
      type: 'all'
    };
  }

  async init() {
    try {
      this.events = await dataAdapter.getTable('Events');
      this.filteredEvents = [...this.events];

      this.bindInputs();
      this.bindTypeFilters();
      this.bindViewSwitcher();
      this.renderCalendar();
      this.renderEventList();

      // Listen to Language Change Event
      window.addEventListener('nas:languageChanged', () => {
        this.renderCalendar();
        this.renderEventList();
      });
    } catch (err) {
      console.error('[EventsController] Init error:', err);
    }
  }

  bindInputs() {
    const qInput = document.getElementById('events-search-input');
    const prevMonthBtn = document.getElementById('cal-prev-month-btn');
    const nextMonthBtn = document.getElementById('cal-next-month-btn');

    if (qInput) {
      qInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value.trim();
        this.applyFilters();
      });
    }

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', () => {
        this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
        this.renderCalendar();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', () => {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
        this.renderCalendar();
      });
    }
  }

  bindTypeFilters() {
    const pills = document.querySelectorAll('.event-type-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        this.filters.type = pill.getAttribute('data-type');
        this.applyFilters();
      });
    });
  }

  bindViewSwitcher() {
    const calBtn = document.getElementById('view-calendar-btn');
    const listBtn = document.getElementById('view-list-btn');
    const calView = document.getElementById('events-calendar-view');
    const listView = document.getElementById('events-list-view');

    if (calBtn && listBtn) {
      calBtn.addEventListener('click', () => {
        this.viewMode = 'calendar';
        calBtn.classList.add('active');
        listBtn.classList.remove('active');
        if (calView) calView.style.display = 'block';
        if (listView) listView.style.display = 'none';
      });

      listBtn.addEventListener('click', () => {
        this.viewMode = 'list';
        listBtn.classList.add('active');
        calBtn.classList.remove('active');
        if (calView) calView.style.display = 'none';
        if (listView) listView.style.display = 'block';
      });
    }
  }

  applyFilters() {
    const q = this.filters.query.toLowerCase();
    const type = this.filters.type;

    this.filteredEvents = this.events.filter(evt => {
      let matchQuery = true;
      if (q) {
        const matchTitle = evt.title && evt.title.toLowerCase().includes(q);
        const matchZh = evt.title_zh && evt.title_zh.toLowerCase().includes(q);
        const matchDesc = evt.description && evt.description.toLowerCase().includes(q);
        const matchLoc = evt.location && evt.location.toLowerCase().includes(q);
        matchQuery = matchTitle || matchZh || matchDesc || matchLoc;
      }

      const matchType = type === 'all' || evt.eventType.toLowerCase() === type.toLowerCase();

      return matchQuery && matchType;
    });

    this.renderCalendar();
    this.renderEventList();
  }

  renderCalendar() {
    const titleEl = document.getElementById('cal-month-title');
    const gridEl = document.getElementById('calendar-days-grid');
    if (!gridEl) return;

    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (titleEl) {
      titleEl.textContent = `${monthNames[month]} ${year}`;
    }

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    let html = '';

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      html += `<div class="calendar-cell other-month"><span class="calendar-cell-num">${daysInPrevMonth - i}</span></div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayEvents = this.filteredEvents.filter(e => {
        if (!e.startDate) return false;
        return e.startDate <= dateStr && (e.endDate || e.startDate) >= dateStr;
      });

      const hasEvents = dayEvents.length > 0;
      const isSelected = this.selectedDate === dateStr;

      html += `
        <div class="calendar-cell ${hasEvents ? 'has-events' : ''} ${isSelected ? 'active-day' : ''}" data-date="${dateStr}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="calendar-cell-num">${day}</span>
            ${hasEvents ? '<span class="calendar-event-dot"></span>' : ''}
          </div>
          ${dayEvents.map(e => `
            <span class="calendar-event-pill" title="${e.title}">
              ${e.eventType}: ${e.title.split(':')[0]}
            </span>
          `).join('')}
        </div>
      `;
    }

    gridEl.innerHTML = html;

    // Bind Day Cell Click
    const cells = gridEl.querySelectorAll('.calendar-cell[data-date]');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const d = cell.getAttribute('data-date');
        this.selectedDate = this.selectedDate === d ? null : d;
        this.renderCalendar();
        this.filterEventsByDay(this.selectedDate);
      });
    });
  }

  filterEventsByDay(dateStr) {
    const listContainer = document.getElementById('calendar-selected-day-events');
    if (!listContainer) return;

    if (!dateStr) {
      listContainer.innerHTML = '';
      return;
    }

    const dayEvents = this.filteredEvents.filter(e => {
      if (!e.startDate) return false;
      return e.startDate <= dateStr && (e.endDate || e.startDate) >= dateStr;
    });

    if (dayEvents.length === 0) {
      listContainer.innerHTML = `
        <div style="background: var(--color-warm-ivory); border-radius: var(--radius-sm); padding: 14px 20px; font-size: 13px; color: var(--color-ink-muted);">
          No scheduled events found for ${dateStr}.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <div style="background: var(--color-warm-ivory); border: 1px solid var(--color-paper-border); border-radius: var(--radius-md); padding: 20px; margin-top: 20px;">
        <h4 style="font-size: 16px; margin: 0 0 12px; color: var(--color-ink-black);">Events on ${dateStr}:</h4>
        ${dayEvents.map(e => `
          <div style="background: #FFFFFF; border-radius: var(--radius-sm); padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <span class="seal-badge seal-badge-cobalt" style="font-size: 10px;">${e.eventType}</span>
              <h5 style="font-size: 14px; margin: 4px 0 2px;">${e.title}</h5>
              <div style="font-size: 11px; color: var(--color-ink-muted);">⏰ ${e.time} · 📍 ${e.location}</div>
            </div>
            <a href="detail.html?id=${e.slug}" class="btn btn-outline btn-sm">
              View Details →
            </a>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderEventList() {
    const container = document.getElementById('events-list-container');
    const badge = document.getElementById('events-count-badge');

    if (badge) {
      badge.textContent = `Showing ${this.filteredEvents.length} event${this.filteredEvents.length === 1 ? '' : 's'}`;
    }

    if (!container) return;

    if (this.filteredEvents.length === 0) {
      container.innerHTML = `
        <div style="padding: 48px 24px; text-align: center; background: var(--color-gallery-white); border: 1px dashed var(--color-paper-border-dark); border-radius: var(--radius-md);">
          <div style="font-size: 38px; margin-bottom: 8px;">📅</div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">No Events Found</h3>
          <p style="font-size: 13px; color: var(--color-ink-muted); max-width: 460px; margin: 0 auto;">
            Please adjust your search keyword or event category filters.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredEvents.map(evt => {
      const parts = evt.date.split(' ');
      const dayNum = parts[0] || '15';
      const monthText = parts[1] || 'SEP';

      return `
        <div class="event-card">
          <div class="event-date-badge">
            <div class="event-date-day">${dayNum}</div>
            <div class="event-date-month">${monthText}</div>
          </div>

          <div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
              <span class="seal-badge seal-badge-cobalt" style="font-size: 10px;">${evt.eventType}</span>
              <span style="font-size: 11px; color: var(--color-ink-muted);">⏰ ${evt.time}</span>
            </div>

            <h3 style="font-size: 17px; margin: 0 0 2px; line-height: 1.3;">
              <a href="detail.html?id=${evt.slug}" style="color: var(--color-ink-black); text-decoration: none;">${evt.title}</a>
            </h3>
            <h4 style="font-size: 12px; color: var(--color-cinnabar); font-weight: 600; margin: 0 0 8px;">
              ${evt.title_zh}
            </h4>

            <p style="font-size: 12px; color: var(--color-ink-charcoal); line-height: 1.5; margin: 0 0 8px;">
              ${evt.description}
            </p>

            <div style="font-size: 11px; color: var(--color-ink-muted);">
              📍 <strong>Venue:</strong> ${evt.location}
            </div>
          </div>

          <div style="text-align: right;">
            <a href="detail.html?id=${evt.slug}" class="btn btn-primary btn-sm">
              Event Details →
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
}

export const eventsController = new EventsController();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      eventsController.init();
    });
  } else {
    eventsController.init();
  }
}
