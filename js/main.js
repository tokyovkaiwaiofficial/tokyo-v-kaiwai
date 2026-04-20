// ハンバーガーメニュー
const navToggle = document.getElementById('navToggle');
const globalNav = document.querySelector('.global-nav');

navToggle.addEventListener('click', () => {
  globalNav.classList.toggle('open');
});

// ナビリンククリックでメニュー閉じる
document.querySelectorAll('.global-nav a').forEach(link => {
  link.addEventListener('click', () => {
    globalNav.classList.remove('open');
  });
});

// TO TOPボタン表示/非表示
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('visible', window.scrollY > 300);
});

// スムーススクロール（タブクリックで動的にスライド）
const navLinks = document.querySelectorAll('.global-nav a[href^="#"]');
const headerOffset = 54;

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// その他のアンカーリンクもスムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(link => {
  if (link.closest('.global-nav')) return; // ナビは上で処理済み
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// TO TOPクリック
toTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ナビのアクティブ状態をスクロール位置で更新
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + headerOffset + 40;
  let currentId = '';

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('nav-active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// セクションのフェードイン・スライドアニメーション（IntersectionObserver）
const animTargets = document.querySelectorAll(
  '.intro-section, .movie-section, .member-card, .guidelines-section, .pill-title'
);

animTargets.forEach(el => {
  el.classList.add('anim-hidden');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('anim-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

animTargets.forEach(el => observer.observe(el));
