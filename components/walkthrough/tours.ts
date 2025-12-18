import type { WalkthroughTour } from './walkthrough-provider'

// =============================================================================
// DASHBOARD TOUR
// =============================================================================

export const dashboardTour: WalkthroughTour = {
  id: 'dashboard-tour',
  name: 'Dashboard Overview',
  description: 'Learn how to navigate the Simulation Center Planning Dashboard',
  steps: [
    {
      id: 'welcome',
      target: 'h1',
      title: 'Welcome to the Simulation Center Planner',
      content: 'This dashboard helps you plan and track all aspects of building a healthcare simulation center for Baptist Health Lexington. Let\'s take a quick tour!',
      position: 'bottom'
    },
    {
      id: 'stats-cards',
      target: '.grid.gap-4',
      title: 'Key Metrics at a Glance',
      content: 'These cards show your project\'s critical numbers: total budget, timeline, construction costs, equipment costs, and project progress. They update automatically as you add data.',
      position: 'bottom'
    },
    {
      id: 'planning-progress',
      target: '[class*="Progress"]',
      title: 'Planning Progress Tracker',
      content: 'This bar shows how many of the 24 planning modules have been completed. Each module represents a key area - from benchmarking to accreditation.',
      position: 'top'
    },
    {
      id: 'navigation',
      target: 'nav',
      title: 'Site Navigation',
      content: 'Use the sidebar to navigate between different sections: Benchmarks, Construction, Budget, Vendors, Operations, and more. Each page focuses on a specific aspect of your planning.',
      position: 'right'
    }
  ]
}

// =============================================================================
// BENCHMARKS TOUR
// =============================================================================

export const benchmarksTour: WalkthroughTour = {
  id: 'benchmarks-tour',
  name: 'Benchmarking Guide',
  description: 'Understand how to use benchmark data for planning',
  steps: [
    {
      id: 'benchmark-intro',
      target: 'h1',
      title: 'Peer Center Benchmarking',
      content: 'This page compares your planned center against 16 reference simulation centers across the country. Use this data to set realistic targets and learn from best practices.',
      position: 'bottom'
    },
    {
      id: 'tier-filter',
      target: '[class*="flex gap-2"]',
      title: 'Filter by Size Tier',
      content: 'Centers are grouped by size: Large (outliers like OSF at $50M), Medium, and Comparable (similar to BHL\'s planned center). Click "Comparable" to see the most relevant benchmarks.',
      position: 'bottom'
    },
    {
      id: 'aggregate-stats',
      target: '.grid.gap-4.md\\:grid-cols-4',
      title: 'Aggregate Statistics',
      content: 'These cards show averages across selected centers: investment, square footage, staff, and learners per year. Toggle centers to see how averages change.',
      position: 'bottom'
    },
    {
      id: 'center-cards',
      target: '[class*="space-y-4"]',
      title: 'Individual Center Profiles',
      content: 'Each card shows details about a peer center including their funding model, staffing, technology, and outcomes. Click to expand for full details.',
      position: 'top'
    }
  ]
}

// =============================================================================
// CONSTRUCTION TOUR
// =============================================================================

export const constructionTour: WalkthroughTour = {
  id: 'construction-tour',
  name: 'Construction Planning Guide',
  description: 'Navigate the construction estimate dashboard',
  steps: [
    {
      id: 'construction-overview',
      target: 'h1',
      title: 'Construction & Renovation',
      content: 'This page breaks down the construction budget by CSI division (industry standard categories). Use it to track estimates, enter official bids, and monitor progress.',
      position: 'bottom'
    },
    {
      id: 'cost-tabs',
      target: '[role="tablist"]',
      title: 'View Different Aspects',
      content: 'Switch between tabs to see: Cost Breakdown (by CSI division), Timeline (Gantt chart), Risks (heat map), and Alternates (nice-to-have items).',
      position: 'bottom'
    },
    {
      id: 'csi-table',
      target: 'table',
      title: 'CSI Division Costs',
      content: 'Each row represents a CSI division (demolition, electrical, plumbing, etc.). Costs shown are ROM (Rough Order of Magnitude) estimates - replace with official bids as they come in.',
      position: 'top'
    }
  ]
}

