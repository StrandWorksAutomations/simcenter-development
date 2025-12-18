# Donor/Benefactor Presentation Page - Complete Guide

## Overview
The presentation page at `/app/(dashboard)/presentation/page.tsx` is a comprehensive, professional presentation tool designed specifically for donor and benefactor pitches for the Baptist Health Lexington Healthcare Simulation Center.

## Access
Navigate to: **http://localhost:3000/presentation** (or your deployment URL)

## Key Features

### 1. Multiple View Modes

The presentation offers four distinct view modes, each optimized for different presentation scenarios:

#### **Executive View** (High-Level Overview)
- **Purpose**: Quick, impactful overview for busy executives
- **Content**:
  - Vision statement with prominent display
  - 4 key impact metrics (professionals trained, lives saved, error reduction, retention)
  - Problem vs. Solution comparison cards
  - Performance radar chart (with vs. without simulation)
  - Funding progress tracker
- **Best For**: Initial meetings, board presentations, quick pitches

#### **Detailed View** (Comprehensive Breakdown)
- **Purpose**: In-depth financial and operational analysis
- **Content**:
  - Facility overview with real-time metrics from Zustand store
  - CAPEX breakdown with visual progress bars
  - OPEX breakdown with annual costs
  - 5-year financial projection chart
  - Key operational metrics (cost per session, annual sessions, etc.)
- **Best For**: Finance committee meetings, detailed planning sessions

#### **Visual Tour** (Media-Rich Experience)
- **Purpose**: Immersive, visual exploration of the facility
- **Content**:
  - 3D facility walkthrough placeholder (ready for Three.js/React Three Fiber integration)
  - Video demonstration sections (YouTube/Vimeo embed ready)
  - AI-generated floor plan showcase with tabbed views
  - Market growth visualization
  - Interactive facility view selector
- **Best For**: Community presentations, donor tours, media events

#### **Investment Brief** (Donor Focus)
- **Purpose**: Direct appeal to potential donors and benefactors
- **Content**:
  - Investment summary with 3 key metrics
  - Detailed naming opportunities (4 tiers: Platinum, Gold, Silver, Bronze)
  - Impact projections over 5 years
  - Healthcare leader testimonials
  - Recognition benefits for each tier
- **Best For**: Major donor meetings, fundraising events, legacy planning

### 2. Hero Section

**Dynamic Highlights**:
- Real-time investment amount pulled from budget simulator
- 5,000+ learners annually projection
- 250+ lives saved per year estimate
- $5.8M cost avoidance calculation

**Visual Design**:
- Gradient background (blue-900 → blue-800 → indigo-900)
- Badge indicators (Investment Opportunity, High Impact)
- Four highlight cards with icons and statistics

### 3. Data Integration

**Live Budget Data** (from Zustand Store):
```typescript
- results.capex.net (Phase 1 CAPEX)
- results.fiveYear.totalCost (5-year total)
- results.opex.annual (Annual operating expenses)
- params.simRooms (Number of simulation rooms)
- params.floorArea (Total square footage)
- params.highFidelityManikins (Equipment count)
- All detailed line items and breakdowns
```

**Static Research Data**:
- Market growth projections
- ROI scenarios (Conservative, Base Case, Optimistic)
- Benchmark comparisons with peer institutions
- Impact metrics and KPIs

### 4. Interactive Visualizations

**Chart Types Used**:
- **Radar Chart**: With vs. Without Simulation comparison
- **Area Chart**: 5-year financial projection
- **Line Chart**: Market growth trajectory
- **Progress Bars**: Individual budget category breakdowns
- **Funding Progress**: Goal tracking with percentage completion

**All charts**:
- Responsive design
- Dark mode compatible
- Custom color schemes aligned with brand
- Interactive tooltips
- Print-friendly rendering

### 5. Naming & Sponsorship Tiers

#### Platinum Tier - $5,000,000
- **Opportunity**: Entire Simulation Center Naming Rights
- **Benefits**:
  - Permanent building naming rights
  - Dedication ceremony with regional media coverage
  - Prominent lobby recognition display
  - VIP access to all simulation events
  - Annual impact report presentations
  - Invitation to serve on advisory board

