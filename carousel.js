// Image carousel.
//
// The movement is the browser's own: a flex track with scroll snapping, so a
// phone swipes it without any help from here. This file only builds the dots,
// points the arrows at the same scrolling, and keeps the indicator in step
// with wherever the reader actually ended up — including after a swipe, which
// no script initiated.

const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

function setUpCarousel(root) {
  const track = root.querySelector('.carousel-track');
  const dotRow = root.querySelector('.carousel-dots');
  const slides = [...track.children];

  // A single image is just an image. Drop the chrome rather than leaving dead
  // arrows and an empty dot row beneath it.
  if (slides.length < 2) {
    root.querySelector('.carousel-controls')?.remove();
    return;
  }

  let index = 0;

  function markCurrent(i) {
    index = i;
    [...dotRow.children].forEach((dot, n) =>
      dot.setAttribute('aria-selected', String(n === i)));
  }

  // Every slide is exactly the width of the track, so the nth one begins at n
  // track-widths in — no measuring of individual slides needed, and it stays
  // correct through a resize.
  function goTo(i) {
    const wrapped = (i + slides.length) % slides.length;
    track.scrollTo({
      left: wrapped * track.clientWidth,
      behavior: REDUCE_MOTION.matches ? 'auto' : 'smooth'
    });
    markCurrent(wrapped);
  }

  dotRow.replaceChildren(...slides.map((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    const label = slide.querySelector('figcaption')?.textContent.trim();
    dot.setAttribute('aria-label', label || `Image ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    return dot;
  }));

  root.querySelector('[data-carousel-prev]').addEventListener('click', () => goTo(index - 1));
  root.querySelector('[data-carousel-next]').addEventListener('click', () => goTo(index + 1));

  // A swipe must not open the lightbox. Browsers normally withhold the click
  // after a scroll gesture, but not all of them do, so a click arriving while
  // the track is still settling is swallowed before it reaches the delegated
  // handler on the document.
  let lastScroll = 0;
  track.addEventListener('click', event => {
    if (Date.now() - lastScroll < 250) event.stopPropagation();
  }, true);

  track.addEventListener('scroll', () => {
    lastScroll = Date.now();
    markCurrent(Math.round(track.scrollLeft / track.clientWidth));
  }, { passive: true });

  // The track is narrower after a resize, so the old scroll offset points
  // somewhere between two slides. Put the reader back on the one they were on.
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      track.scrollTo({ left: index * track.clientWidth, behavior: 'auto' });
    }, 150);
  });

  markCurrent(0);
}

// Exposed because not every carousel is in the page at load: the Medbridge
// workstreams rebuild their blocks on each tab change, so whatever they just
// created has to be set up then. Marking each root keeps a second pass from
// binding the same carousel twice.
window.initCarousels = function initCarousels(root = document) {
  root.querySelectorAll('[data-carousel]').forEach(el => {
    if (el.dataset.carouselReady) return;
    el.dataset.carouselReady = '1';
    setUpCarousel(el);
  });
};

initCarousels();
