// The page markup lives in index.html; this file adds its interactions.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const mobileViewport = window.matchMedia('(max-width: 700px)');
const footerWordmark = document.querySelector('.footer-wordmark');
footerWordmark.dataset.reveal = 'pending';
function revealFooterWordmark() {
  const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
  if (!atBottom) return;
  footerWordmark.dataset.reveal = 'visible';
  window.removeEventListener('scroll', revealFooterWordmark);
  window.removeEventListener('resize', revealFooterWordmark);
  window.removeEventListener('load', revealFooterWordmark);
}
window.addEventListener('scroll', revealFooterWordmark, { passive: true });
window.addEventListener('resize', revealFooterWordmark);
window.addEventListener('load', revealFooterWordmark);
requestAnimationFrame(() => requestAnimationFrame(revealFooterWordmark));
const header = document.querySelector('.site-header');
const menuToggle = header.querySelector('.mobile-menu-toggle');
const menu = document.createElement('nav');
menu.id = 'mobile-navigation';
menu.className = 'mobile-navigation';
menu.setAttribute('aria-label', '모바일 메뉴');
menu.hidden = true;
header.querySelectorAll('.header-primary > *, .header-utility > *').forEach(item => menu.append(item.cloneNode(true)));
header.append(menu);
function closeMenu() {
  menu.hidden = true;
  menuToggle.textContent = 'MENU';
  menuToggle.setAttribute('aria-label', '메뉴 열기');
  menuToggle.setAttribute('aria-expanded', 'false');
}
menuToggle.addEventListener('click', () => {
  const open = menu.hidden;
  menu.hidden = !open;
  menuToggle.textContent = open ? 'CLOSE' : 'MENU';
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  menuToggle.setAttribute('aria-expanded', String(open));
});
menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
header.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuToggle.focus(); } });

const section = document.querySelector('#shop');
const categoryButtons = [...section.querySelectorAll('.category-button')];
const categorySlugs = ['view-all', 'new-arrivals', 'best', 'nu-basic', 'maison-de-rola', 'outwear', 'top', 'dress', 'bottom', 'home'];
const preview = document.querySelector('#category-preview');
const highlight = document.createElement('div');
highlight.className = 'category-highlight';
highlight.setAttribute('aria-hidden', 'true');
section.prepend(highlight);
let hovered = null;
let focused = null;
let selected = null;
let pointerType = null;
let renderedCategory = null;
function updateCategory() {
  const active = hovered ?? focused ?? selected;
  highlight.hidden = active === null;
  categoryButtons.forEach((button, index) => {
    button.classList.toggle('is-active', index === active);
    button.setAttribute('aria-pressed', String(index === active));
  });
  if (active === renderedCategory) return;
  renderedCategory = active;
  preview.replaceChildren();
  if (active === null) return;
  highlight.style.setProperty('--category-index', active);
  const image = new Image(302, 343);
  image.src = `./src/assets/images/category-${categorySlugs[active]}.svg`;
  image.alt = `${categoryButtons[active].textContent.slice(2).trim()} 카테고리 이미지`;
  preview.append(image);
}
categoryButtons.forEach((button, index) => {
  button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = index; updateCategory(); } });
  button.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') { hovered = null; updateCategory(); } });
  button.addEventListener('pointerdown', event => { pointerType = event.pointerType; });
  button.addEventListener('keydown', () => { pointerType = null; });
  button.addEventListener('focus', () => { focused = button.matches(':focus-visible') ? index : null; if (focused !== null) hovered = null; updateCategory(); });
  button.addEventListener('blur', () => { focused = null; updateCategory(); });
  button.addEventListener('click', () => { if (pointerType === 'touch' || pointerType === 'pen') { selected = selected === index ? null : index; updateCategory(); } });
});
section.addEventListener('keydown', event => { if (event.key === 'Escape') { hovered = focused = selected = null; event.target.blur(); updateCategory(); } });
updateCategory();

