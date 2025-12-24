// Key Stakeholders Data
// Initial stakeholders for Baptist Health Lexington Simulation Center project

export interface Stakeholder {
  id: string
  name: string
  title: string
  organization: string
  email?: string
  phone?: string
  role?: string // Their role in the project (e.g., "Executive Sponsor", "Technical Lead", etc.)
  department?: string
  notes?: string
  isPrimary: boolean // Primary stakeholders are shown prominently
  addedAt: string // ISO timestamp
}

export const INITIAL_STAKEHOLDERS: Stakeholder[] = [
  {
    id: 'stakeholder-1',
    name: 'Jennifer Dent',
    title: 'Director, Training & Development',
    organization: 'BHLEX',
    department: 'Training & Development',
    role: 'Project Lead',
    isPrimary: true,
    addedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'stakeholder-2',
    name: 'Dee Beckman',
    title: 'Vice President, Chief Nursing Officer',
    organization: 'BHSSC Administration',
    department: 'Nursing Administration',
    role: 'Executive Sponsor',
    isPrimary: true,
    addedAt: '2025-01-01T00:00:00Z'
  }
]

// Role options for stakeholders
export const STAKEHOLDER_ROLES = [
  'Executive Sponsor',
  'Project Lead',
  'Technical Lead',
  'Subject Matter Expert',
  'Department Representative',
  'Budget Authority',
  'Clinical Advisor',
  'IT Liaison',
  'Facilities Contact',
  'Vendor Contact',
  'Consultant',
  'Other'
] as const

// Organization options
export const ORGANIZATIONS = [
  'BHLEX',
  'BHSSC Administration',
  'Baptist Health System',
  'External Consultant',
  'Vendor',
  'Other'
] as const

// Generate unique ID for new stakeholders
export function generateStakeholderId(): string {
  return `stakeholder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
