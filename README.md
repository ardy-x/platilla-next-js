# Plantilla Next.js con Autenticación y Dashboard

Una plantilla moderna de Next.js con autenticación, dashboard administrativo y componentes UI pre-configurados.

## Tecnologías

<div align="center">
  
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-4-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2-60A5FA?style=for-the-badge&logo=biome&logoColor=white)

</div>

## Características

- **Next.js 16** con App Router
- **Tailwind CSS 4** para estilos
- **TypeScript** para type safety
- **Sistema de Autenticación** completo
- **Dashboard** con sidebar navegable
- **Tema claro/oscuro** con next-themes
- **Componentes UI** de shadcn/ui (Radix UI)
- **Validación** con Zod y React Hook Form
- **Biome** para linting y formateo
- **Commitlint** con Husky para conventional commits
- **Protección de rutas** con middleware personalizado

## Requisitos Previos

- Node.js 20 o superior
- pnpm (recomendado) o npm/yarn

## Instalación

1. **Instala las dependencias**
```bash
pnpm install
```

2. **Configura las variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```env
NEXT_PUBLIC_API_URL=https://tu-api.com
NEXT_PUBLIC_APP_NAME=Mi Aplicación
NEXT_PUBLIC_APP_DESCRIPTION=Descripción de mi aplicación
NODE_ENV=development
```

3. **Ejecuta el servidor de desarrollo**
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
├── app/                          # App Router de Next.js
│   ├── (autenticacion)/         # Grupo de rutas de autenticación
│   │   └── auth/                # Páginas de auth
│   ├── (principal)/             # Grupo de rutas principales
│   │   └── dashboard/           # Dashboard
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página de inicio
├── components/                   # Componentes React
│   ├── ui/                      # Componentes UI de shadcn
│   └── layout/                  # Componentes de layout
├── config/                       # Configuraciones
│   └── envs.config.ts           # Variables de entorno
├── hooks/                        # Custom hooks
│   └── autenticacion/           # Hooks de autenticación
├── lib/                          # Utilidades
├── services/                     # Servicios API
├── types/                        # Definiciones TypeScript
├── api/                          # Helpers de API
└── public/                       # Archivos estáticos
```

## Componentes Disponibles

La plantilla incluye los siguientes componentes de UI:

- Avatar, Badge, Button, Card
- Calendar, Date Picker
- Checkbox, Radio Group
- Dialog, Sheet, Popover
- Dropdown Menu, Command
- Form, Input, Textarea, Select
- Table, Pagination
- Tabs, Collapsible
- Breadcrumb, Sidebar
- Toast (Sonner)
- Y más...

## Scripts Disponibles

```bash
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia el servidor de producción
pnpm lint         # Ejecuta Biome para revisar el código
pnpm lint:fix     # Corrige automáticamente problemas de linting
pnpm format       # Formatea el código
```
## Personalización del Tema

El tema se puede personalizar modificando:

- `app/globals.css` - Variables CSS y estilos globales
- `components/theme-provider.tsx` - Proveedor de tema
- `components/mode-toggle.tsx` - Toggle de tema claro/oscuro.

## Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

