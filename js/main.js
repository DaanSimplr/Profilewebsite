// English lives in the HTML; Dutch translations are swapped in by key.
const nl = {
  "skip": "Naar de inhoud",

  "nav.about": "Over mij",
  "nav.services": "Diensten",
  "nav.work": "Werk",
  "nav.fitness": "Fitness",
  "nav.contact": "Contact",

  "hero.status": "Beschikbaar voor stages &amp; freelance projecten",
  "hero.title1": "Hoi, ik ben <span class=\"accent\">Daan</span>.",
  "hero.title2": "Ik bouw strakke, snelle websites &amp; apps.",
  "hero.meta": "4e-jaars ICT-student · Web- &amp; appontwikkeling · Nederland",
  "hero.cta1": "Neem contact op",
  "hero.cta2": "Meer over mij",

  "about.title": "Over mij",
  "about.lead": "Ik ben een 21-jarige ICT-student in mijn vierde jaar, gericht op web- en appontwikkeling.",
  "about.p1": "Ik vind het leuk om ideeën om te zetten in dingen die mensen graag gebruiken: interfaces die simpel aanvoelen, code die leesbaar blijft en producten die snel laden. Ik let op de details, want daar zit meestal het verschil.",
  "about.p2": "Buiten het programmeren vind je me in de sportschool. Daar geldt dezelfde mindset: consequent blijven, vooruitgang meten en stap voor stap beter worden.",

  "services.title": "Wat ik doe",
  "services.web.title": "Websites",
  "services.web.text": "Responsive, toegankelijke websites die er op elk scherm goed uitzien en makkelijk te onderhouden zijn.",
  "services.webapp.title": "Webapplicaties",
  "services.webapp.text": "Interactieve tools en dashboards, van de interface tot de logica erachter.",
  "services.app.title": "Mobiele apps",
  "services.app.text": "Apps met een duidelijke flow en een strak ontwerp, gebouwd rond wat de gebruiker nodig heeft.",

  "work.title": "Projecten",
  "work.tag": "// in ontwikkeling",
  "work.text": "Het volgende project is onderweg.",
  "work.p1.kind": "Conceptwebsite · fictief bedrijf",
  "work.p1.text": "Een concept dat ik heb ontworpen en gebouwd voor een verzonnen autobedrijf, geen echt bedrijf. Bezoekers kunnen auto's bekijken om te kopen, huren of leasen, het aanbod doorzoeken en filteren, en wisselen tussen Nederlands en Engels.",
  "work.live": "Live website",
  "work.link": "Heb je een project in gedachten? Laten we praten →",

  "bg.title": "Achtergrond",
  "bg.edu.when": "2022 — nu",
  "bg.edu.title": "HBO-ICT",
  "bg.edu.place": "Hogeschool Utrecht · Web- &amp; appontwikkeling",
  "bg.exp.title": "Stagiair / Backend",
  "bg.exp.place": 'Politiedienstencentrum · Stage gelopen bij team Triton in "programma vernieuwend registreren" en in dit team een bijdrage geleverd aan het bouwen van een nieuwe backend.',
  "bg.experiences": "Ervaring",

  "fit.title": "Naast het scherm",
  "fit.lead": "Gewichtheffen is waar ik oplaad, en waar ik het meest over discipline heb geleerd.",
  "fit.p1": "Trainen heeft me geleerd dat resultaat komt van kleine, consequente stappen in plaats van grote sprongen. Die aanpak neem ik mee in mijn werk.",
  "fit.p2": "Ik vind het ook echt leuk om anderen te helpen met hun training. Of je net begint of vastzit op een plateau, ik deel graag wat ik heb geleerd.",
  "fit.pillar1": "Consistentie boven intensiteit",
  "fit.pillar2": "Vooruitgang die je kunt meten",
  "fit.pillar3": "Altijd bereid om te helpen",

  "car.title": "Droomauto",
  "car.lead": "Mitsubishi 3000GT VR-4. Mijn droomauto.",
  "car.p1": "Techniek uit de jaren 90 die zijn tijd ver vooruit was.",
  "car.spec1": "Twin turbo's",
  "car.spec2": "Vierwielaandrijving",
  "car.spec3": "Vierwielbesturing",
  "car.spec4": "Actieve aerodynamica",

  "contact.title": "Contact",
  "contact.big": "Laten we samen iets <span class=\"accent\">bouwen</span>.",
  "contact.text": "Stage, freelance project of gewoon een vraag? Stuur me een bericht.",
};