const collectionRail = document.querySelector('.collection-rail');
const collectionSection = document.querySelector('.collection-section');
const collectionStage = document.createElement('div');
collectionStage.className = 'collection-stage';
collectionStage.append(...collectionSection.childNodes);
collectionSection.append(collectionStage);
collectionSection.classList.add('collection-scroll-section');
let collectionStart = 0;
let collectionDistance = 0;
function updateCollectionScroll() {
  if (mobileViewport.matches) return;
  collectionRail.scrollLeft = Math.max(0, Math.min(collectionDistance, scrollY - collectionStart));
}
function measureCollection() {
  if (mobileViewport.matches) {
    collectionSection.style.height = 'auto';
    collectionStage.style.top = 'auto';
    return;
  }
  collectionDistance = Math.max(0, collectionRail.scrollWidth - collectionRail.clientWidth);
  const offset = Math.min(0, innerHeight - collectionStage.offsetHeight);
  collectionStage.style.top = offset + 'px';
  collectionSection.style.height = (collectionStage.offsetHeight + collectionDistance) + 'px';
  collectionStart = collectionSection.getBoundingClientRect().top + scrollY - offset;
  updateCollectionScroll();
}
window.addEventListener('scroll', updateCollectionScroll, { passive: true });
window.addEventListener('resize', measureCollection);
new ResizeObserver(measureCollection).observe(collectionStage);
document.fonts.ready.then(measureCollection);
measureCollection();
document.querySelectorAll('.collection-controls button').forEach((button, index) => {
  button.addEventListener('click', () => {
    if (mobileViewport.matches) {
      collectionRail.scrollBy({ left: (index ? 1 : -1) * collectionRail.clientWidth * 0.8, behavior: 'instant' });
      return;
    }
    const target = Math.max(0, Math.min(collectionDistance, collectionRail.scrollLeft + (index ? 1 : -1) * collectionRail.clientWidth * 0.8));
    window.scrollTo({ top: collectionStart + target, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });
});

document.querySelectorAll('.friends-card').forEach(card => {
  const trigger = card.querySelector('.friends-hotspot');
  const popup = card.querySelector('.friends-product-popup');
  let hover = false;
  let focus = false;
  let pinned = false;
  const update = () => {
    const open = hover || focus || pinned;
    card.classList.toggle('is-product-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    popup.setAttribute('aria-hidden', String(!open));
  };
  card.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hover = true; update(); } });
  card.addEventListener('pointerleave', () => { hover = false; update(); });
  card.addEventListener('focusin', event => { if (event.target.matches(':focus-visible')) { focus = true; update(); } });
  card.addEventListener('focusout', event => { if (!card.contains(event.relatedTarget)) { focus = false; update(); } });
  trigger.addEventListener('click', event => { if (event.detail === 0 || !window.matchMedia('(hover: hover)').matches) { pinned = !pinned; update(); } });
  document.addEventListener('pointerdown', event => { if (pinned && !card.contains(event.target)) { pinned = false; update(); } });
  card.addEventListener('keydown', event => { if (event.key === 'Escape') { hover = focus = pinned = false; event.target.blur(); update(); } });
});

const friendsRail = document.querySelector('.friends-rail');
let drag = null;
function stopDrag(event) {
  if (drag?.id !== event.pointerId) return;
  drag = null;
  friendsRail.classList.remove('is-dragging');
  if (friendsRail.hasPointerCapture(event.pointerId)) friendsRail.releasePointerCapture(event.pointerId);
}
friendsRail.addEventListener('dragstart', event => event.preventDefault());
friendsRail.addEventListener('pointerdown', event => {
  if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, a')) return;
  drag = { id: event.pointerId, x: event.clientX, left: friendsRail.scrollLeft };
});
friendsRail.addEventListener('pointermove', event => {
  if (!drag || drag.id !== event.pointerId) return;
  const delta = event.clientX - drag.x;
  if (!friendsRail.hasPointerCapture(event.pointerId)) {
    if (Math.abs(delta) < 5) return;
    friendsRail.setPointerCapture(event.pointerId);
    friendsRail.classList.add('is-dragging');
  }
  friendsRail.scrollLeft = drag.left - delta;
});
['pointerup', 'pointercancel'].forEach(type => friendsRail.addEventListener(type, stopDrag));
friendsRail.addEventListener('pointerleave', event => { if (!friendsRail.hasPointerCapture(event.pointerId)) stopDrag(event); });
friendsRail.addEventListener('lostpointercapture', () => { drag = null; friendsRail.classList.remove('is-dragging'); });

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const photos = [...document.querySelectorAll('.brand-image, .product-story-image, .friends-model, .friends-badge, .lookbook-image')];
  photos.forEach(photo => { photo.dataset.photoReveal = 'pending'; });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.dataset.photoReveal = 'visible'; observer.unobserve(entry.target); }
  }), { rootMargin: `0px 0px -${Math.round(innerHeight * 0.15)}px 0px` });
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (!reducedMotion.matches) photos.forEach(photo => observer.observe(photo));
  }));
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) { observer.disconnect(); photos.forEach(photo => { delete photo.dataset.photoReveal; }); }
  });
}
