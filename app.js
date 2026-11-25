const deck = document.querySelector("#slides");
const dialog = document.querySelector("#photo-dialog");
const preview = document.querySelector("#photo-preview");

function link(url, text) {
  return `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;
}

function source(photo, label = "出典") {
  return `${link(photo.source, label)} · ${photo.author} · ${link(photo.licenseUrl, photo.license)}`;
}

function photoButton(index, layout, extra = "") {
  const photo = photos[index];
  return `<button type="button" class="photo-frame ${layout}" data-photo="${index}" aria-label="${photo.title}を拡大">
    <img src="${photo.file}" alt="${photo.title}" decoding="sync">
    ${extra}
    <span class="zoom-label" aria-hidden="true">拡大 ↗</span>
  </button>`;
}

function heading(label, title) {
  return `<div class="slide-heading"><p class="eyebrow">${label}</p><h2>${title}</h2></div>`;
}

function caseSlide(item, index) {
  const cards = item.photos.map((photoIndex, position) => {
    const photo = photos[photoIndex];
    return `<figure class="photo-card">
      ${photoButton(photoIndex, item.layouts[position])}
      <figcaption>
        <h3>${photo.title}</h3>
        <p>${photo.observation}</p>
        <small>${source(photo)}</small>
      </figcaption>
    </figure>`;
  }).join("");

  return `${heading(`設定 ${"①②③④⑤"[index]}　${item.label}`, item.title)}
    <div class="case-context">
      <div class="history"><h3>制作設定</h3><p>${item.history}</p></div>
      <div class="finishes"><h3>テクスチャ表現</h3><ul>${item.finishes.map(text => `<li>${text}</li>`).join("")}</ul></div>
    </div>
    <div class="photo-grid">${cards}</div>`;
}

const cover = `<div class="cover-copy">
    <p class="eyebrow">テクスチャ制作入門</p>
    <h1>ロボットの<br>歴史を、<br><span>テクスチャで</span><br>表現しよう！</h1>
    <p class="cover-subtitle">現実のリファレンスから学ぶ、<br>経年変化と質感表現</p>
  </div>
  <figure class="cover-figure">
    ${photoButton(0, "cover-photo")}
    <p class="hero-question">この機械は、どんな場所で、<br>何年間働いてきたのだろう？</p>
    <figcaption><span>採石場のショベルカー ／ 車体と足回りのサビ・土</span><small>${source(photos[0])}</small></figcaption>
  </figure>`;

const setup = `${heading("授業の目標", "なぜ、ロボットの設定が重要なのか？")}
  <p class="lead">全員が同じ3Dモデルを使う。用途・環境・年数を決めると、材質・配色・汚れ方が変わる。</p>
  <div class="setup-grid">
    <table class="environment-table">
      <thead><tr><th scope="col">使用環境</th><th scope="col">機体に起きること</th><th scope="col">見た目に残る変化</th></tr></thead>
      <tbody>${environments.map(([place, cause, result]) => `<tr><th scope="row">${place}</th><td>${cause}</td><td>${result}</td></tr>`).join("")}</tbody>
    </table>
    <div class="principle">
      <p class="eyebrow">質感を考えるときの問い</p>
      <p class="principle-question">なぜ、<br>その場所が<br>汚れたのか？</p>
      <p>写真で付着した場所や劣化の理由を考え、ロボットの質感に置き換える。</p>
    </div>
  </div>`;

const levels = ["—", "○", "●"];
const levelNames = ["省略可", "補助", "主役"];
const compare = `${heading("5つの設定", "経年変化を比較しよう")}
  <div class="compare-intro"><p class="lead">使用履歴に合う変化を主役に選ぼう。</p>
  <div class="legend">${[2, 1, 0].map(value => `<span><b class="level-${value}">${levels[value]}</b> ${levelNames[value]}</span>`).join("")}</div></div>
  <table class="comparison">
    <thead><tr><th scope="col">表現</th><th scope="col">建設作業</th><th scope="col">港湾救助</th><th scope="col">地下採掘</th><th scope="col">消防</th><th scope="col">森林の警備</th></tr></thead>
    <tbody>${comparison.map(([finish, values]) => `<tr><th scope="row">${finish}</th>${values.map(level => `<td class="level-${level}" aria-label="${levelNames[level]}">${levels[level]}</td>`).join("")}</tr>`).join("")}</tbody>
  </table>
  <p class="compare-note">表は優先度の目安。消防の熱変色や、港湾救助の補修塗装も設定を伝える手がかり。</p>`;

const observe = `${heading("写真から制作へ", "現実のリファレンスを観察しよう")}
  <ol class="observation-steps">${observationSteps.map(step => `<li>${step}</li>`).join("")}</ol>
  <div class="observe-grid">
    <div class="observe-photos">
      <figure class="detail-rust">
        ${photoButton(1, "detail-paint", '<span class="pin pin-a" aria-hidden="true">1</span><span class="pin pin-b" aria-hidden="true">2</span>')}
        <figcaption><strong>1　塗膜が途切れる境界　　2　赤サビの粒</strong><small>${source(photos[1])} · 範囲を拡大表示</small></figcaption>
      </figure>
      <figure class="detail-mud">
        ${photoButton(0, "detail-track", '<span class="pin pin-c" aria-hidden="true">3</span>')}
        <figcaption><strong>3　履帯周辺の土汚れ</strong><small>${source(photos[0])} · 範囲を拡大表示</small></figcaption>
      </figure>
    </div>
    <div class="painter">
      <h3>Substance 3D Painterで再現する</h3>
      <dl>${painterTools.map(([term, purpose]) => `<div><dt>${term}</dt><dd>${purpose}</dd></div>`).join("")}</dl>
    </div>
  </div>
  <div class="observe-notes"><p>鉄の赤サビは素材を確認。角は接触、隙間は堆積を考える。</p><p>ススや苔は、付着範囲と表面の凹凸まで見る。</p></div>`;

const task = `${heading("制作課題", "自分のロボットの歴史を考えよう！")}
  <p class="lead">5つの設定から1つ選び、共通モデルのテクスチャを制作する。</p>
  <div class="assignment-grid">
    <div class="assignment-plan">
      <h3>制作前に決めること</h3>
      <ol>${assignment.map(([label, question]) => `<li><strong>${label}</strong><span>${question}</span></li>`).join("")}</ol>
    </div>
    <div class="assignment-refs">
      <h3>実写リファレンスを集める</h3>
      <p class="quantity"><strong>25</strong><span>枚以上</span></p>
      <p>写真ごとに、参考にする部位と質感をメモする。</p>
      <div class="example"><span>観察メモの例</span><p>雨が流れたボルトの下に、<br>細いサビの筋を入れる。</p></div>
    </div>
  </div>
  <p class="closing">ロボットの歴史が見えるテクスチャを制作しよう！</p>`;

const slides = [
  ["cover", cover],
  ["setup", setup],
  ...cases.map((item, index) => ["case", caseSlide(item, index)]),
  ["compare", compare],
  ["observe", observe],
  ["task", task]
];

deck.innerHTML = slides.map(([type, content], index) => `<section class="slide ${type}" aria-label="${index + 1}枚目" ${index ? "hidden" : ""}>${content}</section>`).join("");

const stage = document.querySelector("#stage");
const progress = document.querySelector("#progress");
const counter = document.querySelector("#counter");
const fullscreen = document.querySelector("#fullscreen");
const sections = [...deck.children];
const count = sections.length;
let current = 0;
let touchStart;

function move(index) {
  sections[current].hidden = true;
  current = (index + count) % count;
  sections[current].hidden = false;
  progress.value = current + 1;
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${count}`;
}

