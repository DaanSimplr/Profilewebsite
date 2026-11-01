/* =============================================================================
   daan.dev — scripts

   Contents
     1.  Dutch translations
     2.  Language switching (EN / NL)
     3.  Settings and small helpers
     4.  Split text (word-by-word animation)
     5.  Reveals (elements animating in on scroll)
     6.  Intro loader
     7.  Animated language switch
     8.  Curtain (transition when clicking a link to a section)
     9.  Dream car (only runs while that section is enabled)
     10. Scroll loop (progress bar, nav, hero, scrubbed text, zoom)
     11. Pointer effects (card tilt, magnetic buttons)

   Labels used in comments (search for them):
     [A11y]        Accessibility: screen readers, keyboard use, reduced motion.
     [Responsive]  Adapts to different screen sizes.
   ========================================================================== */


/* =============================================================================
   1. Dutch translations
   The English text lives in the HTML. Every element with data-i18n="key"
   gets the Dutch text with the same key when the language is switched.
   Values may contain HTML (like the accent span), so use &amp; for "&".
   ========================================================================== */

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

  // Dream car section (currently disabled in index.html)
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


/* =============================================================================
   2. Language switching (EN / NL)
   ========================================================================== */

const translatable = document.querySelectorAll("[data-i18n]");
const langToggle = document.getElementById("langToggle");

// Save the English text from the HTML before anything changes it,
// so we can switch back to it.
const en = {};
translatable.forEach((el) => {
  en[el.dataset.i18n] = el.innerHTML;
});

function setLang(lang) {
  const dict = lang === "nl" ? nl : en;
  translatable.forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text !== undefined) el.innerHTML = text;
  });

  // [A11y] Tells screen readers which language to pronounce the page in.
  document.documentElement.lang = lang;

  // Highlight the active language in the EN / NL button.
  document.querySelectorAll(".lang-toggle [data-lang]").forEach((label) => {
    label.classList.toggle("active", label.dataset.lang === lang);
  });

  // [A11y] Describe the button in the current language for screen readers.
  langToggle.setAttribute("aria-label", lang === "nl"
    ? "Taal: Nederlands. Wissel naar Engels"
    : "Language: English. Switch to Dutch");

  // Remember the choice for the next visit.
  localStorage.setItem("lang", lang);
}

setLang(localStorage.getItem("lang") || "en");
document.getElementById("year").textContent = new Date().getFullYear();


/* =============================================================================
   3. Settings and small helpers
   Every effect below is a transition between two states: arriving, leaving,
   switching. Nothing moves just to move.
   ========================================================================== */

const root = document.documentElement;

// [A11y] Visitors can ask their system for less motion. When they do, all
// animations below are skipped and the page is simply shown.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Effects that follow the cursor only make sense with a mouse, not on touch screens.
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

// Same curves as --ease-out / --ease-in-out in the CSS.
const EASE_OUT = "cubic-bezier(.16, 1, .3, 1)";
const EASE_IN_OUT = "cubic-bezier(.65, 0, .35, 1)";

const NAV_HEIGHT = 64;   // px, same as .nav__inner in the CSS

// Keep a number between min and max (default 0 and 1).
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

// Wait a number of milliseconds (use with await).
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Is (part of) the element on screen right now?
const inView = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < innerHeight && rect.width > 0;
};


/* =============================================================================
   4. Split text
   Turns the text of every data-split element into separate words, each in
   its own mask, so they can animate one by one:
     <span class="w"><span class="w__in">word</span></span>
   Nested markup (like the accent span) is kept; its text is split too.

   [A11y] Screen readers would read the separate words choppily, so they get
   one plain copy of the text (.sr-only) and the animated words are hidden
   from them (aria-hidden).
   ========================================================================== */

function splitWords(el) {
  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = el.textContent.trim().replace(/\s+/g, " ");

  const visual = document.createElement("span");
  visual.setAttribute("aria-hidden", "true");
  visual.append(...el.childNodes);

  el.append(label, visual);
  splitVisual(visual);

  // Number the words; the CSS uses --wi to delay each word a bit more.
  el.querySelectorAll(".w").forEach((word, i) => word.style.setProperty("--wi", i));
}

