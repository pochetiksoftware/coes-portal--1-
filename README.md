# COES-SINAC: Portal de Service Desk Institucional

**Autor:** Estudiante de Ingeniería de Sistemas - Universidad Tecnológica del Perú (UTP)  
**Versión:** 1.0.0  
**Estado:** Desarrollo Activo

---

## 📋 Índice

1. [Objetivo de Negocio](#objetivo-de-negocio)
2. [Descripción General](#descripción-general)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Flujos de Negocio](#flujos-de-negocio)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Usuarios de Prueba](#usuarios-de-prueba)
7. [Requisitos del Sistema](#requisitos-del-sistema)
8. [Instalación y Configuración](#instalación-y-configuración)
9. [Uso de la Aplicación](#uso-de-la-aplicación)
10. [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## 🎯 Objetivo de Negocio

### Propósito Estratégico

COES-SINAC es una solución integral de gestión de tickets de servicio diseñada para centralizar y optimizar la atención de solicitudes de soporte técnico y administrativo en instituciones. 

**Objetivos Específicos:**

- **Mejorar la eficiencia operativa** mediante la automatización de flujos de trabajo en la gestión de incidentes y requisitos
- **Garantizar trazabilidad completa** de cada solicitud desde su creación hasta su resolución
- **Cumplir con SLAs (Service Level Agreements)** establecidos según la criticidad del ticket
- **Proporcionar visibilidad** al usuario final sobre el estado de sus solicitudes en tiempo real
- **Reducir tiempos de respuesta** y resolución mediante priorización inteligente de tickets
- **Facilitar análisis y reportería** a través de métricas y dashboards intuitivos

---

## 📱 Descripción General

### ¿Qué es COES-SINAC?

COES-SINAC es una aplicación web moderna de gestión de service desk que permite a los usuarios reportar incidentes, solicitar servicios y dar seguimiento a sus solicitudes mediante una interfaz intuitiva y responsiva.

### Funcionalidades Principales

| Funcionalidad | Descripción |
|---|---|
| **Autenticación** | Login seguro con credenciales corporativas |
| **Gestión de Tickets** | Creación, seguimiento y cierre de incidentes y pedidos |
| **Dashboard Analítico** | Visualización de métricas clave y estado general |
| **Sistema de SLA** | Control automático de tiempos de respuesta |
| **Encuestas de Satisfacción** | Recolección de feedback post-resolución |
| **Búsqueda y Filtrado** | Localización rápida de tickets por múltiples criterios |
| **Detalle de Tickets** | Información completa con historial y adjuntos |

---

## 🏗️ Arquitectura del Sistema

### Diagrama de Capas

```
┌─────────────────────────────────────────────────┐
│         CAPA DE PRESENTACIÓN (Frontend)          │
│  React 19 + Tailwind CSS + Lucide Icons         │
├─────────────────────────────────────────────────┤
│    CAPA DE LÓGICA DE NEGOCIO (State Mgmt)       │
│  - Gestión de Estado Global (React Hooks)       │
│  - Validaciones de Negocio                      │
│  - Generación Automática de IDs de Tickets      │
├─────────────────────────────────────────────────┤
│    CAPA DE DATOS (Data Layer)                   │
│  - Mock Data (Desarrollo)                       │
│  - Estructura de Tickets y Usuarios             │
└─────────────────────────────────────────────────┘
```

### Patrones de Arquitectura

**1. Componentes Funcionales (Functional Components)**
- Uso de React Hooks (useState, useEffect)
- Composición de componentes reutilizables
- Props drilling para paso de datos

**2. Separación de Responsabilidades**
- **Pages**: Componentes de página (vistas completas)
- **Components**: Componentes reutilizables
- **Data**: Capa de datos mockup

**3. Gestión de Estado**
- Estado local con `useState`
- Propagación a través de props
- Candidato a escalabilidad: Context API o Redux

---

## 🔄 Flujos de Negocio

### 1. Flujo de Autenticación

```
┌─────────────────┐
│  Inicio Sesión  │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│ Validar Credenciales     │
│ (Email + Contraseña)     │
└────────┬─────────────────┘
         │
    ┌────▼─────┐
    │           │
    │ ✓         │ ✗
    ▼           ▼
Dashboard   Error Login
```

**Validaciones:**
- Email en formato corporativo
- Contraseña no vacía
- Remember Me (localStorage)

---

### 2. Flujo de Creación de Tickets

```
┌──────────────────────────┐
│ Usuario solicita crear   │
│ Incidente o Pedido       │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Formulario Nuevo Ticket  │
│ - Asunto                 │
│ - Descripción            │
│ - Categoría              │
│ - Archivos (adjuntos)    │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Generar ID automático:   │
│ INC-YYYY-XXXXX o         │
│ REQ-YYYY-XXXXX           │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Asignar SLA:             │
│ Incidente: 24h           │
│ Pedido: 48h              │
└────────┬─────────────────┘
         │
         ▼
┌──────────────────────────┐
│ Ticket creado con        │
│ Estado: "Nuevo"          │
└──────────────────────────┘
```

---

### 3. Flujo de Seguimiento y Resolución

```
┌─────────────┐
│  Dashboard  │ ─ Ver tickets pendientes
└─────┬───────┘   ─ Filtrar por estado
      │           ─ Visualizar SLA
      │
      ▼
┌─────────────────┐
│ Seleccionar     │
│ Ticket          │
└─────┬───────────┘
      │
      ▼
┌──────────────────────┐
│ Ver Detalle Ticket:  │
│ - Información básica │
│ - Descripción        │
│ - Adjuntos           │
│ - Historial          │
└─────┬────────────────┘
      │
      ▼
┌──────────────────────┐
│ Resolver Ticket      │ ─ Cambiar estado a "Resuelto"
└─────┬────────────────┘   ─ Actualizar información
      │
      ▼
┌──────────────────────┐
│ Encuesta de          │ ─ Calidad de atención
│ Satisfacción         │ ─ Comentarios adicionales
└──────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
coes-portal/
│
├── 📄 package.json              # Dependencias y scripts
├── 📄 vite.config.js            # Configuración de Vite
├── 📄 tailwind.config.js        # Configuración de Tailwind CSS
├── 📄 postcss.config.js         # Configuración de PostCSS
├── 📄 eslint.config.js          # Configuración de ESLint
├── 📄 index.html                # Punto de entrada HTML
│
├── 📁 public/                   # Archivos estáticos
│
├── 📁 src/
│   ├── 📄 main.jsx              # Punto de entrada de React
│   ├── 📄 App.jsx               # Componente principal (routing)
│   ├── 📄 App.css               # Estilos globales
│   ├── 📄 index.css             # Estilos base
│   │
│   ├── 📁 pages/                # Vistas/Páginas principales
│   │   ├── 📄 LoginScreen.jsx          # Pantalla de autenticación
│   │   ├── 📄 DashboardScreen.jsx      # Dashboard principal
│   │   ├── 📄 NuevoTicketScreen.jsx    # Creación de tickets
│   │   ├── 📄 RequerimientosScreen.jsx # Gestión de requisitos
│   │   └── 📄 TicketDetailScreen.jsx   # Detalle de ticket
│   │
│   ├── 📁 components/           # Componentes reutilizables
│   │   ├── 📄 Sidebar.jsx              # Navegación lateral
│   │   ├── 📄 Topbar.jsx              # Barra superior
│   │   ├── 📄 StatusBadge.jsx          # Indicador de estado
│   │   ├── 📄 TypeBadge.jsx            # Indicador de tipo
│   │   └── 📄 EncuestaModal.jsx        # Modal de encuesta
│   │
│   ├── 📁 data/                 # Capa de datos
│   │   └── 📄 mockTickets.js           # Datos de prueba
│   │
│   └── 📁 assets/               # Imágenes y recursos
│
└── 📁 dist/                     # Build de producción (generado)
```

### Descripción de Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `App.jsx` | Componente raíz, gestiona rutas y estado global |
| `mockTickets.js` | Datos de prueba con 5 tickets de ejemplo |
| `LoginScreen.jsx` | Formulario de autenticación |
| `DashboardScreen.jsx` | Panel de control con métricas |
| `NuevoTicketScreen.jsx` | Formulario para crear incidentes/pedidos |
| `TicketDetailScreen.jsx` | Vista detallada de un ticket |
| `Sidebar.jsx` | Menú de navegación |
| `StatusBadge.jsx` | Componente para mostrar estados |

---

## 👥 Usuarios de Prueba

### Perfil: Usuario Final / Solicitante

| Campo | Valor |
|-------|-------|
| **Email Corporativo** | usuario@coes.org.pe |
| **Contraseña** | (Cualquier valor) |
| **Permisos** | Crear tickets, ver propios tickets, llenar encuestas |
| **Caso de Uso** | Reportar incidentes, solicitar servicios |

### Datos de Prueba Precargados

La aplicación incluye 5 tickets de ejemplo para demostración:

1. **INC-2023-1042** (Incidente - En Proceso)
   - Asunto: Error de conexión VPN
   - SLA: 2h 15m restantes
   
2. **REQ-2023-0891** (Pedido - Nuevo)
   - Asunto: Solicitud de licencia Office 365
   - SLA: 48h 00m restantes

3. **INC-2023-1038** (Incidente - Resuelto)
   - Asunto: Lentitud extrema en sistema ERP
   
4. **REQ-2023-0885** (Pedido - Cerrado)
   - Asunto: Asignación de monitor secundario

5. **INC-2023-1021** (Incidente - Resuelto)
   - Asunto: Impresora Piso 3 atascada

### Acciones Disponibles por Usuario

```
┌─────────────────────────────────────┐
│     Acciones del Usuario Final       │
├─────────────────────────────────────┤
│ ✓ Ver dashboard personal            │
│ ✓ Crear nuevo incidente             │
│ ✓ Crear nuevo pedido/solicitud      │
│ ✓ Ver todos sus tickets             │
│ ✓ Ver detalle de ticket             │
│ ✓ Marcar ticket como resuelto       │
│ ✓ Llenar encuesta de satisfacción   │
│ ✓ Descargar adjuntos                │
└─────────────────────────────────────┘
```

---

## ⚙️ Requisitos del Sistema

### Hardware Mínimo
- **Procesador:** Dual-core 2.0 GHz
- **RAM:** 2 GB
- **Almacenamiento:** 500 MB disponible
- **Conexión:** Internet (cualquier velocidad)

### Software Requerido
- **Node.js:** v18.0.0 o superior
- **npm:** v9.0.0 o superior
- **Navegador:** Chrome, Firefox, Safari o Edge (versión actual)

### Compatibilidad
- ✓ Windows 10/11
- ✓ macOS 10.15+
- ✓ Linux (Ubuntu, Debian, etc.)
- ✓ Responsive (Mobile, Tablet, Desktop)

---

## 📦 Instalación y Configuración

### Paso 1: Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd coes-portal
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

### Paso 3: Ejecutar Servidor de Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173/`

### Paso 4: Compilar para Producción

```bash
npm run build
```

### Paso 5: Previsualizar Build

```bash
npm run preview
```

### Validación de Código

```bash
npm run lint
```

---

## 🚀 Uso de la Aplicación

### 1. Acceso al Sistema

1. Dirigirse a `http://localhost:5173/`
2. Ingresar cualquier email en formato: `usuario@coes.org.pe`
3. Ingresar cualquier contraseña
4. Click en "Iniciar Sesión"

### 2. Dashboard Principal

- Visualización de tickets pendientes
- Métricas de desempeño
- Acceso rápido a crear incidentes o pedidos
- Tiempo promedio de respuesta

### 3. Crear un Nuevo Ticket

1. Click en "Reportar Incidente" o "Solicitar Pedido"
2. Completar formulario:
   - Asunto
   - Descripción
   - Categoría
   - Adjuntos (opcional)
3. Submit automáticamente genera:
   - ID único
   - Fecha
   - SLA según tipo
   - Estado inicial: "Nuevo"

### 4. Consultar Requisitos

Sección dedicada para visualizar pedidos y solicitudes activas.

### 5. Ver Detalle de Ticket

- Click en cualquier ticket del listado
- Visualizar información completa
- Opción para marcar como resuelto
- Sistema de encuesta post-resolución

---

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **React 19.2.5** - Librería UI basada en componentes
- **Vite 8.0.10** - Bundler ultrarrápido

### Styling
- **Tailwind CSS 4.3.0** - Framework CSS utilitario
- **PostCSS 8.5.14** - Procesador de CSS
- **Autoprefixer 10.5.0** - Compatibilidad multi-navegador

### Iconografía
- **Lucide React 1.14.0** - Sistema de iconos SVG

### Desarrollo
- **ESLint 10.2.1** - Linter de JavaScript
- **eslint-plugin-react-refresh** - Validación de componentes
- **eslint-plugin-react-hooks** - Validación de React Hooks

### Package Manager
- **npm 11.x** - Gestor de dependencias

---

## 📊 Stack Tecnológico Visual

```
┌─────────────────────────────────────────────────────┐
│                  CLIENTE (Browser)                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │          React 19 (Componentes)            │   │
│  ├────────────────────────────────────────────┤   │
│  │ - Pages (Vistas)                           │   │
│  │ - Components (Componentes reutilizables)   │   │
│  │ - Hooks (Estado local)                     │   │
│  └────────────────────────────────────────────┘   │
│                      │                             │
│                      ▼                             │
│  ┌────────────────────────────────────────────┐   │
│  │     Tailwind CSS + PostCSS (Estilos)       │   │
│  │  - Responsive Design                       │   │
│  │  - Componentes prediseñados                │   │
│  └────────────────────────────────────────────┘   │
│                      │                             │
│                      ▼                             │
│  ┌────────────────────────────────────────────┐   │
│  │       Lucide Icons (Iconografía)           │   │
│  └────────────────────────────────────────────┘   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                   BUILD TOOLS                      │
├─────────────────────────────────────────────────────┤
│  Vite | ESLint | npm                               │
└─────────────────────────────────────────────────────┘
```

---

## 🔐 Consideraciones de Seguridad

> ⚠️ **Nota:** Esta versión es un prototipo de desarrollo con datos mockup.

Para producción, se deben implementar:

- [ ] Autenticación OAuth 2.0 / SAML
- [ ] Encriptación HTTPS
- [ ] Validación backend de datos
- [ ] Control de acceso basado en roles (RBAC)
- [ ] Auditoría de acciones
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] Protección CSRF

---

## 🚀 Roadmap Futuro

### Fase 2 - Backend
- [ ] API RESTful con Node.js/Express
- [ ] Base de datos PostgreSQL
- [ ] Autenticación JWT
- [ ] Sistema de notificaciones (Email, SMS)

### Fase 3 - Funcionalidades Avanzadas
- [ ] Asignación automática de tickets
- [ ] Escalamiento de prioridades
- [ ] Sistema de reportería avanzado
- [ ] Integración con Active Directory
- [ ] Chatbot de soporte

### Fase 4 - Optimización
- [ ] Caché (Redis)
- [ ] Búsqueda avanzada (Elasticsearch)
- [ ] Aplicación móvil (React Native)
- [ ] Análisis predictivo (ML)

---

## 📝 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Valida código con ESLint |

---

## 🤝 Contribuciones

Este proyecto es parte de la formación académica en **Ingeniería de Sistemas** en la UTP. Se acepta mejoras académicas y sugerencias de aprendizaje.

### Lineamientos para Contribuir

1. Fork del repositorio
2. Crear rama de features (`git checkout -b feature/nombre`)
3. Commit de cambios (`git commit -m 'Descripción clara'`)
4. Push a la rama (`git push origin feature/nombre`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia educativa. Uso permitido únicamente con propósitos académicos y de demostración.

---

## 📞 Soporte y Contacto

- **Correo:** [tu-email@coes.org.pe](mailto:tu-email@coes.org.pe)
- **Universidad:** Universidad Tecnológica del Perú (UTP)
- **Programa:** Ingeniería de Sistemas
- **Docente Responsable:** [Nombre del Docente]

---

## 📚 Referencias y Documentación

- [React Official Docs](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ITIL Service Management Best Practices](https://www.itil.org)
- [Service Desk ISO/IEC 20000-1](https://www.iso.org/standard/70636.html)

---

**Última Actualización:** Junio 2026  
**Versión Actual:** 1.0.0  
**Estado del Proyecto:** En Desarrollo Activo ✓

---

*Documento preparado como parte de la evaluación académica en Ingeniería de Sistemas - UTP*
