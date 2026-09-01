// Each workstream is a list of blocks. A block is a run of copy paired with
// one image; the layout alternates which side the image falls on, so a
// workstream with more to say simply gets more blocks.
const WORKSTREAMS = [
  {
    title: 'Pathways',
    blocks: [
      {
        paras: [
          'When I joined, Medbridge was best known as a best-in-class education platform with a single, much-loved product used by clinicians. There was an emerging idea to explore lower-acuity, self-managed care — something that could complement the higher-touch experiences we already offered — but it wasn’t yet a committed direction.'
        ],
        full: [
          'Out of curiosity, I spent a weekend exploring what that future might look like. That exploration became the foundation for a six-month pursuit of a multi-million dollar RFP with one of the largest hospital systems in the country.',
          'We won.'
        ],
        img: 'uploads/assets-1787975191831-qtgz.png',
        alt: 'Pre-brand Pathways exploration'
      },
      {
        paras: [
          'But winning the RFP was only the beginning.',
          'Pathways evolved from an early concept into a core part of Medbridge’s strategy for delivering lower-acuity, self-managed care. As the product grew, so did the complexity of the problems we were solving.'
        ],
        full: [
          'We introduced capabilities like Remote Therapeutic Monitoring (RTM), designing workflows that help clinicians understand patient activity and engagement while supporting reimbursement requirements. That meant designing within a system shaped not only by user needs, but by billing codes, documentation requirements, clinical workflows, and strict regulatory constraints.',
          'And that system doesn’t stand still.',
          'Reimbursement rules and industry standards continue to evolve, creating a product environment where a seemingly small regulatory change can reshape workflows, metrics, and even the value proposition of a feature. Our job has been to build for today while creating enough flexibility to adapt to what comes next.',
          'Now, we’re pushing Pathways further — exploring things like benchmarking and better ways to turn patient activity into meaningful signals clinicians can use to understand performance and make decisions.'
        ],
        img: 'uploads/assets-1787975263498-fqw4.png',
        alt: 'Pathways collection builder'
      }
    ]
  },
  {
    title: 'Educate',
    note: 'placeholder copy',
    blocks: [{
      paras: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      ],
      img: 'uploads/assets-1787975326295-yi88.png',
      alt: 'Completion history view'
    }]
  },
  {
    title: 'Growth',
    note: 'placeholder copy',
    blocks: [{
      paras: [
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
      ],
      img: 'uploads/assets-1787975255512-1u83.png',
      alt: 'Cart with items'
    }]
  },
  {
    title: 'GTM initiatives',
    note: 'placeholder copy',
    blocks: [{
      paras: [
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
        'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.'
      ],
      img: 'uploads/assets-1787975331540-puu4.png',
      alt: 'Collection view'
    }]
  }
];

const wsTabs = [...document.querySelectorAll('#ws-tabs .pill')];
const wsTitle = document.getElementById('ws-title');
const wsBlocks = document.getElementById('ws-blocks');
const wsNote = document.getElementById('ws-note');
let wsIndex = 0;

function buildBlock(block) {
  const el = document.createElement('div');
  el.className = 'ws-block';

  const copy = document.createElement('div');
  copy.className = 'ws-copy';
  for (const text of block.paras) {
    const p = document.createElement('p');
    p.className = 'body-copy';
    p.textContent = text;
    copy.append(p);
  }

  const figure = document.createElement('figure');
  figure.className = 'ws-figure';
  const img = document.createElement('img');
  img.src = block.img;
  img.alt = block.alt;
  img.loading = 'lazy';
  figure.append(img);

  // Copy before image in source, always — the stacked mobile view reads in
  // this order, and CSS flips the sides on the alternating rows.
  el.append(copy, figure);

  // Copy that runs the width of both columns, underneath the pair.
  if (block.full) {
    const full = document.createElement('div');
    full.className = 'ws-full';
    for (const text of block.full) {
      const p = document.createElement('p');
      p.className = 'body-copy';
      p.textContent = text;
      full.append(p);
    }
    el.append(full);
  }
  return el;
}

function renderWorkstream() {
  const ws = WORKSTREAMS[wsIndex];
  wsTitle.textContent = ws.title;
  wsBlocks.replaceChildren(...ws.blocks.map(buildBlock));
  wsNote.textContent = ws.note || '';
  wsTabs.forEach((tab, i) => tab.setAttribute('aria-selected', String(i === wsIndex)));
}

// Bring the selected pill fully inside its scroller, with 16px of room.
// Without this the last tab sits clipped off the right edge on a phone.
function scrollPillIntoView(row, pill) {
  const left = pill.offsetLeft;
  const right = left + pill.offsetWidth;
  if (right > row.scrollLeft + row.clientWidth - 16) {
    row.scrollLeft = right - row.clientWidth + 16;
  } else if (left < row.scrollLeft + 16) {
    row.scrollLeft = left - 16;
  }
}

function goToWorkstream(index) {
  wsIndex = (index + WORKSTREAMS.length) % WORKSTREAMS.length;
  renderWorkstream();
  scrollPillIntoView(document.getElementById('ws-tabs'), wsTabs[wsIndex]);
}

document.getElementById('ws-prev').addEventListener('click', () => goToWorkstream(wsIndex - 1));
document.getElementById('ws-next').addEventListener('click', () => goToWorkstream(wsIndex + 1));
wsTabs.forEach(tab => tab.addEventListener('click', () => goToWorkstream(Number(tab.dataset.ws))));
renderWorkstream();