function splitVisual(el) {
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        // Replace the text with one masked span per word, keeping the spaces.
        const fragment = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (!part.trim()) {
            fragment.append(" ");
            return;
          }
          const word = document.createElement("span");
          const inner = document.createElement("span");
          word.className = "w";
          inner.className = "w__in";
          inner.textContent = part;
          word.append(inner);
          fragment.append(word);
        });
        child.replaceWith(fragment);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
        walk(child);
      }
    });
  };
  walk(el);
}

const splitAll = () => document.querySelectorAll("[data-split]").forEach(splitWords);
splitAll();


/* =============================================================================
   5. Reveals
   Elements with data-reveal (and data-split="rise") get the class .is-in when
   they scroll into view; the CSS then animates them in.
   ========================================================================== */

// data-stagger: give every child data-reveal and an index (--i), so they
// appear one after another instead of all at once.
document.querySelectorAll("[data-stagger]").forEach((group) => {
  [...group.children].forEach((child, i) => {
    child.dataset.reveal ||= group.dataset.stagger;
    child.style.setProperty("--i", i);
  });
});

function startReveals() {
  const targets = document.querySelectorAll("[data-reveal], [data-split='rise']");

  // [A11y] With reduced motion (or in old browsers) show everything right away.
  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-in"));
    return;
  }

  // A "wipe" element starts fully clipped, which IntersectionObserver counts
  // as invisible, so its parent is watched instead.
  const watched = new Map();   // watched element -> elements to reveal
  targets.forEach((el) => {
    const key = el.dataset.reveal === "wipe" ? el.parentElement : el;
    watched.set(key, [...(watched.get(key) ?? []), el]);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      watched.get(entry.target).forEach((el) => el.classList.add("is-in"));
      observer.unobserve(entry.target);   // animate in only once
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

  watched.forEach((_, el) => observer.observe(el));
}


/* =============================================================================
   6. Intro loader
   Counts from 0 to 100, then the panel lifts off and the page reveals start.
   Only when the script in <head> added "has-intro" (first visit of a session,
   and [A11y] never with reduced motion).
   ========================================================================== */

const loader = document.querySelector(".loader");

if (!root.classList.contains("has-intro")) {
  loader.remove();
  startReveals();
} else {
  sessionStorage.setItem("intro", "1");   // don't show it again this session

  const count = loader.querySelector(".loader__count");
  const startTime = performance.now();

  const tick = (now) => {
    const t = clamp((now - startTime) / 1300);
    count.textContent = Math.round((1 - (1 - t) ** 3) * 100);   // eases out: fast at first, slow at the end
    if (t < 1) {
      requestAnimationFrame(tick);
      return;
    }
    loader.classList.add("loader--done");   // the CSS lifts the panel away
    setTimeout(startReveals, 450);
    setTimeout(() => {
      loader.remove();
      root.classList.remove("has-intro");
    }, 1500);
  };
  requestAnimationFrame(tick);
}


/* =============================================================================
   7. Animated language switch
   The words on screen drop out of their masks, the text is swapped, and the
   new words rise in. Other text blurs out and back in.
   ========================================================================== */

let switching = false;   // ignore clicks while a switch is still animating

langToggle.addEventListener("click", async () => {
  const next = root.lang === "en" ? "nl" : "en";

  // [A11y] Reduced motion: swap the text instantly.
  if (reduceMotion) {
    setLang(next);
    splitAll();
    return;
  }
  if (switching) return;
  switching = true;

  // 1. Animate out what's visible (off-screen text is just swapped).
  const visible = [...translatable].filter(inView);
  const outAnimations = visible.flatMap((el) => el.matches("[data-split]")
    ? [...el.querySelectorAll(".w__in")].map((word, i) => word.animate(
        [{ transform: "none" }, { transform: "translateY(-110%)" }],
        { duration: 450, delay: i * 18, easing: EASE_IN_OUT, fill: "forwards" }))
    : [el.animate(
        [{ opacity: 1, filter: "blur(0)" }, { opacity: 0, filter: "blur(10px)" }],
        { duration: 380, easing: EASE_IN_OUT, fill: "forwards" })]);
  await Promise.all(outAnimations.map((animation) => animation.finished));

  // 2. Swap the text.
  setLang(next);
  splitAll();

  // 3. Animate the new text in.
  visible.forEach((el) => {
    el.getAnimations().forEach((animation) => animation.cancel());
    if (el.matches("[data-split]")) {
      el.querySelectorAll(".w__in").forEach((word, i) => word.animate(
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


/* =============================================================================
   8. Curtain
   Clicking a link to a section on this page: a curtain sweeps over the screen
   showing the section's number and title, the page jumps behind it, and the
   curtain leaves again.
   ========================================================================== */

const curtain = document.querySelector(".curtain");
const curtainNum = curtain.querySelector(".curtain__num");
const curtainLabel = curtain.querySelector(".curtain__label");
let travelling = false;   // ignore clicks while the curtain is moving

// The skip link is excluded: [A11y] it must jump instantly.
document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach((link) => {
  link.addEventListener("click", async (event) => {
    const hash = link.getAttribute("href");
    const target = document.querySelector(hash);

    // [A11y] With reduced motion the browser's normal jump is used.
    if (!target || reduceMotion) return;
    event.preventDefault();
    if (travelling) return;
    travelling = true;

    // Fill in the curtain: the section's number and title (the logo link goes to the top).
    const isSection = target.matches("section");
    curtainNum.textContent = isSection ? target.querySelector(".section__num").textContent : "00";
    curtainLabel.textContent = isSection ? target.querySelector("h2 .sr-only").textContent : "daan.dev";

    // 1. Curtain in.
    curtain.classList.add("curtain--in");
    await wait(1050);

    // 2. Jump behind the curtain, just below the sticky nav.
    const top = target.getBoundingClientRect().top + scrollY - NAV_HEIGHT;
    scrollTo({ top: Math.max(0, top), behavior: "instant" });
    history.pushState(null, "", hash);

    // [A11y] Move keyboard / screen reader focus to the section, like a
    // normal link jump would. tabindex="-1" makes a section focusable.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });

    // 3. Curtain out.
    curtain.classList.add("curtain--out");
    await wait(1000);
    curtain.classList.remove("curtain--in", "curtain--out");
    travelling = false;
  });
});


/* =============================================================================
   9. Dream car
   The car drives across the street as you scroll past the box, and stops
   when you stop. Its x position is relative to the street scene, which is
   wider than the visible area when the photo is cropped.
   Everything here is skipped while the section is disabled (not on the page).
   ========================================================================== */

const driveMedia = document.querySelector(".drive__media");
const driveScene = driveMedia?.querySelector(".drive__scene");
const driveStreet = driveMedia?.querySelector(".drive__street");
const driveCar = driveMedia?.querySelector(".drive__car");
const driveWheels = driveMedia?.querySelectorAll(".drive__wheel");
let driveX = null;   // current car position (px), eased toward the target

// [Responsive] Give the CSS the street area's real size, so the photo can
// "cover" it at any screen size.
if (driveMedia) {
  new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect;
    driveMedia.style.setProperty("--mw", `${width}px`);
    driveMedia.style.setProperty("--mh", `${height}px`);
    if (reduceMotion) parkCar();
  }).observe(driveMedia);
}

// Where the car starts, ends and parks (px, relative to the scene).
function driveRange() {
  const sceneLeft = (driveMedia.clientWidth - driveScene.offsetWidth) / 2;
  const carWidth = driveCar.offsetWidth;
  return {
    start: -sceneLeft - carWidth * 1.05,                        // fully off the left
    end: driveMedia.clientWidth - sceneLeft + carWidth * 0.05,  // fully off the right
    parked: driveMedia.clientWidth * 0.36 - sceneLeft,
  };
}

function placeCar(x, start) {
  driveCar.style.transform = `translate3d(${x}px, 0, 0)`;

  // Wheels roll without slipping: angle = distance / radius.
  const radius = driveWheels[0].offsetWidth / 2 || 1;
  const degrees = ((x - start) / radius) * (180 / Math.PI);
  driveWheels.forEach((wheel) => {
    wheel.style.transform = `rotate(${degrees}deg)`;
  });
}

function driveFrame() {
  const rect = driveMedia.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > innerHeight) return;   // off screen

  // p: 0 when the street enters at the bottom of the screen, 1 when it leaves
  // at the top. The car crosses between 10% and 90% of that.
  const { start, end } = driveRange();
  const p = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
  const target = start + (end - start) * clamp((p - 0.1) / 0.8);

  // Ease toward the target, so the car glides instead of jumping with the scroll.
  driveX = driveX === null ? target : driveX + (target - driveX) * 0.12;
  placeCar(driveX, start);
  driveParallax(p);
}

// Parallax: the scene (street + car, so the car stays on the road) drifts down
// as you scroll, so it moves up slower than the page and feels further away.
// The photo itself pans left while the car drives right, like a camera
// following it. Both are limited so the photo's edges never come into view.
function driveParallax(p) {
  const mediaHeight = driveMedia.clientHeight;
  const sceneTop = driveScene.offsetTop;
  const sceneHeight = driveScene.offsetHeight;
  const y = clamp((p - 0.5) * 2 * mediaHeight * 0.12, mediaHeight - sceneHeight - sceneTop, -sceneTop);
  driveScene.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;

  const roomX = (driveScene.offsetWidth - driveMedia.clientWidth) / 2;
  const x = (0.5 - p) * 2 * roomX * 0.9;
  driveStreet.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
}

// [A11y] With reduced motion the car is simply parked on the street.
function parkCar() {
  const { start, parked } = driveRange();
  placeCar(parked, start);
}


/* =============================================================================
   10. Scroll loop
   Runs every frame and updates everything that follows the scroll position.
   ========================================================================== */

const nav = document.querySelector(".nav");
const progressBar = document.querySelector(".nav__progress");
const hero = document.querySelector(".hero");
const heroInner = document.querySelector(".hero__inner");
const scrubTexts = document.querySelectorAll("[data-split='scrub']");
const zoomSections = document.querySelectorAll("[data-zoom]");

// Browsers that support scroll-driven animations do the hero in CSS (smoother).
const cssScrollFx = CSS.supports("animation-timeline: scroll()");

let lastScrollY = scrollY;

function frame() {
  const y = scrollY;

  // Progress bar under the nav: 0 at the top, full width at the bottom.
  const maxScroll = root.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${maxScroll > 0 ? y / maxScroll : 0})`;

  // Hide the nav while scrolling down, show it again when scrolling up.
  // (4px tolerance, so tiny movements don't make it flicker.)
  if (Math.abs(y - lastScrollY) > 4) {
    nav.classList.toggle("nav--hidden", y > lastScrollY && y > 200);
    lastScrollY = y;
  }

  // [A11y] Everything below is motion, skipped with reduced motion.
  if (!reduceMotion) {
    // Hero sinks back and fades while the next section slides over it
    // (only for browsers that can't do it in CSS).
    if (!cssScrollFx && y < hero.offsetHeight * 1.2) {
      const p = clamp(y / hero.offsetHeight);
      heroInner.style.transform = `translate3d(0, ${y * 0.5}px, 0) scale(${1 - p * 0.12})`;
      heroInner.style.opacity = 1 - p * 1.2;
    }

    // Lead sentences light up word by word as they scroll through the screen.
    scrubTexts.forEach((el) => {
      if (!inView(el)) return;
      const p = clamp((innerHeight * 0.85 - el.getBoundingClientRect().top) / (innerHeight * 0.5));
      const words = el.querySelectorAll(".w");
      words.forEach((word, i) => {
        word.style.opacity = 0.15 + 0.85 * clamp(p * words.length - i);
      });
    });

    // Dark sections open up from an inset, rounded window: --p goes 0 -> 1.
    zoomSections.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      el.style.setProperty("--p", clamp((innerHeight - top) / (innerHeight * 0.8)).toFixed(3));
    });

    if (driveMedia) driveFrame();
  }

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);


/* =============================================================================
   11. Pointer effects
   Only with a mouse (not on touch screens) and [A11y] not with reduced motion.
   ========================================================================== */

if (finePointer && !reduceMotion) {
  // Cards tilt toward the cursor, with a spotlight following it.
  // The CSS reads --rx / --ry (tilt) and --mx / --my (spotlight position).
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;    // 0 = left edge, 1 = right edge
      const y = (event.clientY - rect.top) / rect.height;    // 0 = top, 1 = bottom
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

  // Magnetic buttons lean toward the cursor. The CSS reads --tx / --ty.
  document.querySelectorAll("[data-magnetic]").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--tx", `${(event.clientX - rect.left - rect.width / 2) * 0.25}px`);
      button.style.setProperty("--ty", `${(event.clientY - rect.top - rect.height / 2) * 0.35}px`);
    });
    button.addEventListener("pointerleave", () => {
      button.style.setProperty("--tx", "0px");
      button.style.setProperty("--ty", "0px");
    });
  });
}
