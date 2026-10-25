/* Portafolio — Andrés Camacho
   Interacciones sin dependencias: consola, reloj, navegación y copiado. */

const ENDPOINTS = {
  perfil: {
    nombre: "Andrés Camilo Camacho Labrador",
    rol: "Backend Developer Junior",
    ubicacion: "Bogotá, Colombia",
    foco: ["Python", "FastAPI", "PostgreSQL"],
    idiomas: { espanol: "nativo", ingles: "B2" },
    disponibilidad: "inmediata",
    contacto: { email: "acamicamacho@gmail.com", github: "acamilox" },
  },
  stack: {
    lenguajes: ["Python", "SQL", "Bash"],
    backend: ["FastAPI", "SQLAlchemy", "Pydantic", "REST", "JWT"],
    datos: ["PostgreSQL", "SQL Server", "MariaDB", "MongoDB", "SQLite"],
    devops: ["Docker", "GitHub Actions", "Azure", "Linux", "Git"],
    practicas: ["SOLID", "Clean Code", "Scrum"],
  },
  estado: {
    status: "disponible",
    buscando: "Backend Developer Junior",
    modalidad: ["remoto", "híbrido", "presencial"],
    respuesta: "< 24 h",
    zona_horaria: "UTC−5",
    ciudad: "Bogotá",
  },
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ── Consola ───────────────────────────────────────────────── */

const consoleCode = document.getElementById("consoleCode");
const consoleTime = document.getElementById("consoleTime");
const tabs = Array.from(document.querySelectorAll('[role="tab"][data-endpoint]'));
let renderToken = 0;

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(json) {
  return escapeHtml(json).replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let tokenClass = "tok-num";
      if (/^"/.test(match)) {
        tokenClass = /:$/.test(match) ? "tok-key" : "tok-str";
      } else if (/^(true|false|null)$/.test(match)) {
        tokenClass = "tok-bool";
      }
      return `<span class="${tokenClass}">${match}</span>`;
    }
  );
}

function renderEndpoint(name, { animate = true } = {}) {
  const data = ENDPOINTS[name];
  if (!data || !consoleCode) return;

  const text = JSON.stringify(data, null, 2);
  const token = ++renderToken;
  const panel = consoleCode.closest(".console__body");
  if (panel) panel.scrollTop = 0;

  if (consoleTime) {
    consoleTime.textContent = `${Math.floor(Math.random() * 8) + 9} ms`;
  }

  if (!animate || reduceMotion.matches) {
    consoleCode.innerHTML = highlight(text);
    return;
  }

  consoleCode.textContent = "";
  const step = Math.max(2, Math.ceil(text.length / 90));
  let index = 0;

  const tick = () => {
    if (token !== renderToken) return;
    index += step;
    consoleCode.textContent = text.slice(0, index);
    if (index < text.length) {
      requestAnimationFrame(tick);
    } else {
      consoleCode.innerHTML = highlight(text);
    }
  };
  requestAnimationFrame(tick);
}

function selectTab(nextTab, { focus = false } = {}) {
  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive) {
      const panel = document.getElementById("consolePanel");
      if (panel) panel.setAttribute("aria-labelledby", tab.id);
    }
  });
  if (focus) nextTab.focus();
  renderEndpoint(nextTab.dataset.endpoint);
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1, Home: "first", End: "last" };
    const move = keys[event.key];
    if (move === undefined) return;
    event.preventDefault();
    if (move === "first") selectTab(tabs[0], { focus: true });
    else if (move === "last") selectTab(tabs[tabs.length - 1], { focus: true });
    else {
      const target = (index + move + tabs.length) % tabs.length;
      selectTab(tabs[target], { focus: true });
    }
  });
});

if (tabs.length) renderEndpoint("perfil");

/* ── Marca de inicialización ──────────────────────────────── */

window.__portfolioReady = true;

/* ── Reloj de Bogotá ──────────────────────────────────────── */

