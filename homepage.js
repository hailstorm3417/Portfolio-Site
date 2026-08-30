const TITLES = ['Director of Product Design', 'Design Engineer'];

const WORK_PREVIEWS = [
  'uploads/assets-1787974982619-ut64.gif',
  'uploads/assets-1787974993322-50lf.avif',
  'uploads/assets-1787975017498-jzsn.gif',
  'uploads/assets-1787975245904-t1i7.png'
];

const QA = [
  ["What's it like to work with you day-to-day?", "I want to be a breath of fresh air. Steady, dependable, easy to think alongside. I'd rather talk through a hard problem than argue one out — arguing is counterproductive, finding a solution together is the point.", ''],
  ["What's something you believe about design that not everyone agrees with?", "Output matters more than ego. It isn't enough for me to feel good about the work — others need to feel it too. That's part of why I thrive in constraints rather than open space: a blank canvas is intimidating, but a clear problem with real limits sparks clarity. So pushback usually just becomes fuel for the next idea, not a wall.", ''],
  ["What's your approach to working with engineers?", "Engineering was never a group I handed designs off to and moved on from. I've always wanted validation throughout the process — is this executable, does this actually make sense — not just a sign-off at the end.", 'mockup note — full answer continues'],
  ['What scares you, professionally?', "Learning something new — every time. But the last eight years have been one leap after another, and I've come to trust that the scary jumps are where the real growth happens.", ''],
  ["What do you do when you're not designing?", "Write novels, run a small handmade home decor business with my family, help run an annual art show, and raise three kids under five. Creativity isn't really my job — it's just how I move through the world.", '']
];

const QUOTES = [
  ['Halie is one of the most talented UX Designers I have ever worked with. She has always taken the designs of our application to the next level. Our apps would not be the same without her.', 'Francisco Nolla', 'CTO, Optimize Health'],
  ['Halie is a talented and dedicated UX designer who excels at creating design systems that are consistent, re-usable, and adaptable. She is a master of Figma, using it to craft beautiful and functional designs that solve problems and meet user needs. Halie is also a great leader and mentor, who inspires others with her creativity, hard work, and design excellence.', 'Allison Card', 'Senior Director of Product, Optimize Health'],
  ["Creativity is the phrase that comes to mind when I think about Halie. She has lead several design projects for me. Above all, I was impressed with Halie's ability to continually dive into unfamiliar products and deliver comprehensive solutions. And, of course, her work ethic and professionalism are never questioned while taking on more than her peers. Halie would be a true asset for any positions requiring graphic design, product design, user research or creating prototypes and comes with my heartfelt recommendation.", 'Robert Hale', 'Head of Product, CareCloud'],
  ['Halie has an amazing ability to grasp what the users need, and asks the right questions to really understand the problem for which she is creating a solution. She makes the collaboration process very rewarding!', 'Beth Turner', 'Project Manager, CareCloud']
];

// Hero glitch — swaps the title mid-glitch, every 5s.
const glitch = document.getElementById('glitch');
const glitchSpans = glitch.querySelectorAll('.base, .ghost');
let titleIndex = 0;

setInterval(() => {
  glitch.classList.add('on');
  setTimeout(() => {
    titleIndex = 1 - titleIndex;
    glitchSpans.forEach(el => { el.textContent = TITLES[titleIndex]; });
  }, 300);
  setTimeout(() => glitch.classList.remove('on'), 820);
}, 5000);

// "How I got here" progressive disclosure
const bioToggle = document.getElementById('bio-toggle');
const bioMore = document.getElementById('bio-more');

bioToggle.addEventListener('click', () => {
  const open = bioMore.classList.toggle('open');
  bioToggle.setAttribute('aria-expanded', String(open));
  bioToggle.textContent = open ? 'Collapse' : 'Read the rest';
});

// Work index — hovering a role swaps the preview image
const workPreview = document.getElementById('work-preview');

function showWorkPreview(i) {
  workPreview.style.backgroundImage = `url("${WORK_PREVIEWS[i]}")`;
}

document.querySelectorAll('.work-row').forEach(row => {
  const show = () => showWorkPreview(Number(row.dataset.work));
  row.addEventListener('mouseenter', show);
  row.addEventListener('focus', show);
});
showWorkPreview(0);

// Recommendation quotes — two per page
const quoteDots = [...document.querySelectorAll('#quote-dots .dot')];
const pageCount = QUOTES.length / 2;
let quotePage = 0;

function renderQuotes() {
  for (let slot = 0; slot < 2; slot++) {
    const [text, name, role] = QUOTES[quotePage * 2 + slot];
    document.querySelector(`[data-quote-text="${slot}"]`).textContent = text;
    document.querySelector(`[data-quote-name="${slot}"]`).textContent = name;
    document.querySelector(`[data-quote-role="${slot}"]`).textContent = role;
  }
  quoteDots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === quotePage)));
}

function goToQuotePage(page) {
  quotePage = (page + pageCount) % pageCount;
  renderQuotes();
}

document.getElementById('quote-prev').addEventListener('click', () => goToQuotePage(quotePage - 1));
document.getElementById('quote-next').addEventListener('click', () => goToQuotePage(quotePage + 1));
quoteDots.forEach(dot => dot.addEventListener('click', () => goToQuotePage(Number(dot.dataset.page))));
renderQuotes();

// Q&A tabs
const qaTabs = [...document.querySelectorAll('#qa-tabs .pill')];
const qaQuestion = document.getElementById('qa-question');
const qaAnswer = document.getElementById('qa-answer');
const qaNote = document.getElementById('qa-note');

function selectQa(index) {
  const [question, answer, note] = QA[index];
  qaQuestion.textContent = question;
  qaAnswer.textContent = answer;
  qaNote.textContent = note;
  qaTabs.forEach((tab, i) => tab.setAttribute('aria-selected', String(i === index)));
}

qaTabs.forEach(tab => tab.addEventListener('click', () => selectQa(Number(tab.dataset.tab))));
selectQa(0);
