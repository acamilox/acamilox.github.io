# acamilox.github.io

Portafolio personal de **Andrés Camilo Camacho Labrador** — Backend Developer Junior.
Sitio estático en HTML, CSS y JavaScript, sin frameworks ni paso de compilación.

**Sitio publicado:** https://acamilox.github.io/

## Estructura

```
.
├── index.html                  # Toda la página
├── assets/
│   ├── css/styles.css          # Sistema de diseño y estilos
│   ├── js/main.js              # Consola, navegación, reloj y copiado
│   ├── favicon.svg
│   └── Andres-Camacho-CV.pdf   # CV descargable
├── .nojekyll                   # Evita el procesamiento de Jekyll en GitHub Pages
└── README.md
```

## Vista local

```bash
python3 -m http.server 8080
```

Abrir `http://localhost:8080`. No abrir el archivo con `file://`: el JS y las fuentes
necesitan un origen HTTP para comportarse igual que en producción.

## Despliegue

El sitio se publica con **GitHub Actions** (`.github/workflows/deploy.yml`) en cada push a
`main`. No requiere paso de compilación: se empaqueta la raíz del repositorio.

```bash
git add -A
git commit -m "feat: descripción del cambio"
git push origin main
```

La publicación tarda alrededor de un minuto. Estado en la pestaña **Actions** del repositorio;
la URL pública es https://acamilox.github.io/.

## Sistema de diseño

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#080C11` | Fondo base |
| `--surface` | `#0E1620` | Tarjetas y bloques |
| `--line` | `#1E2A36` | Bordes y separadores |
| `--text` | `#E7EEF5` | Texto principal |
| `--muted` | `#8EA0B2` | Texto secundario |
| `--amber` | `#F2A63B` | Acento principal, enlaces y estados |
| `--blue` | `#6B9BF5` | Enlaces técnicos y sintaxis JSON |

Tipografía: **Archivo** (display y cuerpo) e **IBM Plex Mono** (datos, etiquetas y consola).

## Accesibilidad

- Navegación completa por teclado, incluida la consola (`role="tablist"` con flechas, Home y End).
- Enlace «Saltar al contenido».
- Contraste sobre fondo oscuro y foco visible en todos los controles.
- Animaciones desactivadas con `prefers-reduced-motion`.
- Contenido íntegro en el HTML: la consola es un refuerzo, no la única fuente.

## Créditos

Diseño y desarrollo: Andrés Camilo Camacho Labrador.
