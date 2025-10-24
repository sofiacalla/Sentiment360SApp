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
3. Matrix Visualization: Square aspect-ratio 2x2 grid
4. AI Insights Panel: Full-width card at bottom with expandable recommendations

### Impact Tracker
**Structure:**
1. KPI Overview: 3-column grid of before/after comparison cards
2. Timeline Charts: Stacked single-column charts (Time-to-Resolution, DAU, Retention)
3. Integration Status: Horizontal card showing connected channels with icons

---

## Interaction Patterns

**Chart Interactions:**
- Hover states reveal detailed tooltips with exact values
- Time period selectors (7D, 30D, 90D, All) as pill-shaped button groups
- Export/Download icons positioned top-right of chart cards

**Navigation:**
- Active tab: Underline indicator (border-b-2) with smooth transition
- Tab transitions: Fade-in/fade-out content areas (duration-200)

**Loading States:**
- Skeleton screens for charts using animated pulse effects
- Placeholder bars/lines matching chart structure

---

## Responsive Behavior

**Breakpoint Strategy:**
- Mobile (base): Single-column stacked layout, simplified charts
- Tablet (md): 2-column grids, condensed navigation
- Desktop (lg): Full 3-4 column layouts, expanded chart details

**Chart Responsiveness:**
- Mobile: Simplified visualizations, essential data only
- Desktop: Full detailed charts with all data points and annotations

---

## Accessibility Standards
- ARIA labels for all chart elements and interactive components
- Keyboard navigation support for tab switching and chart interactions
- Focus indicators on all interactive elements (ring-2 with offset)
- Sufficient contrast for all text elements over backgrounds
- Screen reader announcements for dynamic data updates

---

## Images
**No hero images required** - This is a utility-focused dashboard application where data visualization is the primary visual element. Charts, graphs, and metrics provide all necessary visual interest.