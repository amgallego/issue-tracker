# IssueTrack — Sistema de Gestión de Incidencias

Aplicación web SPA para que equipos de soporte técnico gestionen reportes de errores (bugs) de manera eficiente.

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| React Router DOM v6 | Enrutamiento SPA |
| Tailwind CSS | Estilos utilitarios |
| Axios | Peticiones HTTP |
| SweetAlert2 | Alertas y confirmaciones |
| LocalStorage | Simulación de sesión |
| MockAPI | API RESTful de pruebas |

## API

**URL base:** `https://6a17914e1878294b597b9a1b.mockapi.io/api/issues`

Entidad `issue`: `id`, `titulo`, `descripcion`, `estado` (Pendiente / En Progreso / Resuelto), `prioridad` (Baja / Media / Alta)

## Instalación y uso local

```bash
# 1. Clonar el repositorio
git clone https://github.com/amgallego/issue-tracker.git

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
```
## Despliegue

[Ver aplicación en producción](https://issue-tracker-coral-one.vercel.app/login)

## Estructura del proyecto

```
src/
├── components/      # Componentes reutilizables
│   ├── Badge.jsx
│   ├── IssueCard.jsx
│   ├── IssueForm.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   └── Spinner.jsx
├── hooks/           # Custom hooks
│   └── useIssues.js
├── pages/           # Vistas principales
│   ├── DashboardPage.jsx
│   └── LoginPage.jsx
├── services/        # Capa de comunicación con la API
│   └── issuesService.js
└── utils/           # Funciones auxiliares
    └── auth.js
```