function fit() {
  const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  stage.style.setProperty("--scale", scale);
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  } catch {
    fullscreen.textContent = "ブラウザの F11 で全画面表示";
  }
}

document.querySelector("#prev").addEventListener("click", () => move(current - 1));
document.querySelector("#next").addEventListener("click", () => move(current + 1));
fullscreen.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", () => {
  fullscreen.innerHTML = document.fullscreenElement ? "全画面を終了 <kbd>F</kbd>" : "全画面 <kbd>F</kbd>";
  fit();
});
window.addEventListener("resize", fit);

document.addEventListener("keydown", event => {
  if (dialog.open || event.ctrlKey || event.altKey || event.metaKey) return;
  switch (event.key) {
    case "ArrowRight":
    case "PageDown":
    case " ":
      move(current + 1);
      break;
    case "ArrowLeft":
    case "PageUp":
      move(current - 1);
      break;
    case "Home":
      move(0);
      break;
    case "End":
      move(count - 1);
      break;
    case "f":
    case "F":
      if (!event.repeat) toggleFullscreen();
      break;
    default:
      return;
  }

  event.preventDefault();
});

deck.addEventListener("click", event => {
  const button = event.target.closest("[data-photo]");
  if (!button) return;
  const photo = photos[Number(button.dataset.photo)];
  preview.innerHTML = `<img src="${photo.file}" alt="${photo.title}">
    <figcaption><h2 id="photo-title">${photo.title}</h2><p>${photo.observation}</p>
    <small>${source(photo)} · ${link(photo.original, "元画像URL")}</small></figcaption>`;
  dialog.showModal();
});

deck.addEventListener("touchstart", event => {
  if (event.touches.length === 1) touchStart = event.touches[0];
}, { passive: true });

deck.addEventListener("touchend", event => {
  if (!touchStart) return;
  const { clientX, clientY } = event.changedTouches[0];
  const dx = clientX - touchStart.clientX;
  const dy = clientY - touchStart.clientY;
  touchStart = undefined;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) move(current + Math.sign(-dx));
}, { passive: true });

deck.addEventListener("touchcancel", () => { touchStart = undefined; }, { passive: true });

progress.max = count;
fit();
