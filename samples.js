const sessions = [
  { speakers: 2, ids: ['121-123859_3729-6852', '1221-135767_5683-32866', '7127-75947_6829-68769'] },
  { speakers: 3, ids: ['1221-135766_1284-134647_6930-75918', '1284-1180_8230-279154_1188-133604', '1320-122612_3729-6852_672-122797'] },
  { speakers: 4, ids: ['1089-134691_1580-141084_1284-1180_8224-274384', '1221-135766_61-70968_1320-122612_8455-210777', '1284-1180_1284-1181_4446-2273_7176-88083'] },
  { speakers: 5, ids: ['6829-68769_4992-41806_1995-1837_8455-210777_8224-274381', '1089-134686_2830-3980_7729-102255_1221-135766_4992-41806', '1284-134647_237-126133_8455-210777_121-127105_5683-32879'] }
];

const officialSessions = [
  { speakers: 2, id: '4446-2271_2961-960' },
  { speakers: 3, id: '6829-68769_5683-32865_1580-141084' },
  { speakers: 4, id: '4446-2273_3575-170457_1580-141084_1284-1180' },
  { speakers: 5, id: '7127-75947_1320-122617_8555-284449_4077-13754_3570-5695' }
];
const officialMethods = [
  { directory: 'ori', label: 'Original (ORI)' },
  { directory: 'res', label: 'RES' },
  { directory: 'select', label: 'SELECT' },
  { directory: 'ds', label: 'DS' },
  { directory: 'as', label: 'AS' }
];
const officialBase = 'https://xiaoxiaomiao323.github.io/msa-audio/predict_rttm';

function audioCell(src, label) {
  const cell = document.createElement('td');
  const player = document.createElement('audio');
  player.controls = true;
  player.preload = 'none';
  player.src = src;
  player.setAttribute('aria-label', label);
  const link = document.createElement('a');
  link.className = 'audio-link';
  link.href = src;
  link.textContent = 'open audio';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  cell.append(player, link);
  return cell;
}

function createTable(headers) {
  const wrap = document.createElement('div');
  wrap.className = 'table-wrap';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  headers.forEach((label, index) => {
    const th = document.createElement('th');
    th.textContent = label;
    if (index > 0) th.className = 'audio-col';
    tr.append(th);
  });
  thead.append(tr);
  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  wrap.append(table);
  return { wrap, tbody };
}

function group(title, parent) {
  const section = document.createElement('section');
  section.className = 'speaker-group';
  const h3 = document.createElement('h3');
  h3.textContent = title;
  section.append(h3);
  parent.append(section);
  return section;
}

function sessionCell(id) {
  const td = document.createElement('td');
  td.className = 'session-id';
  td.textContent = id;
  return td;
}

const pairedRoot = document.querySelector('#sample-groups');
sessions.forEach(({ speakers, ids }) => {
  const section = group(`${speakers} speakers`, pairedRoot);
  const { wrap, tbody } = createTable(['Session ID', 'Original', 'SMVA + Qwen3-TTS', 'SMVA + X-VC']);
  ids.forEach((id, index) => {
    const prefix = `audio/spk${speakers}/example0${index + 1}`;
    const row = document.createElement('tr');
    row.append(sessionCell(id),
      audioCell(`${prefix}-source.wav`, `${speakers}-speaker original session ${id}`),
      audioCell(`${prefix}-qwen3tts.wav`, `${speakers}-speaker Qwen3-TTS session ${id}`),
      audioCell(`${prefix}-xvc.wav`, `${speakers}-speaker X-VC session ${id}`));
    tbody.append(row);
  });
  section.append(wrap);
});

const officialRoot = document.querySelector('#official-groups');
officialSessions.forEach(({ speakers, id }) => {
  const section = group(`${speakers} speakers`, officialRoot);
  const { wrap, tbody } = createTable(['Session ID', ...officialMethods.map(method => method.label)]);
  const row = document.createElement('tr');
  row.append(sessionCell(id));
  officialMethods.forEach(({ directory, label }) => {
    const filename = directory === 'ori' ? `${id}.wav` : `${id}_gen.wav`;
    row.append(audioCell(`${officialBase}/${directory}/${filename}`, `Official MSA ${speakers}-speaker ${label} session ${id}`));
  });
  tbody.append(row);
  section.append(wrap);
});