const clock = document.getElementById("clock");
const bogotaTime = new Intl.DateTimeFormat("es-CO", {
  timeZone: "America/Bogota",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function updateClock() {
  if (clock) clock.textContent = `Bogotá · ${bogotaTime.format(new Date())}`;
}

if (clock) {
  updateClock();
  setInterval(updateClock, 20000);
}

/* ── Navegación activa ────────────────────────────────────── */

const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === id) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
  );
  sections.forEach((section) => observer.observe(section));
}

/* ── Menú móvil ───────────────────────────────────────────── */

const rail = document.getElementById("rail");
const navToggle = document.getElementById("navToggle");
const mobileQuery = window.matchMedia("(max-width: 960px)");

function setMenu(open) {
  if (!rail || !navToggle) return;
  rail.dataset.open = String(open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  document.body.style.overflow = open && mobileQuery.matches ? "hidden" : "";
}

navToggle?.addEventListener("click", () => {
  setMenu(rail.dataset.open !== "true");
});

navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && rail?.dataset.open === "true") {
    setMenu(false);
    navToggle?.focus();
  }
});

mobileQuery.addEventListener("change", () => setMenu(false));

/* ── Revelado al hacer scroll ─────────────────────────────── */

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}

/* ── Copiar correo ────────────────────────────────────────── */

const copyButton = document.querySelector("[data-copy]");
const copyStatus = document.querySelector(".copy-status");

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(helper);
    return copied;
  }
}

copyButton?.addEventListener("click", async () => {
  const copied = await copyText(copyButton.dataset.copy);
  const label = copyButton.querySelector("[data-copy-label]");
  if (label) label.textContent = copied ? "Listo" : "Error";
  if (copyStatus) {
    copyStatus.textContent = copied
      ? "Correo copiado. Ya puede pegarlo donde lo necesite."
      : "No se pudo copiar. Use el botón de escribir.";
  }
  window.setTimeout(() => {
    if (label) label.textContent = "Ctrl+C";
  }, 2200);
});

/* ── Año del footer ───────────────────────────────────────── */

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

/* ── Acordeón de certificados ─────────────────────────────── */

const certToggles = document.querySelectorAll("[data-cert-toggle]");
certToggles.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const select = btn.closest("[data-cert-select]");
    if (select) {
      const menu = select.querySelector("[data-cert-menu]");
      if (menu) {
        if (menu.hasAttribute("hidden")) {
          menu.removeAttribute("hidden");
          btn.setAttribute("aria-expanded", "true");
        } else {
          menu.setAttribute("hidden", "");
          btn.setAttribute("aria-expanded", "false");
        }
        e.stopPropagation();
        return;
      }
    }
    const item = btn.closest(".certs__item");
    const panel = item ? item.querySelector("[data-cert-panel]") : null;
    if (!panel) return;
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      panel.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      if (!btn.closest("[data-cert-select]")) btn.textContent = "Ver certificado";
      return;
    }
    panel.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    if (!btn.closest("[data-cert-select]")) btn.textContent = "Ocultar certificado";
  });
});

document.querySelectorAll("[data-cert-select]").forEach((select) => {
  const menu = select.querySelector("[data-cert-menu]");
  const btn = select.querySelector("[data-cert-toggle]");
  if (!menu || !btn) return;
  menu.querySelectorAll("button").forEach((opt) => {
    opt.addEventListener("click", () => {
      const item = select.closest(".certs__item");
      const frame = item ? item.querySelector("[data-cert-frame]") : null;
      const link = item ? item.querySelector("[data-cert-open]") : null;
      const panel = item ? item.querySelector("[data-cert-panel]") : null;
      const src = opt.getAttribute("data-cert-src");
      const title = opt.getAttribute("data-cert-title");
      if (src && frame) {
        frame.src = src + "#view=FitH";
        if (title) frame.title = title;
      }
      if (src && link) {
        link.href = src;
      }
      menu.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
      if (panel && !panel.classList.contains("is-open")) {
        panel.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll("[data-cert-select]").forEach((select) => {
    const menu = select.querySelector("[data-cert-menu]");
    const btn = select.querySelector("[data-cert-toggle]");
    if (!menu || !btn) return;
    if (!select.contains(e.target)) {
      menu.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    }
  });
});
