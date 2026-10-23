# AGENTS.md — acamilox.github.io

Portafolio personal de Andrés Camacho. Sitio estático de una sola página.
Instrucciones específicas de este proyecto; no aplicar convenciones de otros repositorios.

## Reglas del proyecto

- **Sin frameworks ni build.** HTML, CSS y JavaScript nativos. No agregar React, Tailwind,
  bundlers ni dependencias de npm sin autorización explícita.
- **Idioma del contenido: español.** Los identificadores del código van en inglés.
- **No romper el sistema de diseño.** Los colores, tipografías y espaciados salen de las
  variables CSS en `:root` (`assets/css/styles.css`). No introducir hex sueltos.
- **Acento único.** El ámbar (`--amber`) es el acento principal. El azul y el verde son
  funcionales (enlaces técnicos, sintaxis, estado). No agregar una tercera familia cromática.
- **Contenido verídico.** Todo dato del sitio proviene del CV o de los repositorios reales del
  autor. No inventar métricas, empresas, fechas ni tecnologías.

## Estructura

```
index.html                 Secciones: perfil, métricas, experiencia, proyectos, stack, formación, contacto
assets/css/styles.css      Tokens en :root, luego componentes, luego responsive
assets/js/main.js          Consola (ENDPOINTS), reloj, nav activa, menú móvil, reveal, acordeón, copiado
assets/hero-backend.svg    Banner del hero (cilindros de BD, rack, grafo de API, terminal)
assets/certs/*.pdf         Certificados de formación
assets/projects/*.png      Capturas usadas en las tarjetas de proyectos
assets/Andres-Camacho-CV.pdf
```

## Al editar contenido

- **Datos de la consola:** objeto `ENDPOINTS` en `assets/js/main.js`. Debe coincidir con el
  texto visible de la página.
- **Proyectos:** cada tarjeta es un `<article class="project">` con endpoint representativo
  real (`MÉTODO /ruta → código`), descripción, etiquetas y enlace al repositorio. La última
  tarjeta usa `.project--wide` (ancho completo, imagen a la izquierda) y su contenido va
  envuelto en `.project__body`.
- **Certificados:** el nombre, la organización, la duración y el ID deben coincidir con lo que
  dice el PDF, no con el nombre del archivo. Verificar con `pdftotext` (PDFs de texto) u OCR
  antes de etiquetar. Si no hay URL de verificación pública, no inventarla.
- **CV:** si se actualiza el PDF, reemplazar `assets/Andres-Camacho-CV.pdf` conservando el nombre.
- **Añadir una sección:** actualizar el `<nav>` del rail con su número correlativo, el
  `id` de la sección y el `data-nav` del enlace.

## Verificación antes de publicar

1. `python3 -m http.server 8080` y revisar en escritorio (1440 px), tablet (768 px) y móvil (390 px).
2. Consola del navegador sin errores.
3. Recorrido con teclado: enlace de salto, navegación, pestañas de la consola, botones.
4. Los enlaces externos abren en pestaña nueva con `rel="noopener noreferrer"`.

## Despliegue

Rama `main` → GitHub Actions → GitHub Pages (workflow `deploy.yml`). Commit convencional en
español o inglés, imperativo y corto.

GitHub Pages cachea los assets con la misma URL. Cada vez que se modifique `styles.css` o
`main.js`, subir el sufijo de versión en `index.html`:

```html
<link rel="stylesheet" href="assets/css/styles.css?v=AAAAMMDDx">
<script src="assets/js/main.js?v=AAAAMMDDx" defer></script>
```

Sin ese cambio el navegador sigue mostrando el CSS/JS anterior aunque el despliegue sea correcto.
