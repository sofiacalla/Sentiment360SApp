<!--
DESIGN GUIDELINES DOCUMENT

PURPOSE:
This file defines the visual design system for Sentiment360, ensuring consistency
across all pages, components, and data visualizations. It serves as the single
source of truth for typography, spacing, colors, and component patterns.

WHEN TO USE THIS FILE:
- Before building new UI components or pages
- When making styling decisions (spacing, colors, typography)
- To maintain visual consistency across the application
- As a reference for component structure and layout patterns

AUDIENCE:
- Developers building frontend components
- Designers reviewing visual implementation
- AI agents making frontend modifications

ORGANIZATION:
The guidelines are organized by category:
1. Typography System (fonts, sizes, weights)
2. Layout System (spacing, grids, containers)
3. Component Library (specific component patterns)
4. Color System (theme colors and usage)
5. Page-Specific Layouts (dashboard-level structure)

DESIGN PHILOSOPHY:
Sentiment360 prioritizes clarity and information density for analytics dashboards,
inspired by Linear's refined aesthetics and Material Design's data visualization
principles. The design emphasizes functional elegance over decorative elements.
-->

# Sentiment360 Design Guidelines

## Design Approach
**Selected Framework:** Design System Approach inspired by Linear's refined aesthetics and Material Design's data visualization principles, optimized for analytics dashboards that prioritize clarity and information hierarchy.

**Rationale:** Sentiment360 is a data-intensive analytics platform requiring exceptional information density management, clear visual hierarchies for chart interpretation, and intuitive navigation across multiple dashboard views. The design emphasizes functional elegance over decorative elements.

---

## Typography System

**Font Families:**
- Primary: Inter (all weights 400-700) for UI elements, navigation, labels
- Headings: Inter (600-700) for section headers and dashboard titles
- Data/Metrics: SF Mono or JetBrains Mono for numerical values and statistics

**Type Scale:**
- Dashboard Titles: text-3xl (lg:text-4xl) font-semibold
- Section Headers: text-xl (lg:text-2xl) font-semibold
- Card Titles: text-lg font-medium
- Body Text: text-base
- Labels/Captions: text-sm
- Micro Data: text-xs font-medium (for chart axes, timestamps)
- Large Metrics: text-5xl (lg:text-6xl) font-bold for key performance indicators

---

## Layout System

**Spacing Primitives:** Exclusively use Tailwind units of 2, 4, 6, and 8 (e.g., p-4, gap-6, mb-8)

**Grid Structure:**
- Navigation Bar: Fixed height h-16, full-width with max-w-7xl centered container
- Main Content Area: pt-20 (to clear fixed nav), px-4 (md:px-6, lg:px-8)
- Dashboard Cards: Grid layouts using grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Chart Containers: Minimum height min-h-80 for readability

**Container Strategy:**
- Dashboard Wrapper: max-w-7xl mx-auto
- Card Components: Rounded corners rounded-lg with padding p-6
- Chart Areas: Aspect ratio maintained using aspect-video or aspect-square

---

## Component Library

### Navigation
- Horizontal tab-style navigation with active state indicators
- Three primary tabs: "Dashboard" | "Prioritization" | "Impact Tracker"
- Position: Fixed top navigation with subtle bottom border
- Layout: Flex container with space-x-6 for tab spacing

### Dashboard Cards
**Metric Cards:**
- Compact design with icon, label, value, and trend indicator
- Layout: Flex column with items-start
- Spacing: p-6 with gap-2 between elements
- Trend Arrows: Inline with percentage change (text-sm)

**Chart Cards:**
- Structured layout: Header (title + time period selector) and chart body
- Header: flex justify-between items-center mb-4
- Chart Container: min-h-80 with responsive aspect ratios
- Footer: Optional annotations or data source labels (text-xs)

### Data Visualization Components

**Regional Sentiment Map:**
- Container: aspect-video for map visualization
- Legend: Positioned absolute top-4 right-4 with compact spacing
- Region Labels: Overlay positioning with pointer-events-none

**Priority Matrix (Impact vs Effort):**
- 2x2 quadrant grid layout using grid grid-cols-2 grid-rows-2
- Quadrant Labels: text-sm font-medium positioned in each cell
- Data Points: Absolute positioned circles with varying sizes
- Axes Labels: Positioned outside grid with text-xs

**Timeline/Trend Charts:**
- Full-width line or bar chart containers
- X-axis: Time periods with text-xs labels
- Y-axis: Numerical scale with gridlines
- Data Points: Hover states for detailed tooltips

### Lists and Tables

**Prioritization List:**
- Each item: flex justify-between with padding p-4
- Ranking Badge: Circular or pill-shaped on left (w-8 h-8)
- Content: flex-1 with title (font-medium) and description (text-sm)
- Metrics: Right-aligned impact/effort indicators

