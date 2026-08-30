const WORKSTREAMS = [
  {
    title: 'Pathways',
    p1: 'When I joined, Medbridge was best known as a best-in-class education platform with a single, much-loved product used by clinicians. There was an emerging idea to explore lower-acuity, self-managed care — something that could complement the higher-touch experiences we already offered — but it wasn’t yet a committed direction.',
    p2: 'Out of curiosity, I spent a weekend exploring what that future might look like. That exploration became the foundation for a six-month pursuit of a multi-million dollar RFP with one of the largest hospital systems in the country.',
    punch: 'We won.',
    note: '',
    img: 'uploads/assets-1787975191831-qtgz.png',
    alt: 'Pre-brand Pathways exploration',
    caption: 'Pre-brand exploration.'
  },
  {
    title: 'Educate',
    p1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    p2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    punch: '',
    note: 'placeholder copy',
    img: 'uploads/assets-1787975326295-yi88.png',
    alt: 'Completion history view',
    caption: 'Completion history.'
  },
  {
    title: 'Growth',
    p1: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    p2: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    punch: '',
    note: 'placeholder copy',
    img: 'uploads/assets-1787975255512-1u83.png',
    alt: 'Cart with items',
    caption: 'Items in cart.'
  },
  {
    title: 'GTM initiatives',
    p1: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
    p2: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.',
    punch: '',
    note: 'placeholder copy',
    img: 'uploads/assets-1787975331540-puu4.png',
    alt: 'Collection view',
    caption: 'Collection view.'
  }
];

const wsTabs = [...document.querySelectorAll('#ws-tabs .pill')];
const wsImg = document.getElementById('ws-img');
let wsIndex = 0;

function renderWorkstream() {
  const ws = WORKSTREAMS[wsIndex];
  document.getElementById('ws-title').textContent = ws.title;
  document.getElementById('ws-p1').textContent = ws.p1;
  document.getElementById('ws-p2').textContent = ws.p2;
  document.getElementById('ws-punch').textContent = ws.punch;
  document.getElementById('ws-caption').textContent = ws.note ? `${ws.caption} — ${ws.note}` : ws.caption;
  wsImg.src = ws.img;
  wsImg.alt = ws.alt;
  wsTabs.forEach((tab, i) => tab.setAttribute('aria-selected', String(i === wsIndex)));
}

function goToWorkstream(index) {
  wsIndex = (index + WORKSTREAMS.length) % WORKSTREAMS.length;
  renderWorkstream();
}

document.getElementById('ws-prev').addEventListener('click', () => goToWorkstream(wsIndex - 1));
document.getElementById('ws-next').addEventListener('click', () => goToWorkstream(wsIndex + 1));
wsTabs.forEach(tab => tab.addEventListener('click', () => goToWorkstream(Number(tab.dataset.ws))));
renderWorkstream();