const nodes = document.querySelectorAll("[data-i18n]");
const en = {};
nodes.forEach((el) => { en[el.dataset.i18n] = el.innerHTML; });

function setLang(lang) {
  const dict = lang === "nl" ? nl : en;
  nodes.forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-toggle [data-lang]").forEach((s) => {
    s.classList.toggle("active", s.dataset.lang === lang);
  });
  langToggle.setAttribute("aria-label", lang === "nl"
    ? "Taal: Nederlands. Wissel naar Engels"
    : "Language: English. Switch to Dutch");
  localStorage.setItem("lang", lang);
}

const langToggle = document.getElementById("langToggle");
setLang(localStorage.getItem("lang") || "en");
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Motion ----------
// Every effect is a transition between two states: arriving, leaving,
// switching. Nothing moves just to move. With reduced motion the page is static.
const root = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";
const EASE_IN_OUT = "cubic-bezier(.65, 0, .35, 1)";
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const inView = (el) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight && r.width > 0;
};

// Split text into words, each inside its own mask. Nested markup like
// the accent span is kept; its text is split too. Screen readers get one
// plain copy of the text; the animated words are hidden from them.
function splitWords(el) {
  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = el.textContent.trim().replace(/\s+/g, " ");
  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  visual.append(...el.childNodes);
  el.append(label, visual);
  splitVisual(visual);
  el.querySelectorAll(".w").forEach((w, i) => w.style.setProperty("--wi", i));
}

function splitVisual(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (!part.trim()) { frag.append(" "); return; }
          const word = document.createElement("span");
          const inner = document.createElement("span");
          word.className = "w";
          inner.className = "w__in";
          inner.textContent = part;
          word.append(inner);
          frag.append(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
        walk(child);
      }
    });
  };
  walk(el);
}
const splitAll = () => document.querySelectorAll("[data-split]").forEach(splitWords);
splitAll();

// Offset & delay: children of a stagger group get an index that drives their delay.
document.querySelectorAll("[data-stagger]").forEach((group) => {
  [...group.children].forEach((child, i) => {
    child.dataset.reveal ||= group.dataset.stagger;
    child.style.setProperty("--i", i);
  });
});

