/* =========================================================
   БУРГЕР И ВЫПАДАЮЩЕЕ МЕНЮ (ДЕСКТОП)
   ========================================================= */
(function () {
  const burger = document.getElementById('burger');
  const navList = document.getElementById('navList');
  const overlay = document.getElementById('menuOverlay');
  const body = document.body;

  // Если элементов нет, скрипт просто завершится, не ломая страницу
  if (!burger || !navList || !overlay) return;

  function openMenu() {
    burger.classList.add('is-open');
    navList.classList.add('is-open');
    overlay.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    burger.classList.remove('is-open');
    navList.classList.remove('is-open');
    overlay.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
    body.style.overflow = '';
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navList.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900) closeMenu();
    }, 150);
  });

  // Дропдаун в десктопном меню
  const dropdowns = document.querySelectorAll('.header__nav-item--dropdown');
  dropdowns.forEach((item) => {
    const toggle = item.querySelector('.header__nav-link--toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));

      dropdowns.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const t = other.querySelector('.header__nav-link--toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) return;
    dropdowns.forEach((item) => {
      if (!item.contains(e.target)) {
        item.classList.remove('is-open');
        const t = item.querySelector('.header__nav-link--toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

/* =========================================================
   ПОИСК
   ========================================================= */
(function () {
  const form = document.getElementById('searchForm');
  const btn = document.getElementById('searchBtn');
  const input = form ? form.querySelector('.search__input') : null;

  if (!form || !btn || !input) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!form.classList.contains('active')) {
      form.classList.add('active');
      input.focus();
    } else if (input.value.trim() !== '') {
      form.submit();
    } else {
      form.classList.remove('active');
      input.blur();
    }
  });

  document.addEventListener('click', (e) => {
    if (!form.contains(e.target) && input.value.trim() === '') {
      form.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement === input) {
      form.classList.remove('active');
      input.blur();
    }
  });
})();

/* =========================================================
   МОБИЛЬНОЕ МЕНЮ
   ========================================================= */
(function () {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('menuClose');
  const body = document.body;

  if (!burger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  burger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenu.querySelectorAll('.mobile-menu__item--dropdown').forEach((item) => {
    const toggle = item.querySelector('.mobile-menu__link');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = item.classList.toggle('mobile-menu__item--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (window.innerWidth > 900) closeMenu();
    }, 150);
  });
})();

/* =========================================================
   СЛАЙДЕР НОВОСТЕЙ
   ========================================================= */
(function () {
  const slider = document.querySelector('.news__slider');
  if (!slider) return; // Если слайдера нет на странице, выходим

  const prev = document.querySelector('.news__btn--prev');
  const next = document.querySelector('.news__btn--next');
  const slide = slider.querySelector('.news__slide');
  
  if (!slide || !prev || !next) return;

  const step = slide.offsetWidth + 1; /* +1 — gap */

  next.addEventListener('click', () => {
    slider.scrollBy({ left: step, behavior: 'smooth' });
  });
  
  prev.addEventListener('click', () => {
    slider.scrollBy({ left: -step, behavior: 'smooth' });
  });

  function updateBtns() {
    const max = slider.scrollWidth - slider.clientWidth;
    prev.disabled = slider.scrollLeft <= 1;
    next.disabled = slider.scrollLeft >= max - 1;
  }
  
  slider.addEventListener('scroll', updateBtns);
  updateBtns();
})();

/* =========================================================
   ПЛАВНЫЙ СКРОЛЛ (ФУНКЦИЯ)
   ========================================================= */
function smoothScrollBy(distance, duration) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  requestAnimationFrame(scroll);
}

/* =========================================================
   МОДАЛЬНОЕ ОКНО
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const closeBtn = document.querySelector('.close__btn');
  const openBtns = document.querySelectorAll('.js-open-modal'); // Ищем ВСЕ кнопки

  // Если модалки нет на странице, ничего не делаем
  if (modal && closeBtn) {
    
    // Вешаем событие на каждую кнопку открытия
    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем фон
      });
    });

    // Закрытие по крестику
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });

    // Закрытие по клику вне окна
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});