**Feedback Highlights:**
- Card-based layout with quote-style presentation
- Sentiment Indicator: Icon or badge at top-left
- Quote Text: text-base with line-clamp-3 for overflow
- Metadata: flex gap-2 for timestamp, source, region

### AI Insights Section
- Distinct container with subtle background differentiation
- Icon/Badge: AI symbol with "AI-Generated Insights" label
- Insight Cards: Stacked layout with gap-4
- Each Insight: Icon, bold action verb, description paragraph
- CTA Buttons: "View Details" or "Apply Recommendation" (text-sm)

### Metric Comparison (Before/After)
- Side-by-side cards using grid grid-cols-2 gap-6
- Large Numbers: text-4xl font-bold for primary metrics
- Improvement Indicator: Prominent percentage change with visual arrow
- Subtext: Contextual information (text-sm)

---

## Page-Specific Layouts

### Customer Sentiment Dashboard
**Structure:**
1. Hero Metrics Row: Grid of 4 key metric cards (grid-cols-2 lg:grid-cols-4 gap-4)
2. Regional Map: Full-width chart card spanning entire row
3. Trends Section: 2-column grid (Recent Feedback | Sentiment Over Time)

### Prioritization Engine
**Structure:**
1. Page Header: Title + filter/sort controls (flex justify-between)
2. Priority List: Single column scrollable list with ranking
3. Impact Matrix: Full-width scatter plot visualization
4. AI Insights: Bottom section with gradient background

### Impact Tracker
**Structure:**
1. Success Metrics Grid: 3-column grid of before/after comparison cards
2. Usage Chart: Full-width dual-axis line chart
3. Channels Section: 5-column grid of integrated platform cards

---

## Color System

**Primary Palette:**
- Primary Blue: hsl(221, 83%, 53%) - Links, buttons, data points
- Secondary Gray: hsl(221, 6%, 40%) - Secondary text, labels
- Success Green: hsl(142, 76%, 36%) - Positive metrics, improvements
- Warning Yellow: hsl(38, 92%, 50%) - Alerts, moderate priority
- Error Red: hsl(0, 84%, 60%) - Negative metrics, critical issues

**Background Hierarchy:**
- Background: hsl(0, 0%, 100%) - Page background
- Card: hsl(0, 0%, 98%) - Elevated surfaces
- Muted: hsl(221, 10%, 95%) - Disabled states, subtle backgrounds

**Text Hierarchy:**
- Foreground: hsl(221, 39%, 11%) - Primary text
- Muted Foreground: hsl(221, 6%, 40%) - Secondary text
- Accent Foreground: hsl(221, 83%, 53%) - Highlighted text

**Chart Colors:**
- Bar Charts: Primary blue with 10% opacity fill
- Line Charts: Primary blue line with gradient fill
- Multi-series: Rotating palette (blue, purple, green, orange)

---

## Interactive States

**Hover Effects:**
- Cards: Subtle elevation with box-shadow transition
- Buttons: Background darkens by 10%
- Chart Data Points: Scale up slightly (transform: scale(1.1))

**Active/Focus States:**
- Navigation Links: Bottom border with primary color
- Form Inputs: Primary blue border (2px)
- Buttons: Slight inset shadow for pressed appearance

**Loading States:**
- Skeleton screens with animated gradient (pulse animation)
- Spinner icons for inline loading indicators
- Progress bars for multi-step processes

---

## Responsive Breakpoints

**Tailwind Breakpoints:**
- sm: 640px (Mobile landscape, small tablets)
- md: 768px (Tablets)
- lg: 1024px (Laptops, small desktops)
- xl: 1280px (Desktops)
- 2xl: 1536px (Large desktops)

**Responsive Strategy:**
- Mobile First: Start with mobile layout, add complexity at larger breakpoints
- Grid Collapse: Multi-column grids collapse to single column on mobile
- Chart Sizing: Maintain aspect ratios, adjust heights for readability
- Navigation: Consider hamburger menu for mobile (future enhancement)

---

## Accessibility Guidelines

**Contrast Ratios:**
- Text on background: Minimum 4.5:1 (WCAG AA)
- Large text (18pt+): Minimum 3:1
- Interactive elements: Minimum 3:1 against background

**Focus Indicators:**
- Visible outline on all interactive elements
- Custom focus rings using ring-2 ring-primary

**Semantic HTML:**
- Use proper heading hierarchy (h1 → h2 → h3)
- Label all form inputs with <label> elements
- Provide alt text for data visualization images (future)

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Modal dialogs trap focus within
- Skip links for main content (future enhancement)
