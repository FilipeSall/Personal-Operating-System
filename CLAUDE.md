# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal OS is a React-based personal organization system featuring a calendar with integrated todo management and weather forecasting. Built with TypeScript, Vite, Panda CSS, and Zustand for state management.

## AGENT.md Files

**IMPORTANT**: This project uses AGENT.md files for modular, context-specific documentation.

- **Always read** relevant AGENT.md files before working on a specific module or feature
- **Always update** AGENT.md files when modifying workflows, adding features, or changing architecture in that module
- AGENT.md files should be created in directories where they provide value (e.g., `src/components/Calendar/AGENT.md`, `src/store/AGENT.md`)
- These files document specific workflows, state flows, component interactions, and implementation details for their respective modules

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview

# Generate Panda CSS (runs automatically before other commands via prepare hook)
npm run prepare
```

## Architecture

### State Management (Zustand)

The app uses three main stores located in [src/store/](src/store/):

- **useCalendarStore** ([src/store/useCalendarStore.ts](src/store/useCalendarStore.ts)) - Manages todos, selected dates, and special dates
  - Todos are stored by date as `Record<string, Todo[]>` where keys are ISO date strings (`yyyy-MM-dd`)
  - Handles complex repeat logic (daily, weekly, custom weekdays) with durations (month, quarter, year, forever)
  - Delete operations support scopes: single, week, month, or all instances of a recurring todo
  - Each todo has an `originalTodoId` to track recurring instances

- **useWeatherStore** ([src/store/useWeatherStore.ts](src/store/useWeatherStore.ts)) - Manages weather forecasts and location data
  - Forecasts stored as `Map<string, WeatherSnapshot>` keyed by date
  - Fetches both 5-day forecast and current weather from OpenWeather API
  - Uses geolocation and reverse geocoding for location detection
  - Includes abort signal support for request cancellation

- **useAppStore** ([src/store/useAppStore.ts](src/store/useAppStore.ts)) - Generic app state (currently minimal)

### Component Structure

Components follow a separation pattern in [src/components/Calendar/](src/components/Calendar/):
- **Component logic files** (`.tsx` without "View") contain hooks and business logic
- **View files** (`*View.tsx`) contain presentational JSX
- **Styles** are colocated in [src/components/Calendar/styles/](src/components/Calendar/styles/) using Panda CSS patterns
- **Hooks** in [src/components/Calendar/hooks/](src/components/Calendar/hooks/) for reusable logic
- **Utils** in [src/components/Calendar/utils/](src/components/Calendar/utils/) for pure functions
- **Constants** in [src/components/Calendar/consts/](src/components/Calendar/consts/) for configuration data

### Styling with Panda CSS

Styles are generated via Panda CSS into the `styled-system/` directory (gitignored):
- Configuration: [panda.config.ts](panda.config.ts)
- Custom theme tokens for colors, fonts, and breakpoints
- Global font: Montserrat (primary), Roboto (secondary)
- Color system: `brand`, `amber`, `surface`, `text`, `danger`, `success` with numeric variants
- Import from `styled-system/css` for CSS utilities
- Always run `npm run prepare` after changing panda.config.ts

### Type Definitions

TypeScript types organized by domain in [src/types/](src/types/):
- **calendar.ts** - Todo types, repeat configurations, special dates
- **weather.ts** - Weather snapshot structure
- **openWeather.ts** - OpenWeather API response types

### External Services

- **Firebase** ([src/config/firebase.ts](src/config/firebase.ts)) - Analytics only, config is public
- **OpenWeather API** ([src/services/openWeatherService.ts](src/services/openWeatherService.ts))
  - Requires `VITE_OPENWEATHER_API_KEY` environment variable
  - Uses metric units and Portuguese language by default
  - Fetches 5-day forecast, current weather, and reverse geocoding

### Routing

Simple React Router setup in [src/routes.tsx](src/routes.tsx):
- Single route at `/` showing the Home page
- Error boundary via ErrorPage

## Key Patterns

### Date Handling
- Uses `date-fns` for all date operations
- Date keys in stores use ISO format: `yyyy-MM-dd`
- Weekdays represented as abbreviated strings: `'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'`

### Todo Repeat Logic
When adding recurring todos, the system:
1. Creates the original todo with a unique ID
2. Generates instances for each occurrence within the duration window
3. Links instances via `originalTodoId` for batch operations
4. Duration options: month (30 days), quarter (90 days), year (365 days), forever (730 days)

### Component Naming
- Container/logic components: `ComponentName.tsx`
- Presentational components: `ComponentNameView.tsx`
- Modals: `*Modal.tsx` and `*ModalView.tsx`
- Custom hooks: `use*.ts` in hooks directory
- Style definitions: `*.styles.ts` exporting Panda CSS classes

### File Organization
```
src/
├── components/Calendar/        # Main feature components
│   ├── AddTodoModal/          # Todo creation modal
│   ├── TodoDetailModal/       # Todo view/edit modal
│   ├── CalendarDayCell/       # Individual day cells
│   ├── CalendarGrid/          # Calendar grid layout
│   ├── Weather/               # Weather display and modal
│   ├── styles/                # Panda CSS style definitions
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Pure utility functions
│   └── consts/                # Constants and config data
├── config/                    # External service configs
├── data/                      # Static data (holidays, types)
├── pages/                     # Route page components
├── services/                  # External API integrations
├── store/                     # Zustand stores
├── styles/                    # Global styles
├── types/                     # TypeScript type definitions
└── utils/                     # Shared utility functions
```

## Notes

- The app uses React 19 with StrictMode enabled
- Vite is configured with SWC for fast refresh
- styled-system directory is auto-generated by Panda CSS - don't edit manually
- All weather data is cached in Zustand store to minimize API calls
- Geolocation permission is requested for weather features