function startReveals() {
  const targets = document.querySelectorAll("[data-reveal], [data-split='rise']");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }
  // A wiped element starts fully clipped, which IntersectionObserver
  // counts as invisible, so its parent is watched instead.
  const watch = new Map();
  targets.forEach((el) => {
    const key = el.dataset.reveal === "wipe" ? el.parentElement : el;
    watch.set(key, [...(watch.get(key) ?? []), el]);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      watch.get(entry.target).forEach((el) => el.classList.add("is-in"));
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  watch.forEach((_, key) => io.observe(key));
}

// ---------- Intro: count to 100, then the panel lifts off ----------
const loader = document.querySelector(".loader");
if (!root.classList.contains("has-intro")) {
  loader.remove();
  startReveals();
} else {
  sessionStorage.setItem("intro", "1");
  const count = loader.querySelector(".loader__count");
  const start = performance.now();
  const tick = (now) => {
    const t = clamp((now - start) / 1300);
    count.textContent = Math.round((1 - (1 - t) ** 3) * 100);
    if (t < 1) { requestAnimationFrame(tick); return; }
    loader.classList.add("loader--done");
    setTimeout(startReveals, 450);    setTimeout(() => { loader.remove(); root.classList.remove("has-intro"); }, 1500);
  };
  requestAnimationFrame(tick);
}

// ---------- Language switch: words drop out, the new language rises in ----------
let switching = false;
langToggle.addEventListener("click", async () => {
  const next = root.lang === "en" ? "nl" : "en";
  if (reduceMotion) { setLang(next); splitAll(); return; }
  if (switching) return;
  switching = true;

  const visible = [...nodes].filter(inView);
  const out = visible.flatMap((el) => el.matches("[data-split]")
    ? [...el.querySelectorAll(".w__in")].map((w, i) => w.animate(
        [{ transform: "none" }, { transform: "translateY(-110%)" }],
        { duration: 450, delay: i * 18, easing: EASE_IN_OUT, fill: "forwards" }))
    : [el.animate(
        [{ opacity: 1, filter: "blur(0)" }, { opacity: 0, filter: "blur(10px)" }],
        { duration: 380, easing: EASE_IN_OUT, fill: "forwards" })]);
  await Promise.all(out.map((a) => a.finished));

  setLang(next);
  splitAll();

  visible.forEach((el) => {
    el.getAnimations().forEach((a) => a.cancel());
    if (el.matches("[data-split]")) {
      el.querySelectorAll(".w__in").forEach((w, i) => w.animate(
        [{ transform: "translateY(110%) rotate(8deg)" }, { transform: "none" }],
        { duration: 1000, delay: i * 30, easing: EASE_OUT, fill: "backwards" }));
    } else {
      el.animate(
        [{ opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0)" }],
        { duration: 700, easing: EASE_OUT });
    }
  });
  switching = false;
});

// ---------- Section jumps: a curtain sweeps over, the page moves behind it ----------
const curtain = document.querySelector(".curtain");
const curtainNum = curtain.querySelector(".curtain__num");
const curtainLabel = curtain.querySelector(".curtain__label");
let travelling = false;

document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach((link) => {
  link.addEventListener("click", async (e) => {
    const hash = link.getAttribute("href");
    const target = document.querySelector(hash);
    if (!target || reduceMotion) return;
    e.preventDefault();
    if (travelling) return;
    travelling = true;

    const isSection = target.matches("section");
    curtainNum.textContent = isSection ? target.querySelector(".section__num").textContent : "00";
    curtainLabel.textContent = isSection ? target.querySelector("h2 .sr-only").textContent : "daan.dev";
    curtain.classList.add("curtain--in");
    await wait(1050);

    const top = target.getBoundingClientRect().top + scrollY - 64;
    scrollTo({ top: Math.max(0, top), behavior: "instant" });
    history.pushState(null, "", hash);
    // Move focus along, like a native anchor jump would.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });

    curtain.classList.add("curtain--out");
    await wait(1000);
    curtain.classList.remove("curtain--in", "curtain--out");
    travelling = false;
  });
});

// ---------- Scroll-linked: progress, nav, hero hand-off, scrubbed text, zoom ----------
const nav = document.querySelector(".nav");
const progress = document.querySelector(".nav__progress");
const hero = document.querySelector(".hero");
const heroInner = document.querySelector(".hero__inner");
const cssScrollFx = CSS.supports("animation-timeline: scroll()");
const scrubEls = document.querySelectorAll("[data-split='scrub']");
const zoomEls = document.querySelectorAll("[data-zoom]");
let lastY = scrollY;

// Dream car: the 3000GT drives across the street as you scroll past the box,
// and stops when you stop. Its x position is relative to the street scene,
// which is wider than the visible area when the photo is cropped.
// Everything here is skipped while the section is disabled (not on the page).
const driveMedia = document.querySelector(".drive__media");
const driveScene = driveMedia?.querySelector(".drive__scene");
const driveCar = driveMedia?.querySelector(".drive__car");
const driveWheels = driveMedia?.querySelectorAll(".drive__wheel");
let driveX = null;

// Give the CSS the street area's real size, so the photo can "cover" it.
if (driveMedia) {
  new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    driveMedia.style.setProperty("--mw", `${width}px`);
    driveMedia.style.setProperty("--mh", `${height}px`);
    if (reduceMotion) parkCar();
  }).observe(driveMedia);
}

