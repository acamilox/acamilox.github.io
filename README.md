# Bienvenido a mi Portafolio Junior Backend (Python)

Bienvenido a la estructura principal de mi portafolio profesional. Este repositorio alberga tanto la **landing page** estática de presentación para reclutadores como el código fuente de los microservicios backend desarrollados con **FastAPI**, **PostgreSQL** y **SQLAlchemy**.

---

## 📂 Organización del Directorio

```text
.
├── .github/workflows/       # Despliegue automático de la landing a GitHub Pages
├── landing/                 # Sitio web estático alojado en GitHub Pages
│   ├── assets/              # Recursos multimedia (CV en PDF, imágenes)
│   │   ├── cv/
│   │   └── img/
│   ├── index.html           # Página web con diseño Tailwind CSS (CDN)
│   └── projects.json        # Base de datos ligera de proyectos
├── proyectos/               # Carpeta contenedora de cada microservicio
│   └── plantilla-proyecto/  # Molde base con SQLAlchemy síncrono + psycopg2
├── setup.sh                 # Script bash para regenerar/verificar la estructura
├── .gitignore
└── README.md                # Esta guía
```

---

## 🛠️ Cómo Probar la Landing Localmente

Para evitar problemas de CORS al leer `projects.json` en local, utiliza el servidor HTTP nativo de Python:

1. Entra a la carpeta `landing`:
   ```bash
   cd "/home/camilo/Documentos/Mi Portfolio/landing"
   ```
2. Inicia el servidor local:
   ```bash
   python3 -m http.server 8000
   ```
3. Abre tu navegador en: [http://localhost:8000](http://localhost:8000)

---

## ➕ Cómo Añadir un Proyecto Nuevo (Paso a Paso)

Cuando tengas listo un nuevo microservicio backend, sigue este flujo:

1. **Duplica la plantilla base:**
   ```bash
   cd "/home/camilo/Documentos/Mi Portfolio/proyectos"
   cp -r plantilla-proyecto mi-nuevo-proyecto
   ```
2. **Desarrolla tu API:**
   Entra en `mi-nuevo-proyecto/`, crea tu entorno virtual (`python3 -m venv venv`), programa tus modelos y endpoints en FastAPI con SQLAlchemy.
3. **Publica el repositorio:**
   Crea un nuevo repositorio en tu cuenta de GitHub (ej. `github.com/tu-usuario/mi-nuevo-proyecto`) y haz push del código.
4. **Despliégalo en Render / Railway:**
   Configura el servicio web en la nube y obtén la URL de producción (ej. `https://mi-nuevo-proyecto.onrender.com/docs`).
5. **Actualiza la Landing Page:**
   Abre `/home/camilo/Documentos/Mi Portfolio/landing/projects.json`:
   - Cambia `"status": "upcoming"` por `"status": "live"`.
   - Reemplaza `"repoUrl": "#"` por el enlace real a tu repositorio de GitHub.
   - Reemplaza `"liveUrl": "#"` por el enlace a Swagger UI en producción.
6. **Sube los cambios a GitHub:**
   ```bash
   cd "/home/camilo/Documentos/Mi Portfolio"
   git add .
   git commit -m "feat: publicar nuevo proyecto en la landing"
   git push origin main
   ```
   GitHub Actions actualizará tu portafolio en vivo en menos de 1 minuto.