#### Gold Tier - $1,000,000 (3 opportunities)
- **Opportunities**:
  - Labor & Delivery Simulation Suite
  - Trauma/Emergency Simulation Suite
  - Operating Room Simulation Suite
- **Benefits**:
  - Suite naming plaques
  - Dedication event
  - Quarterly impact updates
  - Suite tour privileges
  - Recognition on website

#### Silver Tier - $500,000 (3 opportunities)
- **Opportunities**:
  - Pediatric/Neonatal Suite
  - Control Room & Technology Center
  - Skills Lab & Training Center
- **Benefits**:
  - Room naming recognition
  - Annual donor appreciation event
  - Bi-annual progress reports
  - Website recognition

#### Bronze Tier - $250,000 (5 opportunities)
- **Opportunities**:
  - Equipment Sponsorship Package
  - Debrief & Education Rooms
  - Simulation Equipment Collections
- **Benefits**:
  - Equipment naming plaques
  - Recognition wall listing
  - Annual impact summary
  - Newsletter features

### 6. Impact Projections

**5-Year Projected Impact**:
- **25,000+** healthcare professionals trained
- **1,250+** lives potentially saved
- **60%** reduction in preventable errors
- **500+** nurses retained through better training

**Annual Impact**:
- **5,000** learners annually
- **250** lives saved per year
- **35%** reduction in medical errors
- **40%** improvement in nurse retention

### 7. Social Proof & Testimonials

Three featured testimonials from:
- Chief Nursing Officer (turnover reduction results)
- Emergency Department Nurse (personal impact story)
- Hospital CEO (ROI validation)

Each testimonial includes:
- Emoji avatar placeholder (ready for real photos)
- Quote
- Name, role, and organization
- Styled card with borders

### 8. Call-to-Action Section

**Always visible** at the bottom of every view mode:

**Primary Actions**:
- **Schedule a Presentation** button
- **Download Full Proposal** button

**Contact Information**:
- Email: development@baptisthealth.com
- Phone: (859) 260-6104
- Location: Lexington, KY

**Visual Design**:
- Gradient background (blue-600 → blue-700 → indigo-700)
- White text for high contrast
- Icon integration (Calendar, Download, Mail, Phone, MapPin)
- Responsive grid layout for contact details

### 9. Print Functionality

**Print Button** features:
- Automatically sets print mode
- Removes interactive elements for printing
- Converts to printer-friendly black and white
- Preserves layout and content hierarchy
- Accessible via button in hero section

**Print Styles**:
```css
@media print {
  .print-mode {
    background: white !important;
  }
  button {
    display: none !important;
  }
}
```

### 10. Export Capabilities

**Export PDF Button** (Ready for implementation):
- Placeholder for PDF generation
- Can integrate libraries like:
  - `jsPDF` for client-side PDF generation
  - `react-pdf` for PDF rendering
  - Server-side PDF generation with Puppeteer

## Technical Details

### Dependencies
```json
{
  "react": "^19.0",
  "next": "^16.0",
  "recharts": "^2.x",
  "lucide-react": "latest",
  "zustand": "^4.x"
}
```

### Components Used
- Card, CardContent, CardHeader, CardTitle, CardDescription
- Badge
- Button
- Tabs, TabsContent, TabsList, TabsTrigger
- Progress
- All Recharts chart components
- 40+ Lucide React icons

### State Management
```typescript
const { params, results } = useSimulationStore()
```
- Pulls live data from global Zustand store
- Automatically updates when budget parameters change
- Persistent across page navigation

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Charts resize responsively
- Touch-friendly interface
- Optimized for large screens/projectors

## Future Enhancements

### Planned Integrations

#### 1. 3D Facility Visualization
**Location**: Visual Tour → Interactive 3D Facility Walkthrough

**Recommended Stack**:
```typescript
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
```

