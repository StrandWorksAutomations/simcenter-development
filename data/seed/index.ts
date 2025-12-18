// Central export for all seed data
// This file consolidates all parsed research document data

// Benchmarking data - 11 reference simulation centers
export * from './benchmarks'

// Construction data - CSI divisions, milestones, risks
export * from './construction'

// Equipment data - vendors, catalog, packages
export * from './equipment'

// Staffing and OPEX data - positions, projections
export * from './staffing'

// Risk register and compliance data
export * from './risks'

// Summary statistics for dashboard
export const projectSummary = {
  // Budget Overview
  budget: {
    constructionCost: 300000,
    equipmentCost: 250000,
    totalCapex: 550000,
    contingency: 55000,
    totalWithContingency: 605000
  },

  // Timeline Overview
  timeline: {
    totalMonths: 10,
    phases: 8,
    criticalMilestones: [
      'Design & Approvals (Months 1-2)',
      'Procurement (Month 3)',
      'Construction (Months 4-7)',
      'Systems Installation (Month 8)',
      'Training (Month 9)',
      'Go-Live (Month 10)'
    ]
  },

  // Staffing Overview
  staffing: {
    coreFte: 2.5,
    facultyPoolFte: 3.0,
    totalFte: 5.5,
    annualPayroll: 232500,
    facultyValue: 330000
  },

  // OPEX Overview (Medium Center)
  opex: {
    year1: 420000,
    year5: 500000,
    avgAnnual: 450000,
    costPerSession: 290,
    sessionsPerMonth: 120
  },

  // Equipment Overview
  equipment: {
    basePackageCost: 380000,
    enhancedPackageCost: 850000,
    simulatorCount: {
      base: 4,
      enhanced: 6
    },
    maintenanceAnnual: {
      base: 38000,
      enhanced: 85000
    }
  },

  // Key Metrics
  metrics: {
    squareFootage: 2400, // 3 sim rooms @ ~400 sq ft each + support
    roomCount: 3,
    annualLearners: 4800,
    sessionsPerYear: 1440,
    costPerLearner: 87.50
  }
}