function driveRange() {
  const sceneLeft = (driveMedia.clientWidth - driveScene.offsetWidth) / 2;
  const carW = driveCar.offsetWidth;
  return {
    start: -sceneLeft - carW * 1.05,                       // fully off the left
    end: driveMedia.clientWidth - sceneLeft + carW * 0.05,  // fully off the right
    parked: driveMedia.clientWidth * 0.36 - sceneLeft,
  };
}

function placeCar(x, start) {
  driveCar.style.transform = `translate3d(${x}px, 0, 0)`;
  // Wheels roll without slipping: angle = distance / radius.
  const r = driveWheels[0].offsetWidth / 2 || 1;
  const deg = ((x - start) / r) * (180 / Math.PI);
  driveWheels.forEach((w) => { w.style.transform = `rotate(${deg}deg)`; });
}

function driveFrame() {
  const r = driveMedia.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return;
  const { start, end } = driveRange();
  // 0 when the street enters at the bottom of the screen, 1 when it leaves at the top;
  // the car crosses between 10% and 90% of that.
  const p = clamp((innerHeight - r.top) / (innerHeight + r.height));
  const target = start + (end - start) * clamp((p - 0.1) / 0.8);
  driveX = driveX === null ? target : driveX + (target - driveX) * 0.12;
  placeCar(driveX, start);
  driveParallax(p);
}

// Parallax: the scene (street + car, so the car stays on the road) drifts down
// as you scroll, so it moves up slower than the page and feels further away.
// The photo itself pans left while the car drives right, like a camera
// following it. Both are limited so the photo's edges never come into view.
const driveStreet = driveMedia?.querySelector(".drive__street");
function driveParallax(p) {
  const mediaH = driveMedia.clientHeight;
  const top = driveScene.offsetTop;
  const sceneH = driveScene.offsetHeight;
  const y = clamp((p - 0.5) * 2 * mediaH * 0.12, mediaH - sceneH - top, -top);
  driveScene.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;

  const roomX = (driveScene.offsetWidth - driveMedia.clientWidth) / 2;
  const x = (0.5 - p) * 2 * roomX * 0.9;
  driveStreet.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
}

// With reduced motion the car is simply parked on the street.
function parkCar() {
  const { start, parked } = driveRange();
  placeCar(parked, start);
}

function frame() {
  const y = scrollY;
  const max = root.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

  if (Math.abs(y - lastY) > 4) {
    nav.classList.toggle("nav--hidden", y > lastY && y > 200);
    lastY = y;
  }

  if (!reduceMotion) {
    // The hero sinks back and fades while the next section slides over it.
    // Browsers with scroll-driven animations do this in CSS instead.
    if (!cssScrollFx && y < hero.offsetHeight * 1.2) {
      const p = clamp(y / hero.offsetHeight);
      heroInner.style.transform = `translate3d(0, ${y * 0.5}px, 0) scale(${1 - p * 0.12})`;
      heroInner.style.opacity = 1 - p * 1.2;
    }

    // Lead sentences light up word by word as they scroll through the viewport.
    scrubEls.forEach((el) => {
      if (!inView(el)) return;
      const p = clamp((innerHeight * 0.85 - el.getBoundingClientRect().top) / (innerHeight * 0.5));
      const words = el.querySelectorAll(".w");
      words.forEach((w, i) => {
        w.style.opacity = 0.15 + 0.85 * clamp(p * words.length - i);
      });
    });

    // The dark section opens up from an inset, rounded window.
    zoomEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      el.style.setProperty("--p", clamp((innerHeight - top) / (innerHeight * 0.8)).toFixed(3));
    });

    if (driveMedia) driveFrame();
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if (finePointer && !reduceMotion) {
  // Cards tilt toward the pointer, with a spotlight following it.
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  // Magnetic buttons lean toward the cursor.
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--tx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
      el.style.setProperty("--ty", `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    });
  });
}
