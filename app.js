/* ===== Barbearia Gui Leiros — interatividade & 3D ===== */

/* ---------- DADOS ---------- */
const SERVICES = [
  { n:'Corte na Navalha', c:'cabelo', t:'Degradê, social ou na tesoura com acabamento de navalha e toalha quente.', p:'R$ 45', d:'45 min', tag:'Clássico', ic:'💈' },
  { n:'Corte + Barba',   c:'barba',  t:'Combo completo: corte, barba desenhada e sobrancelha na régua.',        p:'R$ 75', d:'1h',    tag:'Combo',  ic:'🧔' },
  { n:'Barba Navalhada', c:'barba',  t:'Toalha quente, óleo e navalha. Contorno afiado e pele macia.',          p:'R$ 40', d:'30 min', tag:'Ritual', ic:'🪒' },
  { n:'Box Braids',      c:'tranca', t:'Tranças box braids feitas com paciência e acabamento limpo.',           p:'Sob consulta', d:'3h+', tag:'Signature', ic:'🧵' },
  { n:'Freestyle / Desenho', c:'cabelo', t:'Linhas, rasgos e desenhos navalhados do teu jeito.',               p:'R$ 55', d:'40 min', tag:'Arte',   ic:'✏️' },
  { n:'Corte Infantil',  c:'kids',   t:'Estilo também se aprende desde cedo. Paciência, brinquedo e sorriso.',  p:'R$ 35', d:'30 min', tag:'Pequenos', ic:'🧒' },
  { n:'Pezinho & Orelha',c:'cabelo', t:'Acabamento rápido entre cortes pra manter a linha afiada.',             p:'R$ 20', d:'15 min', tag:'Rápido', ic:'📐' },
  { n:'Sobrancelha',     c:'barba',  t:'Design na navalha e navalhete, sem exagero e no teu formato.',          p:'R$ 15', d:'10 min', tag:'Detalhe', ic:'👁️' },
];

const GALLERY = [
  { n:'01', img:'img/portfolio-5.jpg',  t:'Freestyle',       s:'Degradê + desenho navalhado' },
  { n:'02', img:'img/portfolio-1.jpg',  t:'Box Braids',      s:'Tranças na cadeira' },
  { n:'03', img:'img/portfolio-7.jpg',  t:'Fade Militar',    s:'Corte na régua' },
  { n:'04', img:'img/portfolio-8.jpg',  t:'Barba Aparada',   s:'Contorno e letreiro' },
  { n:'05', img:'img/portfolio-9.jpg',  t:'Platinado',       s:'Franja com luzes' },
  { n:'06', img:'img/portfolio-10.jpg', t:'Luzes',           s:'Franja clareada' },
  { n:'07', img:'img/portfolio-6.jpg',  t:'Social Jovem',    s:'Degradê penteado' },
  { n:'08', img:'img/portfolio-2.jpg',  t:'Social Clássico', s:'Acabamento na navalha' },
  { n:'09', img:'img/portfolio-4.jpg',  t:'Festa Infantil',  s:'Dia das Crianças 2.0' },
  { n:'10', img:'img/portfolio-3.jpg',  t:'Comunidade',      s:'Evento Gui Leiros' },
  { n:'11', img:'img/portfolio-11.jpg', t:'Vila Conde',      s:'Torcida e raiz' },
];

const QUOTES = [
  { s:5, q:'Fiz o degradê e o pezinho, ficou afiado demais. Ambiente clean e conversa boa. Recomendo.', n:'Rafael M.', r:'Cliente' },
  { s:5, q:'Levei meu filho pro primeiro corte. O Gui teve uma paciência absurda e ele saiu rindo.', n:'Juliana P.', r:'Mãe' },
  { s:5, q:'Box braid impecável, durou semanas sem soltar. Sabem o que fazem.', n:'Diego S.', r:'Cliente' },
  { s:5, q:'Barba com toalha quente é outro nível. Virou meu barbeiro fixo.', n:'André L.', r:'Cliente' },
  { s:5, q:'Horário certinho e acabamento de verdade. Sai sempre renovado.', n:'Marcos V.', r:'Cliente' },
  { s:5, q:'Fizeram desenho pro meu filho no aniversário, virou festa. Melhor da região.', n:'Camila R.', r:'Mãe' },
];

const WA = (svc) => `https://wa.me/5511972179204?text=${encodeURIComponent('Oi Gui! Quero agendar: ' + svc + '.')}`;

/* ---------- REVEAL ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold:.14 });
function observeReveals(){
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}

/* ---------- RENDER ---------- */
const grid = document.getElementById('serviceGrid');
const gallery = document.getElementById('gallery');
const quotes = document.getElementById('quotes');

