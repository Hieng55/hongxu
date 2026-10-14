const hotspotData = [
  { id: "forehead", x: 50, y: 30, title: "Fine Lines & Wrinkles", description: "Explore aesthetic treatments that may help soften the appearance of forehead lines and expression wrinkles.", treatment: "Botox Consultation" },
  { id: "under-eye", x: 64, y: 47, title: "Under-Eye Concerns", description: "Discover personalized consultations for concerns related to the delicate under-eye area.", treatment: "Facial Aesthetic Consultation" },
  { id: "cheek", x: 73, y: 56, title: "Facial Volume", description: "Explore options for restoring facial balance and addressing age-related volume changes.", treatment: "Dermal Fillers" },
  { id: "smile-lines", x: 63, y: 61.5, title: "Smile Lines", description: "Learn about personalized aesthetic options for softening the appearance of facial folds.", treatment: "Dermal Filler Consultation" },
  { id: "jawline", x: 65.5, y: 73, title: "Facial Contour", description: "Discover aesthetic consultations focused on facial balance, proportion, and definition.", treatment: "Facial Contouring Consultation" },
  { id: "skin-texture", region: "cheek", x: 31, y: 59, title: "Skin Texture & Radiance", description: "Explore professional skincare and facial treatments designed to support healthier-looking skin.", treatment: "Professional Facials" }
];

const hero = document.querySelector(".hero");
const portraitSystem = document.querySelector("#portrait-system");
const layer = document.querySelector("#hotspot-layer");
const card = document.querySelector("#insight-card");
const connector = document.querySelector("#connector");
const mobileCard = document.querySelector("#mobile-insight");
let activeId = null;
let hoverId = null;

hotspotData.forEach((item, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "hotspot";
  button.dataset.id = item.id;
  button.style.left = `${item.x}%`;
  button.style.top = `${item.y}%`;
  button.style.setProperty("--delay", `${2.65 + index * .12}s`);
  button.setAttribute("aria-label", `Explore ${item.title}`);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<span class="hotspot-core" aria-hidden="true"></span>';

  button.addEventListener("mouseenter", () => {
    hoverId = item.id;
    if (!activeId) showInsight(item, button, false);
  });
  button.addEventListener("mouseleave", () => {
    hoverId = null;
    if (!activeId) hideInsight();
  });
  button.addEventListener("focus", () => {
    if (!activeId) showInsight(item, button, false);
  });
  button.addEventListener("blur", () => {
    if (!activeId && !hoverId) hideInsight();
  });
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    if (activeId === item.id) {
      activeId = null;
      hideInsight();
      return;
    }
    activeId = item.id;
    showInsight(item, button, true);
  });
  layer.appendChild(button);
});

function fillInsight(item) {
  card.querySelector("#insight-index").textContent = String(hotspotData.indexOf(item) + 1).padStart(2, "0");
  card.querySelector("#insight-title").textContent = item.title;
  card.querySelector("#insight-description").textContent = item.description;
  card.querySelector("#insight-treatment b").textContent = item.treatment;
  mobileCard.innerHTML = `
    <div class="mobile-top"><span>${String(hotspotData.indexOf(item) + 1).padStart(2, "0")} / Aesthetic insight</span><span>Illustrative</span></div>
    <h2>${item.title}</h2>
    <p>${item.description}</p>
    <a href="#consultation"><span>${item.treatment}</span><span>↗</span></a>`;
}

function showInsight(item, trigger, locked) {
  fillInsight(item);
  document.querySelectorAll(".hotspot").forEach((node) => {
    const selected = node.dataset.id === item.id;
    node.classList.toggle("is-active", selected);
    node.setAttribute("aria-expanded", selected ? "true" : "false");
  });
  layer.classList.add("has-active");
  document.querySelectorAll(".mesh-lines").forEach((region) => {
    const selected = region.dataset.region === (item.region || item.id);
    region.classList.toggle("is-active", selected);
    region.classList.toggle("is-muted", !selected);
  });

  if (window.matchMedia("(max-width: 700px)").matches) {
    mobileCard.hidden = false;
    card.hidden = true;
  } else {
    card.hidden = false;
    mobileCard.hidden = true;
    requestAnimationFrame(() => positionInsight(trigger));
  }
  if (locked && window.matchMedia("(max-width: 700px)").matches) {
    requestAnimationFrame(() => mobileCard.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  }
}

function positionInsight(trigger) {
  if (card.hidden) return;
  const heroRect = hero.getBoundingClientRect();
  const pointRect = trigger.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const pointX = pointRect.left + pointRect.width / 2 - heroRect.left;
  const pointY = pointRect.top + pointRect.height / 2 - heroRect.top;
  const preferRight = pointX < heroRect.width * .68;
  let left = preferRight ? pointX + 76 : pointX - cardRect.width - 76;
  let top = pointY - cardRect.height / 2;
  left = Math.max(18, Math.min(left, heroRect.width - cardRect.width - 18));
  top = Math.max(94, Math.min(top, heroRect.height - cardRect.height - 30));
  card.style.left = `${left}px`;
  card.style.top = `${top}px`;

  const endX = preferRight ? left : left + cardRect.width;
  const endY = top + cardRect.height / 2;
  const dx = endX - pointX;
  const dy = endY - pointY;
  connector.style.left = `${pointX}px`;
  connector.style.top = `${pointY}px`;
  connector.style.width = `${Math.hypot(dx, dy)}px`;
  connector.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
  connector.classList.add("is-visible");
}

function hideInsight() {
  card.hidden = true;
  mobileCard.hidden = true;
  connector.classList.remove("is-visible");
  layer.classList.remove("has-active");
  document.querySelectorAll(".hotspot").forEach((node) => {
    node.classList.remove("is-active");
    node.setAttribute("aria-expanded", "false");
  });
  document.querySelectorAll(".mesh-lines").forEach((region) => region.classList.remove("is-active", "is-muted"));
}

card.querySelector(".close-card").addEventListener("click", () => { activeId = null; hideInsight(); });
hero.addEventListener("click", (event) => {
  if (activeId && !card.contains(event.target) && !event.target.closest(".hotspot")) { activeId = null; hideInsight(); }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && (activeId || !card.hidden)) { activeId = null; hideInsight(); }
});
window.addEventListener("resize", () => {
  if (activeId) {
    const item = hotspotData.find((entry) => entry.id === activeId);
    const trigger = layer.querySelector(`[data-id="${activeId}"]`);
    showInsight(item, trigger, true);
  }
});

if (matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    portraitSystem.style.transform = `translate3d(${x * 9}px, ${y * 7}px, 0)`;
  });
  hero.addEventListener("pointerleave", () => { portraitSystem.style.transform = "translate3d(0,0,0)"; });
}

const mobileActions = document.createElement("div");
mobileActions.className = "mobile-actions";
mobileActions.innerHTML = '<a class="button button-primary" href="#experience">Explore treatments</a><a class="button button-secondary" href="#consultation">Book consultation</a>';
hero.appendChild(mobileActions);
