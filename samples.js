const sessions = [
  { speakers: 2, ids: [
    '121-123859_3729-6852',
    '1221-135767_5683-32866',
    '7127-75947_6829-68769'
  ] },
  { speakers: 3, ids: [
    '1221-135766_1284-134647_6930-75918',
    '1284-1180_8230-279154_1188-133604',
    '1320-122612_3729-6852_672-122797'
  ] },
  { speakers: 4, ids: [
    '1089-134691_1580-141084_1284-1180_8224-274384',
    '1221-135766_61-70968_1320-122612_8455-210777',
    '1284-1180_1284-1181_4446-2273_7176-88083'
  ] },
  { speakers: 5, ids: [
    '6829-68769_4992-41806_1995-1837_8455-210777_8224-274381',
    '1089-134686_2830-3980_7729-102255_1221-135766_4992-41806',
    '1284-134647_237-126133_8455-210777_121-127105_5683-32879'
  ] }
];

const list = document.querySelector('#sample-list');
const filters = Array.from(document.querySelectorAll('.filter'));

function audioCell(speakerCount, caseIndex, role, label, className) {
  const cell = document.createElement('div');
  cell.className = `audio-cell ${className}`;
  const heading = document.createElement('p');
  heading.className = 'audio-label';
  heading.textContent = label;
  const player = document.createElement('audio');
  player.controls = true;
  player.preload = 'none';
  player.setAttribute('aria-label', `${speakerCount}-speaker case ${caseIndex}: ${label}`);
  player.src = `audio/spk${speakerCount}/example0${caseIndex}-${role}.wav`;
  cell.append(heading, player);
  return cell;
}

function render(selected = 'all') {
  list.replaceChildren();
  sessions.filter(group => selected === 'all' || String(group.speakers) === selected).forEach(group => {
    group.ids.forEach((id, index) => {
      const row = document.createElement('article');
      row.className = 'sample-row';
      const info = document.createElement('div');
      info.className = 'case-info';
      const heading = document.createElement('div');
      heading.className = 'case-meta';
      heading.innerHTML = `<span class="speaker-pill">${group.speakers} speakers</span><span class="case-number">Example ${String(index + 1).padStart(2, '0')}</span>`;
      const sid = document.createElement('p');
      sid.className = 'session-id';
      sid.textContent = id;
      info.append(heading, sid);
      row.append(info,
        audioCell(group.speakers, index + 1, 'source', 'Source', 'source'),
        audioCell(group.speakers, index + 1, 'qwen3tts', 'Qwen3-TTS', 'qwen'),
        audioCell(group.speakers, index + 1, 'xvc', 'X-VC', 'xvc'));
      list.append(row);
    });
  });
}

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(other => {
    const active = other === button;
    other.classList.toggle('active', active);
    other.setAttribute('aria-pressed', String(active));
  });
  render(button.dataset.filter);
}));

render();

const officialSessions = [
  { speakers: 2, id: '4446-2271_2961-960' },
  { speakers: 3, id: '6829-68769_5683-32865_1580-141084' },
  { speakers: 4, id: '4446-2273_3575-170457_1580-141084_1284-1180' },
  { speakers: 5, id: '7127-75947_1320-122617_8555-284449_4077-13754_3570-5695' }
];
const officialMethods = [
  { directory: 'ori', label: 'Original (ORI)' },
  { directory: 'res', label: 'Resynthesis (RES)' },
  { directory: 'select', label: 'Selection (SELECT)' },
  { directory: 'ds', label: 'DS' },
  { directory: 'as', label: 'AS' }
];
const officialBase = 'https://xiaoxiaomiao323.github.io/msa-audio/predict_rttm';
const officialList = document.querySelector('#official-list');

officialSessions.forEach(({ speakers, id }) => {
  const card = document.createElement('article');
  card.className = 'official-card';
  const header = document.createElement('div');
  header.className = 'official-card-header';
  const pill = document.createElement('span');
  pill.className = 'speaker-pill';
  pill.textContent = `${speakers} speakers`;
  const session = document.createElement('span');
  session.className = 'session-id';
  session.textContent = id;
  header.append(pill, session);
  const players = document.createElement('div');
  players.className = 'official-audios';
  officialMethods.forEach(({ directory, label }) => {
    const cell = document.createElement('div');
    cell.className = 'official-audio';
    const heading = document.createElement('p');
    heading.textContent = label;
    const player = document.createElement('audio');
    player.controls = true;
    player.preload = 'none';
    player.setAttribute('aria-label', `Official MSA ${speakers}-speaker ${label}`);
    const filename = directory === 'ori' ? `${id}.wav` : `${id}_gen.wav`;
    player.src = `${officialBase}/${directory}/${filename}`;
    cell.append(heading, player);
    players.append(cell);
  });
  card.append(header, players);
  officialList.append(card);
});
