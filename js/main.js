// English lives in the HTML; Dutch translations are swapped in by key.
const nl = {
  "skip": "Naar de inhoud",

  "nav.about": "Over mij",
  "nav.services": "Diensten",
  "nav.work": "Werk",
  "nav.fitness": "Fitness",
  "nav.contact": "Contact",

  "hero.status": "Beschikbaar voor stages &amp; freelance projecten",
  "hero.title": "Hoi, ik ben <span class=\"accent\">Daan</span>.<br>Ik bouw strakke, snelle websites &amp; apps.",
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
  "work.text": "Er komen nieuwe projecten aan. Binnenkort zie je hier waar ik aan heb gewerkt.",
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
langToggle.addEventListener("click", () => {
  setLang(document.documentElement.lang === "en" ? "nl" : "en");
});

setLang(localStorage.getItem("lang") || "en");
document.getElementById("year").textContent = new Date().getFullYear();