function renderServices(cat='todos'){
  grid.innerHTML = SERVICES
    .filter(s => cat==='todos' || s.c===cat)
    .map(s => `
      <article class="card reveal">
        <div class="card-top"><h3>${s.n}</h3><span class="tag">${s.tag}</span></div>
        <p>${s.t}</p>
        <div class="card-foot">
          <div><div class="price">${s.p}</div><div class="time">${s.d}</div></div>
          <a class="book" href="${WA(s.n)}" target="_blank" rel="noopener">Agendar →</a>
        </div>
      </article>`).join('');
  observeReveals();
}

gallery.innerHTML = GALLERY.map(g => `
  <div class="gal reveal" data-tilt>
    <img class="ph" src="${g.img}" alt="${g.t} — ${g.s}" loading="lazy"
         onerror="this.style.display='none';this.parentElement.classList.add('noimg')">
    <div class="grad"></div>
    <div class="num">${g.n}</div>
    <div class="cap"><b>${g.t}</b><span>${g.s}</span></div>
  </div>`).join('');

quotes.innerHTML = QUOTES.map(q => `
  <div class="quote reveal">
    <div class="stars">${'★'.repeat(q.s)}</div>
    <p>“${q.q}”</p>
    <div class="who"><div class="av">${q.n[0]}</div><div><b>${q.n}</b><span>${q.r}</span></div></div>
  </div>`).join('');

renderServices();

/* ---------- FILTROS ---------- */
document.getElementById('filter').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if(!b) return;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
  b.classList.add('is-active');
  renderServices(b.dataset.cat);
});

/* ---------- NAV ---------- */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', e => { if(e.target.tagName==='A') navLinks.classList.remove('open'); });
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- TILT 3D ---------- */
function bindTilt(){
  document.querySelectorAll('[data-tilt]').forEach(el => {
    if(el.dataset.tiltBound) return; el.dataset.tiltBound = '1';
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateZ(12px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}
bindTilt();
const mo = new MutationObserver(bindTilt);
mo.observe(document.body, { childList:true, subtree:true });

/* ---------- FUNDO 3D: malha de partículas interativa ---------- */
(function(){
  const cv = document.getElementById('bg-3d');
  const ctx = cv.getContext('2d');
  let W, H, pts = [], mouse = { x:-999, y:-999 };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function size(){
    W = cv.width = innerWidth * devicePixelRatio;
    H = cv.height = innerHeight * devicePixelRatio;
    cv.style.width = innerWidth+'px'; cv.style.height = innerHeight+'px';
    build();
  }
  function build(){
    pts = [];
    const n = Math.min(90, Math.floor(innerWidth * innerHeight / 22000));
    for(let i=0;i<n;i++){
      pts.push({
        x: Math.random()*W, y: Math.random()*H,
        vx:(Math.random()-.5)*.25*devicePixelRatio,
        vy:(Math.random()-.5)*.25*devicePixelRatio,
        r: (Math.random()*1.6+.6)*devicePixelRatio
      });
    }
  }
  addEventListener('pointermove', e => { mouse.x = e.clientX*devicePixelRatio; mouse.y = e.clientY*devicePixelRatio; });
  addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });
  addEventListener('resize', size);

  function draw(){
    ctx.clearRect(0,0,W,H);
    const gold = '233,185,73';
    for(const p of pts){
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>W) p.vx*=-1;
      if(p.y<0||p.y>H) p.vy*=-1;
      const dm = Math.hypot(p.x-mouse.x, p.y-mouse.y);
      const near = dm < 160*devicePixelRatio;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,7);
      ctx.fillStyle = `rgba(${gold},${near?.9:.35})`;
      ctx.fill();
    }
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const a=pts[i], b=pts[j];
        const d=Math.hypot(a.x-b.x,a.y-b.y);
        const max=150*devicePixelRatio;
        if(d<max){
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(${gold},${(1-d/max)*.16})`;
          ctx.lineWidth=devicePixelRatio;
          ctx.stroke();
        }
      }
    }
    // linha até o mouse
    for(const p of pts){
      const d=Math.hypot(p.x-mouse.x,p.y-mouse.y);
      if(d<180*devicePixelRatio){
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y);
        ctx.strokeStyle=`rgba(255,138,61,${(1-d/(180*devicePixelRatio))*.35})`;
        ctx.lineWidth=devicePixelRatio; ctx.stroke();
      }
    }
    if(!reduce) requestAnimationFrame(draw);
  }
  size(); draw();
})();