// =============================================================================
// CAPEX TOUR
// =============================================================================

export const capexTour: WalkthroughTour = {
  id: 'capex-tour',
  name: 'CAPEX Calculator Guide',
  description: 'Use the capital expenditure calculator',
  steps: [
    {
      id: 'capex-intro',
      target: 'h1',
      title: 'CAPEX Cost Model',
      content: 'This interactive calculator estimates your total capital expenditure across 7 categories. Adjust parameters to see how they affect the bottom line.',
      position: 'bottom'
    },
    {
      id: 'parameters',
      target: '[class*="Slider"]',
      title: 'Adjust Parameters',
      content: 'Use these sliders to change floor area, number of sim rooms, construction type, and quality level. The budget updates in real-time as you adjust.',
      position: 'right'
    },
    {
      id: 'existing-assets',
      target: '[class*="emerald"]',
      title: 'Credit for Existing Assets',
      content: 'Your existing equipment (like the SimMan 3G Plus you already own) is credited against the budget. This shows your true NET investment needed.',
      position: 'top'
    },
    {
      id: 'scenarios',
      target: '[value="scenarios"]',
      title: 'Compare Scenarios',
      content: 'The Scenarios tab lets you compare different build options: Base (3 rooms), Enhanced (5 rooms), Budget, or New Building. Click any scenario to apply those parameters.',
      position: 'bottom'
    }
  ]
}

// =============================================================================
// OPERATIONS TOUR
// =============================================================================

export const operationsTour: WalkthroughTour = {
  id: 'operations-tour',
  name: 'Operations Model Guide',
  description: 'Understand operational workflows and KPIs',
  steps: [
    {
      id: 'ops-intro',
      target: 'h1',
      title: 'Operations Model',
      content: 'This page defines HOW your simulation center will run day-to-day: from intake requests to debriefing to monthly reviews. It\'s your operational playbook.',
      position: 'bottom'
    },
    {
      id: 'workflows',
      target: '[value="workflows"]',
      title: 'Workflow Stages',
      content: 'Seven key workflow stages from Request Intake through Video Governance. Click each to see process steps and RACI matrix (who is Responsible, Accountable, Consulted, Informed).',
      position: 'bottom'
    },
    {
      id: 'kpis',
      target: '[value="kpis"]',
      title: 'Key Performance Indicators',
      content: 'Track 15 KPIs across 5 categories: Volume, Efficiency, Quality, Outcomes, and Operational. Each has a target and measurement frequency.',
      position: 'bottom'
    },
    {
      id: 'templates',
      target: '[value="templates"]',
      title: 'Document Templates',
      content: 'Four standardized templates for every simulation session: Request Form, Run Sheet, Debrief Record, and Summary Report. Click to see the fields each contains.',
      position: 'bottom'
    }
  ]
}

// =============================================================================
// PROCUREMENT TOUR
// =============================================================================

export const procurementTour: WalkthroughTour = {
  id: 'procurement-tour',
  name: 'Procurement Guide',
  description: 'Navigate the procurement playbook',
  steps: [
    {
      id: 'procurement-intro',
      target: 'h1',
      title: 'Procurement Playbook',
      content: 'This page guides your RFQ process for simulators, A/V systems, and support services. It includes evaluation criteria, acceptance testing, and contract clauses.',
      position: 'bottom'
    },
    {
      id: 'rfq-categories',
      target: '[value="rfq"]',
      title: 'RFQ Categories & Weights',
      content: 'Five evaluation categories with assigned weights: Simulators (20%), A/V System (20%), LMS Integration (10%), Service/Support (20%), and Pricing (30%). Click each to see detailed criteria.',
      position: 'bottom'
    },
    {
      id: 'acceptance',
      target: '[value="acceptance"]',
      title: 'Acceptance Testing',
      content: 'Two phases of testing: FAT (Factory Acceptance Test) before delivery, and SAT (Site Acceptance Test) after installation. Each has specific pass/fail criteria.',
      position: 'bottom'
    },
    {
      id: 'milestones',
      target: '[value="milestones"]',
      title: 'Payment Milestones',
      content: 'Payments tied to milestones: 10% at signing, 30% at delivery, 30% at installation, 20% at SAT completion, and 10% holdback for 90 days after go-live.',
      position: 'bottom'
    }
  ]
}

