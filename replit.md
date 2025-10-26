<!--
PROJECT DOCUMENTATION: REPLIT.MD

PURPOSE:
This file serves as the central knowledge base for the Sentiment360 project.
It documents the complete technical architecture, user preferences, and system
design decisions to maintain context across development sessions.

IMPORTANT:
- This file is automatically read by AI agents when resuming work on the project
- Keep it updated as the architecture evolves and new features are added
- Message history resets between sessions - this file is the primary memory

WHEN TO UPDATE:
- After adding/removing major features or dependencies
- When architectural decisions change (e.g., switching ORMs, adding auth)
- When user expresses new preferences or workflow requirements
- After significant refactoring or project structure changes

SECTIONS:
1. Overview: Project purpose and main features
2. User Preferences: Communication style and workflow preferences
3. System Architecture: Complete technical stack documentation
4. External Dependencies: Third-party libraries and their purposes
5. Recent Changes: Timestamped log of significant modifications
-->

# Sentiment360 - Customer Sentiment Analytics Platform

## Overview

Sentiment360 is a data-intensive analytics platform designed to track, analyze, and act on customer feedback across multiple channels. The application provides real-time sentiment analysis, prioritization recommendations, and impact tracking to help businesses improve customer experience through data-driven insights.

The platform features four main sections:
- **Dashboard**: Real-time sentiment metrics, regional analysis, and feedback highlights
- **Prioritization Engine**: Data-driven recommendations for improvement areas based on impact vs. effort analysis
- **Impact Tracker**: Measurement of initiative success and usage metrics over time
- **Manage**: Administrative interface for adding feedback and priority items

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with Wouter, a lightweight routing library. The application uses a single-page architecture with four main routes (Dashboard, Prioritization, Impact Tracker, Manage).

**State Management**: TanStack Query (React Query) for server state management, providing automatic caching, background refetching, and optimistic updates. No global client state management library is used - component-level state handles local UI concerns.

**UI Component System**: shadcn/ui components built on Radix UI primitives, providing accessible, customizable components following the "New York" style variant. The design system emphasizes:
- Linear-inspired refined aesthetics
- High information density for analytics dashboards
- Clear visual hierarchies for data interpretation
- Tailwind CSS for styling with a custom design token system

**Data Visualization**: Chart.js for rendering interactive charts (bar charts, line charts, multi-axis charts) displaying sentiment trends, regional data, and usage metrics.

**Styling Strategy**: Tailwind CSS with custom configuration including:
- Custom color system using CSS variables for theme flexibility
- Spacing primitives limited to multiples of 2, 4, 6, and 8
- Typography system using Inter for UI and JetBrains Mono for data/metrics
- Responsive grid layouts optimized for dashboard cards

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript, configured as an ES module project.

**API Design**: RESTful API pattern with the following endpoint structure:
- GET endpoints for data retrieval (regional sentiment, feedback, trends, metrics, insights)
- POST endpoints for data creation (feedback, priority items, AI insights)
- JSON request/response format with Zod schema validation

**Development Integration**: Vite middleware mode for hot module replacement during development, with custom logging for API requests showing method, path, status, duration, and response preview.

**Data Access Layer**: Storage abstraction interface (`IStorage`) decoupling business logic from database implementation, enabling easier testing and potential database migrations.

### Database Architecture

**ORM**: Drizzle ORM for type-safe database queries with PostgreSQL dialect.

**Database Provider**: Neon serverless PostgreSQL with WebSocket-based connection pooling for serverless compatibility.

**Schema Design**:
- **Regional Sentiment**: Aggregated sentiment scores by geographic region
- **Feedback**: Individual customer feedback entries with sentiment classification, source tracking, and regional attribution
- **Sentiment Trends**: Time-series data for sentiment score evolution
- **Priority Items**: Improvement initiatives with impact/effort scoring and categorization
- **AI Insights**: Generated recommendations with priority levels and impact descriptions
- **Impact Metrics**: Before/after comparison data for measuring initiative success
- **Usage Metrics**: Weekly active user and satisfaction tracking
- **Channels**: Integrated customer communication channel definitions

All tables use UUID primary keys generated via PostgreSQL's `gen_random_uuid()` function. Timestamps track data freshness where applicable.

**Migration Strategy**: Drizzle Kit handles schema migrations with files stored in the `/migrations` directory. Database provisioning required via `DATABASE_URL` environment variable.

### Authentication & Authorization

Currently not implemented - the application operates without user authentication. This is a greenfield consideration for future development.

### Form Handling & Validation

**Form Management**: React Hook Form for form state management in the Manage interface.

**Validation**: Zod schemas (via `drizzle-zod`) provide runtime type validation for:
- API request payloads
- Database insert operations
- Form submissions

Validation errors surface through the UI toast notification system.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Headless component primitives (dialogs, dropdowns, tooltips, etc.) providing accessibility features
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Supplementary icons, specifically for social media platform logos (Twitter/X, Facebook, Instagram)

### Data Visualization
- **Chart.js**: Canvas-based charting library for rendering sentiment trends, regional comparisons, and usage metrics

### Utility Libraries
- **date-fns**: Date formatting and manipulation (e.g., "3 hours ago" relative timestamps)
- **clsx & tailwind-merge**: Conditional className composition and Tailwind class conflict resolution
- **class-variance-authority**: Type-safe component variant system

### Development Tools
- **TypeScript**: Static type checking across client, server, and shared code
- **Vite**: Build tool and dev server with HMR support
- **ESBuild**: Production bundling for server code
- **PostCSS & Autoprefixer**: CSS processing pipeline

### Database & Backend
- **@neondatabase/serverless**: PostgreSQL client optimized for serverless environments
- **Drizzle ORM**: Type-safe database toolkit with schema management
- **ws**: WebSocket library required for Neon serverless connections

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code mapping for debugging
- **@replit/vite-plugin-dev-banner**: Development environment indicator

These Replit plugins are conditionally loaded only in development mode when running in a Replit environment.

### Session Management
- **connect-pg-simple**: PostgreSQL session store (dependency present but session implementation not yet active)

---

## Recent Changes

### October 26, 2025 - Code Documentation Enhancement
- Added comprehensive section-level comments throughout entire codebase
- **Frontend**: Updated all 17 client-side files (pages, components, utilities) with clear explanations
- **Backend**: Enhanced server/db.ts and server/index.ts with detailed architecture documentation
- **Library Files**: Added extensive comments to queryClient.ts (TanStack Query config) and utils.ts (className utility)
- **Documentation**: Added header descriptions to design_guidelines.md and replit.md
- **Comment Philosophy**: Focus on WHAT each section does, WHY it exists, and HOW it fits into the application
- **Note**: server/vite.ts is protected and cannot be modified (critical Vite configuration)
