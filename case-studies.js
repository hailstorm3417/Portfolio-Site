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
    blocks: [{
      paras: [
        'Educate is Medbridge’s foundation — the product that built our reputation as a best-in-class destination for continuing education. But years of success also left us with legacy experiences and technical architecture that hadn’t evolved alongside our customers.'
      ],
      full: [
        'Over the last three years, we’ve been modernizing both at once. While Engineering undertook the long process of rebuilding the underlying architecture, Design rethought the experiences sitting on top of it — user management, Skills, Knowledge Tracks, assignments, completion records, HRIS integrations, course discovery, the course player, and more. The goal wasn’t simply to refresh old screens, but to realign them around the needs of today’s users and increasingly complex organizations.',
        'At the same time, we found opportunities to make the content we already had useful in entirely new ways. CPM was built as a net-new experience for the "just-in-time" needs of home health providers. These clinicians were already Medbridge users, and much of the content they needed already existed — but the way we delivered it wasn’t designed for someone who needed an answer in the moment of care.',
        'CPM reorganized that content around the clinical scenarios providers actually encounter, creating a faster path from a question in the field to relevant guidance. Since launching, we’ve continued measuring adoption, retention, growth, and the journeys clinicians take through the experience. CPM has reached more than 500 customer accounts, with account retention consistently remaining above 90% — strong validation for an entirely new way of putting our existing clinical content to work.',
        'Together, this work has given Educate a much stronger foundation: modernizing what made us successful while creating new ways for that same depth of content to serve larger and more complex enterprise customers.'
      ],
      img: 'uploads/assets-1787975326295-yi88.png',
      alt: 'Completion history view'
    }]
  },
  {
    title: 'Growth',
    blocks: [{
      paras: [
        'As Medbridge expanded, we also had to rethink how smaller organizations bought and managed the product.',
        'Historically, many subscription changes required a conversation with our Customer Support team. That worked, but it created friction for customers and required significant internal resources to manage tasks that could ultimately be self-service.'
      ],
      full: [
        'Integrating Stripe gave us the opportunity to redesign that model. We built an in-app purchasing and subscription-management experience where SMB customers can understand what they own, purchase additional products, upgrade or downgrade subscriptions, manage payment issues and renewals, and assign purchased seats to their teams.',
        'What looks like a purchasing interface is actually a dense system of business rules — subscription states, product eligibility, billing cycles, seat assignments, payment status, upgrades, downgrades, and renewals all have to work together without becoming visible complexity for the customer.',
        'The result isn’t only a better buying experience. Self-service creates another path for net-new customers while allowing existing customers who once required hands-on support to move into a more scalable SMB model — reducing operational overhead as the business grows.'
      ],
      img: 'uploads/assets-1787975255512-1u83.png',
      alt: 'Cart with items'
    }]
  },
  {
    title: 'GTM initiatives',
    blocks: [{
      full: [
        'Shipping a product and selling the value of that product are two different design problems.',
        'Our product mocks were intentionally comprehensive. They showed the system and its possible states so Engineering and I could work through how the experience should actually function. But that made them poorly suited to a sales conversation — they explained the product, not necessarily why a customer should buy it.',
        'My work with our go-to-market teams was rarely about creating new screens. Instead, I adapted the mocks we already had to follow a specific talk track. A generic patient became a 73-year-old with a previous back injury who didn’t have exercise reminders enabled. The next screen needed to reflect that context, and the screen after that needed to build on it.',
        'Those details mattered because the demo was telling a story. Each state had to set up the next part of the conversation, surface a customer pain point, demonstrate the product’s response, and ultimately help communicate ROI and create a reason to buy.',
        'That meant a steady stream of small but important adjustments as the product and sales narrative evolved — keeping Product, Marketing, and Sales aligned so the experience being shown wasn’t simply accurate, but purposeful.',
        'The product designs showed everything the system could do.',
        'The GTM versions showed why any of it mattered.'
      ]
    }]
  }
];

const wsTabs = [...document.querySelectorAll('#ws-tabs .pill')];
const wsTitle = document.getElementById('ws-title');
const wsBlocks = document.getElementById('ws-blocks');
const wsNote = document.getElementById('ws-note');
let wsIndex = 0;

function paragraphs(into, texts) {
  for (const text of texts) {
    const p = document.createElement('p');
    p.className = 'body-copy';
    p.textContent = text;
    into.append(p);
  }
}

function buildBlock(block) {
  const el = document.createElement('div');
  el.className = 'ws-block';

  // No image means nothing to sit beside — the copy simply runs full width.
  if (!block.img) {
    const only = document.createElement('div');
    only.className = 'ws-full ws-full--only';
    paragraphs(only, block.full || block.paras || []);
    el.append(only);
    return el;
  }

  const copy = document.createElement('div');
  copy.className = 'ws-copy';
  paragraphs(copy, block.paras);

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
    paragraphs(full, block.full);
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
