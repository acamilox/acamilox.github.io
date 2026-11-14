const projectStatus = {
  live: {
    label: "En vivo",
    classes: "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
  },
  in_progress: {
    label: "En desarrollo",
    classes: "bg-amber-950/80 text-amber-400 border border-amber-800"
  },
  repository: {
    label: "Código disponible",
    classes: "bg-sky-950/80 text-sky-300 border border-sky-800"
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProject(project) {
  const status = projectStatus[project.status] ?? {
    label: "Próximamente",
    classes: "bg-slate-800 text-slate-400 border border-slate-700"
  };
  const tags = Array.isArray(project.tags) ? project.tags : [];
  const codeButton = project.repoUrl && project.repoUrl !== "#"
    ? `<a href="${escapeHtml(project.repoUrl)}" target="_blank" rel="noopener noreferrer" class="text-xs font-semibold px-3 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white transition text-center flex-1 border border-brand-border hover:border-emerald-500/40">Ver código</a>`
    : `<span class="text-xs font-medium px-3 py-2 rounded bg-slate-900/40 border border-slate-800/80 text-slate-500 cursor-not-allowed select-none text-center flex-1">Código próximamente</span>`;

  return `
    <article class="bg-brand-card border border-brand-border rounded-xl p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.07)] transition-all duration-300">
      <div>
        <div class="flex justify-end mb-4">
          <span class="px-2.5 py-0.5 rounded text-xs font-mono font-medium ${status.classes}">${status.label}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">${escapeHtml(project.title)}</h3>
        <p class="text-slate-400 text-sm mb-4 leading-relaxed">${escapeHtml(project.description)}</p>
        <div class="flex flex-wrap gap-1.5 mb-6">
          ${tags.map((tag) => `<span class="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-slate-800">${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="flex gap-2 pt-4 border-t border-brand-border/60">
        ${codeButton}
      </div>
    </article>
  `;
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  try {
    const response = await fetch("./projects.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const projects = await response.json();
    grid.innerHTML = projects.map(renderProject).join("");
  } catch (error) {
    console.error("Error al cargar projects.json:", error);
    grid.innerHTML = '<p class="text-red-400 text-sm col-span-full">No fue posible cargar la lista de proyectos.</p>';
  }
}

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menú de navegación" : "Cerrar menú de navegación");
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

function setupCopyEmail() {
  const button = document.getElementById("copy-email");
  const toast = document.getElementById("toast");
  const copyText = document.getElementById("copy-text");
  if (!button || !toast || !copyText) return;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("acamicamacho@gmail.com");
      toast.classList.remove("translate-y-24", "opacity-0");
      toast.classList.add("translate-y-0", "opacity-100");
      copyText.textContent = "¡Copiado!";
      window.setTimeout(() => {
        toast.classList.remove("translate-y-0", "opacity-100");
        toast.classList.add("translate-y-24", "opacity-0");
        copyText.textContent = "Copiar";
      }, 2500);
    } catch (error) {
      console.error("No se pudo copiar el correo:", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  setupMobileMenu();
  setupCopyEmail();
});
