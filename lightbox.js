// Click any image in the page body to see it full size.
//
// Uses a native <dialog>, which brings the modal behaviour with it: the
// backdrop, Escape to close, focus held inside while open and returned to the
// image afterwards. The dialog is built here rather than sat in every page's
// markup, and clicks are delegated from the document — the Medbridge
// workstream images are re-created whenever a tab changes, so binding to each
// image at load would miss every one after the first.

const ZOOMABLE = 'main img';

// Tells the stylesheet this page can actually zoom, so the zoom-in cursor is
// only promised where the promise can be kept.
document.documentElement.classList.add('has-lightbox');

const dialog = document.createElement('dialog');
dialog.className = 'lightbox';
dialog.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="Close">&times;</button>
  <img class="lightbox-img" alt="">
  <p class="lightbox-cap"></p>
`;
document.body.append(dialog);

const bigImage = dialog.querySelector('.lightbox-img');
const caption = dialog.querySelector('.lightbox-cap');
const closeButton = dialog.querySelector('.lightbox-close');

// Prefer a caption the page already shows, then the figure's own, then the
// alt text — an image with none of those simply opens without a description.
function describe(img) {
  const figcaption = img.closest('figure')?.querySelector('figcaption');
  if (figcaption) return figcaption.textContent.trim();
  const next = img.parentElement?.querySelector('.caption');
  if (next) return next.textContent.trim();
  return img.getAttribute('alt') || '';
}

function open(img) {
  bigImage.src = img.currentSrc || img.src;
  bigImage.alt = img.getAttribute('alt') || '';
  const text = describe(img);
  caption.textContent = text;
  caption.hidden = !text;
  dialog.showModal();
  closeButton.focus();
}

document.addEventListener('click', event => {
  if (event.target.closest('.lightbox')) return;
  const img = event.target.closest(ZOOMABLE);
  // An image inside a link belongs to the link; opening the lightbox as well
  // would fire a navigation and a modal from one click.
  if (img && !img.closest('a')) open(img);
});

// Keyboard route in, since a bare <img> is not focusable.
document.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const img = event.target.closest?.(ZOOMABLE);
  if (img) { event.preventDefault(); open(img); }
});

closeButton.addEventListener('click', () => dialog.close());

// Clicking the backdrop closes too. The dialog fills its own box, so a click
// landing outside the content rectangle is a click on the backdrop.
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right ||
                  event.clientY < box.top || event.clientY > box.bottom;
  if (outside) dialog.close();
});

// Drop the source on close so a large image is not held in memory.
dialog.addEventListener('close', () => { bigImage.removeAttribute('src'); });
