# 🚀 Portafolio Backend Junior (Python)

Repositorio central de proyectos backend y arquitectura de servicios desarrollado por **Andrés Camilo Camacho**. Diseñado para demostrar criterio técnico en el desarrollo de APIs RESTful escalables, modelado relacional consistente y buenas prácticas de ingeniería de software con el ecosistema de Python.

[![Portafolio Web](https://img.shields.io/badge/Portafolio_En_Vivo-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://acamilox.github.io/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/acamilox)
[![Email](https://img.shields.io/badge/Contacto-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:acamicamacho@gmail.com)

---

## 🛠️ Stack Tecnológico

| Área | Tecnologías |
| :--- | :--- |
| **Backend Framework** | ![Python](https://img.shields.io/badge/Python_3.11+-3776AB?style=flat-square&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Pydantic](https://img.shields.io/badge/Pydantic_v2-E92063?style=flat-square&logo=pydantic&logoColor=white) |
| **Base de Datos & ORM** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy_2.0-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white) ![Alembic](https://img.shields.io/badge/Alembic-663399?style=flat-square) |
| **Testing & Calidad** | ![Pytest](https://img.shields.io/badge/Pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white) ![HTTPX](https://img.shields.io/badge/HTTPX-00599C?style=flat-square) |
| **Infraestructura & CI/CD**| ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) ![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black) |

---

## 📂 Organización del Repositorio

El monorepositorio está estructurado siguiendo principios de desacoplamiento entre la capa de presentación pública y los microservicios backend:

```text
.
├── .github/workflows/
│   └── deploy.yml              # Pipeline de CI/CD para despliegue automatizado a GitHub Pages
├── landing/                    # Interfaz estática de presentación (Tailwind CSS sin dependencias pesadas)
│   ├── assets/                 # Recursos multimedia y currículum en PDF
│   ├── index.html              # Interfaz SPA minimalista orientada a reclutadores técnicos
│   └── projects.json           # Contrato de datos ligero para renderizado dinámico de proyectos
├── proyectos/                  # Código fuente de microservicios backend independientes
│   └── plantilla-proyecto/     # Arquitectura base estandarizada (FastAPI + SQLAlchemy + psycopg2)
└── README.md                   # Descripción general del repositorio
```

---

## 🧩 Proyectos Backend Destacados

### 1. [API de Autenticación con JWT](https://github.com/acamilox/Mis-Proyectos-Python/tree/main/API-de-Autenticacion-con-JWT)
* **Objetivo:** Microservicio de autenticación y autorización stateless listo para producción.
* **Stack:** `FastAPI` `PostgreSQL` `JWT` `Docker Compose` `bcrypt` `Alembic`
* **Aspectos Técnicos:**
  * Emisión de tokens JWT con expiración configurable y roles de usuario (`user` / `admin`).
  * Encriptación segura de contraseñas con `bcrypt` y validación tipada con esquemas Pydantic.
  * Despliegue contenerizado y reproducible mediante Docker y Docker Compose.

### 2. [Task Manager REST API](https://github.com/acamilox/Mis-Proyectos-Python/tree/main/Task-Manager-API)
* **Objetivo:** API modular para gestión de tareas implementando arquitectura en capas.
* **Stack:** `FastAPI` `SQLAlchemy` `SQLite` `Pydantic` `Uvicorn`
* **Aspectos Técnicos:**
  * Separación estricta de responsabilidades (`models`, `schemas`, `crud`, `database`).
  * Operaciones CRUD completas con relaciones de base de datos y documentación OpenAPI/Swagger automática.

### 3. [URL Shortener API](https://github.com/acamilox/Mis-Proyectos-Python/tree/main/URL-Shortener-API)
* **Objetivo:** Servicio de acortamiento de URLs con analítica de redirecciones.
* **Stack:** `FastAPI` `SQLAlchemy` `SQLite` `Pydantic` `Python Secrets`
* **Aspectos Técnicos:**
  * Generación de claves alfanuméricas criptográficamente seguras con el módulo `secrets` de Python.
  * Redirección HTTP 301 automática y seguimiento estadístico de clics por enlace.

### 4. [Dashboard UCI Adultos 2025](https://github.com/acamilox/Mis-Proyectos-Python/tree/main/Dashboard-UCI-Adultos-2025)
* **Objetivo:** Plataforma de análisis y visualización de indicadores clínicos hospitalarios.
* **Stack:** `Python` `Pandas` `Data Analytics` `Streamlit`
* **Aspectos Técnicos:**
  * Procesamiento y agregación de datasets médicos optimizando tiempos de respuesta en consultas de ocupación.

---

## 🎯 Criterios de Ingeniería Aplicados

* **Tipado Estricto y Validación:** Esquemas de entrada y salida tipados con Pydantic para garantizar contratos de API predecibles y autodocumentados bajo el estándar OpenAPI (Swagger UI).
* **Persistencia Robusta:** Separación clara entre capas de modelos SQLAlchemy, repositorios CRUD y lógica de negocio pura.
* **Control de Esquema:** Versionado declarativo del esquema de base de datos utilizando migraciones automatizadas con Alembic.
* **Entornos Reproducibles:** Empaquetado de cada microservicio en contenedores Docker y configuraciones limpias de variables de entorno mediante `.env.example`.
* **Automatización CI/CD:** Flujos de trabajo con GitHub Actions para despliegue continuo y validación de calidad.

---

## 📬 Contacto

* **Portafolio en Vivo:** [https://acamilox.github.io/](https://acamilox.github.io/)
* **Email:** [acamicamacho@gmail.com](mailto:acamicamacho@gmail.com)
* **GitHub:** [@acamilox](https://github.com/acamilox)
