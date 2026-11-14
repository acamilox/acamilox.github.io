#!/usr/bin/env bash
# ==============================================================================
# Script seguro de inicialización del Portafolio Backend
# No sobrescribe archivos existentes con contenido.
# ==============================================================================

set -e

BASE_DIR="/home/camilo/Documentos/Mi Portfolio"

echo "📁 Creando directorios..."
mkdir -p "$BASE_DIR/.github/workflows"
mkdir -p "$BASE_DIR/landing/assets/cv"
mkdir -p "$BASE_DIR/landing/assets/img"
mkdir -p "$BASE_DIR/proyectos/plantilla-proyecto"

echo "📄 Verificando archivos (sin sobrescribir existentes)..."
ARCHIVOS=(
    "$BASE_DIR/.github/workflows/deploy.yml"
    "$BASE_DIR/landing/index.html"
    "$BASE_DIR/landing/projects.json"
    "$BASE_DIR/proyectos/plantilla-proyecto/README.md"
    "$BASE_DIR/proyectos/plantilla-proyecto/.env.example"
    "$BASE_DIR/proyectos/plantilla-proyecto/.gitignore"
    "$BASE_DIR/proyectos/plantilla-proyecto/requirements.txt"
    "$BASE_DIR/.gitignore"
    "$BASE_DIR/README.md"
)

for ARCHIVO in "${ARCHIVOS[@]}"; do
    [ -f "$ARCHIVO" ] || touch "$ARCHIVO"
done

echo "✅ Estructura verificada sin modificar archivos existentes."