// =============================================================================
// VENDORS TOUR
// =============================================================================

export const vendorsTour: WalkthroughTour = {
  id: 'vendors-tour',
  name: 'Vendors & Equipment Guide',
  description: 'Explore equipment catalog and inventory',
  steps: [
    {
      id: 'vendors-intro',
      target: 'h1',
      title: 'Equipment & Vendors',
      content: 'This page catalogs all simulation equipment options, existing inventory, and procedural supplies. Use it to plan purchases and track what you already have.',
      position: 'bottom'
    },
    {
      id: 'vendor-list',
      target: '[value="vendors"]',
      title: 'Vendor Profiles',
      content: 'Click any vendor to see their full product lineup. Each product shows price range, warranty, annual maintenance cost, and lifecycle. Click products for full specifications.',
      position: 'bottom'
    },
    {
      id: 'inventory',
      target: '[value="inventory"]',
      title: 'Existing Inventory',
      content: 'Equipment BHL already owns, including the new SimMan 3G Plus. This inventory is credited against your budget in the CAPEX calculator.',
      position: 'bottom'
    },
    {
      id: 'supplies',
      target: '[value="supplies"]',
      title: 'Procedural Supplies',
      content: 'Expired hospital supplies available for training: chest tubes, foleys, IV pumps, and more. Having these reduces ongoing consumable costs significantly.',
      position: 'bottom'
    }
  ]
}

// =============================================================================
// MAIN SITE TOUR (Comprehensive)
// =============================================================================

export const mainSiteTour: WalkthroughTour = {
  id: 'main-site-tour',
  name: 'Complete Site Tour',
  description: 'A comprehensive introduction to the entire planning platform',
  steps: [
    {
      id: 'welcome',
      target: 'h1',
      title: 'Welcome to Your Simulation Center Planner',
      content: 'This platform consolidates all planning data for the BHL Simulation Center into one interactive dashboard. It covers 24 planning modules across every aspect of your project.',
      position: 'bottom'
    },
    {
      id: 'data-source',
      target: '.grid.gap-4',
      title: 'Data-Driven Planning',
      content: 'All numbers you see come from detailed research: industry benchmarks, construction estimates, vendor pricing, staffing models, and operational standards. This isn\'t guesswork - it\'s evidence-based planning.',
      position: 'bottom'
    },
    {
      id: 'navigation',
      target: 'nav',
      title: 'Navigate by Topic',
      content: 'The sidebar organizes content by planning area. Start with Benchmarks to see peer centers, then Construction for costs, CAPEX for budget modeling, Operations for workflows, and more.',
      position: 'right'
    },
    {
      id: 'interactive',
      target: '[class*="TabsList"]',
      title: 'Everything is Interactive',
      content: 'Most pages have tabs to view different aspects. Charts are interactive - hover for details. Tables can be edited. Scenarios can be compared. Explore and customize!',
      position: 'bottom'
    },
    {
      id: 'progress',
      target: '[class*="Progress"]',
      title: 'Track Your Progress',
      content: 'The progress bar shows how much of the planning framework is complete. As more modules are completed, more pages become available with richer data.',
      position: 'top'
    },
    {
      id: 'help',
      target: 'body',
      title: 'Need Help?',
      content: 'Look for the "Take a Tour" button on any page for a guided walkthrough of that section. You can also use keyboard arrows (← →) to navigate tours, or press Escape to exit.',
      position: 'bottom'
    }
  ]
}

// =============================================================================
// EXPORT ALL TOURS
// =============================================================================

export const allTours = {
  dashboard: dashboardTour,
  benchmarks: benchmarksTour,
  construction: constructionTour,
  capex: capexTour,
  operations: operationsTour,
  procurement: procurementTour,
  vendors: vendorsTour,
  main: mainSiteTour
}
