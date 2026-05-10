# Pokédex OS — Frontend

Pokédex premium con diseño minimalista. Explora todas las
generaciones, armá tu equipo y batallá en tiempo real.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase Auth
- Apollo Client (GraphQL)

## Setup local

1. Clonar el repositorio

   ```bash
   git clone https://github.com/autimioc13/frontend-pokedex.git
   cd frontend-pokedex
   ```

2. Instalar dependencias

   ```bash
   npm install
   ```

3. Configurar variables de entorno

   ```bash
   cp .env.example .env.local
   # Completar los valores en .env.local con los de Supabase
   ```

4. Correr el servidor de desarrollo

   ```bash
   npm run dev
   ```

5. Abrir http://localhost:3000

## Scripts disponibles

| Comando                | Descripción                   |
| ---------------------- | ----------------------------- |
| `npm run dev`          | Servidor de desarrollo        |
| `npm run build`        | Build de producción           |
| `npm run start`        | Servidor de producción        |
| `npm run lint`         | Verificar ESLint              |
| `npm run format`       | Formatear con Prettier        |
| `npm run format:check` | Verificar formato sin cambios |
| `npx tsc --noEmit`     | Verificar TypeScript          |

## Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/          # Login y Registro
│   └── (main)/          # Explorador, detalle, equipos, batallas
├── components/
│   ├── ui/              # Design system base
│   ├── pokemon/         # Componentes de Pokémon
│   ├── battle/          # Arena de batalla
│   └── layout/          # Navbar, Sidebar
├── hooks/               # Custom hooks
├── lib/                 # Apollo, Supabase, utilidades
├── store/               # Estado global (Zustand)
├── styles/              # Tokens CSS
└── types/               # Tipos TypeScript
```

## Convenciones de código

- 2 espacios de indentación
- Comillas simples
- Sin punto y coma
- TypeScript estricto
- Commits en español con prefijo: `feat:`, `fix:`, `chore:`, `docs:`

## Progreso

### Sprint 1 — Fundación (completado)

- [x] PDX-50 Auth layout
- [x] PDX-51 Pantalla Registro
- [x] PDX-52 Pantalla Login
- [x] PDX-53 OAuth Google + GitHub
- [x] PDX-54 Errores inline

### Sprint 2 — Features principales (en progreso)

- [ ] PDX-25 Explorador de Pokémon
- [ ] PDX-26 Detalle de Pokémon
- [ ] PDX-27 Voz IA (ElevenLabs)
- [ ] PDX-29 Visor 3D (Three.js)
- [ ] PDX-30 Favoritos y capturados
- [ ] PDX-32 Team Builder

## Colaboradores

- Desarrollador Web (Frontend): [@autimioc13](https://github.com/autimioc13)
- Desarrollador Software (Backend): (agregar usuario de GitHub del socio)