**Implementation Plan**:
- Replace placeholder with React Three Fiber Canvas
- Load 3D models (.glb/.gltf format)
- Add camera controls and animations
- Implement room highlighting on click
- Add measurement overlays

#### 2. Video Integration
**Location**: Visual Tour → Video Walkthrough

**Recommended Stack**:
```typescript
import ReactPlayer from 'react-player'
```

**Implementation Plan**:
- Replace placeholder with ReactPlayer
- Support YouTube, Vimeo, direct video files
- Add custom controls
- Implement chapter markers
- Analytics tracking for engagement

#### 3. AI Floor Plan Generation
**Location**: Visual Tour → AI-Generated Floor Plans

**Recommended Stack**:
```typescript
// Use AI image generation or floor plan libraries
import { FloorPlanViewer } from '@floor-plan-lib'
```

**Implementation Plan**:
- Generate floor plans based on params
- Interactive room highlighting
- Dimension annotations
- Export to CAD formats

#### 4. Animation Effects
**Recommended Stack**:
```typescript
import { motion } from 'framer-motion'
```

**Implementation Plan**:
- Animated number counters for impact metrics
- Page transition animations
- Card hover effects with 3D tilt
- Scroll-triggered animations

#### 5. Email Integration
**For Call-to-Action Buttons**:

```typescript
const handleSchedulePresentation = () => {
  window.location.href = 'mailto:development@baptisthealth.com?subject=Simulation Center Presentation Request'
}
```

## Usage Guidelines

### For Presentations

1. **Start with Executive View** for initial impact
2. **Switch to Visual Tour** to show facility potential
3. **Present Investment Brief** to discuss naming opportunities
4. **Use Detailed View** to answer technical questions
5. **End with Call-to-Action** to secure next steps

### For Different Audiences

**Board of Directors**: Executive View → Investment Brief
**Major Donors**: Executive View → Investment Brief → Visual Tour
**Community Groups**: Visual Tour → Executive View
**Finance Committee**: Detailed View → Investment Brief
**Media/Press**: Visual Tour → Executive View

### Customization Points

**Easy to Update**:
- Impact numbers in `impactMetrics` array
- Testimonials in `testimonials` array
- Naming tiers in `namingTiers` array
- Contact information in Call-to-Action section
- Chart data arrays

**Moderate Complexity**:
- Color schemes in `CHART_COLORS`
- View mode layouts
- Card layouts and styling

**Advanced**:
- Integration with CMS for dynamic content
- Real-time funding progress from database
- User authentication for donor portals

## Performance Optimization

### Current Optimizations
- Client-side rendering for interactivity
- Lazy loading of chart data
- Memoized calculations
- Responsive image placeholders

### Recommended Additions
```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

## Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast ratios
- Focus indicators
- Screen reader compatible

## Browser Compatibility

**Tested On**:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Known Issues**:
- Print mode may vary by browser
- 3D visualizations require WebGL support

## File Location
```
/Users/jonathanbouren/PROJECTS/Simulation/app/
└── app/
    └── (dashboard)/
        └── presentation/
            └── page.tsx (52KB)
```

## Navigation Integration
Added to dashboard layout at `/app/(dashboard)/layout.tsx`:
```typescript
{
  title: "Presentation",
  items: [
    { name: "Donor Presentation", href: "/presentation", icon: Presentation },
    { name: "3D Facility", href: "/facility-3d", icon: Box },
    { name: "Investor Deck", href: "/investor-deck", icon: Presentation },
  ]
}
```

## Support & Maintenance

**For Updates**:
1. Update data arrays for new testimonials, metrics, etc.
2. Modify chart data for new projections
3. Adjust color schemes in `CHART_COLORS` constant
4. Update contact information in Call-to-Action

**For Issues**:
- Check browser console for errors
- Verify Zustand store is populated
- Ensure all dependencies are installed
- Check responsive breakpoints

## License & Credits
Built for Baptist Health Lexington Healthcare Simulation Center
Developed using Next.js 15, React 19, Tailwind CSS, Recharts, and Lucide Icons
