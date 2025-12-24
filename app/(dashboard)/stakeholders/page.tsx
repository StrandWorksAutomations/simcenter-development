"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Plus,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Star,
  Pencil,
  Trash2,
  UserCircle
} from "lucide-react"
import {
  INITIAL_STAKEHOLDERS,
  STAKEHOLDER_ROLES,
  ORGANIZATIONS,
  generateStakeholderId,
  type Stakeholder
} from "@/data/seed/stakeholders"

const STORAGE_KEY = 'simulation-stakeholders'

// Role colors for visual distinction
const ROLE_COLORS: Record<string, string> = {
  'Executive Sponsor': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Project Lead': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Technical Lead': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Subject Matter Expert': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Department Representative': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Budget Authority': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Clinical Advisor': 'bg-red-500/20 text-red-400 border-red-500/30',
  'IT Liaison': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'Facilities Contact': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Vendor Contact': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Consultant': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'Other': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
}

function StakeholderCard({
  stakeholder,
  onEdit,
  onDelete
}: {
  stakeholder: Stakeholder
  onEdit: (s: Stakeholder) => void
  onDelete: (id: string) => void
}) {
  const roleColor = ROLE_COLORS[stakeholder.role || 'Other'] || ROLE_COLORS['Other']

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
      <CardContent className="pt-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-blue-500/20">
            <UserCircle className="h-8 w-8 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white">{stakeholder.name}</h3>
              {stakeholder.isPrimary && (
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              )}
            </div>
            <p className="text-sm text-slate-400">{stakeholder.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs border-slate-600">
                <Building2 className="h-3 w-3 mr-1" />
                {stakeholder.organization}
              </Badge>
              {stakeholder.role && (
                <Badge className={`text-xs ${roleColor}`}>
                  {stakeholder.role}
                </Badge>
              )}
            </div>

            {/* Contact info */}
            <div className="mt-3 space-y-1">
              {stakeholder.email && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-3 w-3" />
                  <a href={`mailto:${stakeholder.email}`} className="hover:text-blue-400 transition-colors">
                    {stakeholder.email}
                  </a>
                </div>
              )}
              {stakeholder.phone && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone className="h-3 w-3" />
                  <a href={`tel:${stakeholder.phone}`} className="hover:text-blue-400 transition-colors">
                    {stakeholder.phone}
                  </a>
                </div>
              )}
              {stakeholder.department && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Briefcase className="h-3 w-3" />
                  {stakeholder.department}
                </div>
              )}
            </div>

            {stakeholder.notes && (
              <p className="mt-2 text-xs text-slate-500 italic">{stakeholder.notes}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
              onClick={() => onEdit(stakeholder)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-400"
              onClick={() => onDelete(stakeholder.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface StakeholderFormData {
  name: string
  title: string
  organization: string
  email: string
  phone: string
  role: string
  department: string
  notes: string
  isPrimary: boolean
}

const emptyFormData: StakeholderFormData = {
  name: '',
  title: '',
  organization: 'BHLEX',
  email: '',
  phone: '',
  role: '',
  department: '',
  notes: '',
  isPrimary: false
}

export default function StakeholdersPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStakeholder, setEditingStakeholder] = useState<Stakeholder | null>(null)
  const [formData, setFormData] = useState<StakeholderFormData>(emptyFormData)

  // Load stakeholders from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setStakeholders(JSON.parse(stored))
      } catch {
        setStakeholders(INITIAL_STAKEHOLDERS)
      }
    } else {
      setStakeholders(INITIAL_STAKEHOLDERS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STAKEHOLDERS))
    }
  }, [])

  // Save to localStorage whenever stakeholders change
  useEffect(() => {
    if (stakeholders.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stakeholders))
    }
  }, [stakeholders])

  const handleOpenDialog = (stakeholder?: Stakeholder) => {
    if (stakeholder) {
      setEditingStakeholder(stakeholder)
      setFormData({
        name: stakeholder.name,
        title: stakeholder.title,
        organization: stakeholder.organization,
        email: stakeholder.email || '',
        phone: stakeholder.phone || '',
        role: stakeholder.role || '',
        department: stakeholder.department || '',
        notes: stakeholder.notes || '',
        isPrimary: stakeholder.isPrimary
      })
    } else {
      setEditingStakeholder(null)
      setFormData(emptyFormData)
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (!formData.name || !formData.title) return

    if (editingStakeholder) {
      // Update existing
      setStakeholders(prev => prev.map(s =>
        s.id === editingStakeholder.id
          ? {
              ...s,
              ...formData,
              email: formData.email || undefined,
              phone: formData.phone || undefined,
              role: formData.role || undefined,
              department: formData.department || undefined,
              notes: formData.notes || undefined
            }
          : s
      ))
    } else {
      // Add new
      const newStakeholder: Stakeholder = {
        id: generateStakeholderId(),
        name: formData.name,
        title: formData.title,
        organization: formData.organization,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        role: formData.role || undefined,
        department: formData.department || undefined,
        notes: formData.notes || undefined,
        isPrimary: formData.isPrimary,
        addedAt: new Date().toISOString()
      }
      setStakeholders(prev => [...prev, newStakeholder])
    }

    setIsDialogOpen(false)
    setFormData(emptyFormData)
    setEditingStakeholder(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this stakeholder?')) {
      setStakeholders(prev => prev.filter(s => s.id !== id))
    }
  }

  const primaryStakeholders = stakeholders.filter(s => s.isPrimary)
  const otherStakeholders = stakeholders.filter(s => !s.isPrimary)

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Key Stakeholders</h1>
          <p className="text-slate-400">Project contacts and decision makers</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleOpenDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stakeholder
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingStakeholder ? 'Edit Stakeholder' : 'Add New Stakeholder'}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {editingStakeholder
                  ? 'Update stakeholder information'
                  : 'Add a new stakeholder to the project'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="Job title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Select
                    value={formData.organization}
                    onValueChange={value => setFormData(prev => ({ ...prev, organization: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {ORGANIZATIONS.map(org => (
                        <SelectItem key={org} value={org}>{org}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Project Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={value => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {STAKEHOLDER_ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="bg-slate-700 border-slate-600"
                  placeholder="Department name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-slate-700 border-slate-600"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-slate-700 border-slate-600 resize-none"
                  placeholder="Additional notes about this stakeholder..."
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPrimary"
                  checked={formData.isPrimary}
                  onChange={e => setFormData(prev => ({ ...prev, isPrimary: e.target.checked }))}
                  className="rounded border-slate-600"
                />
                <Label htmlFor="isPrimary" className="text-sm cursor-pointer">
                  Mark as primary stakeholder
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name || !formData.title}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingStakeholder ? 'Save Changes' : 'Add Stakeholder'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stakeholders.length}</div>
                <div className="text-xs text-slate-500">Total Stakeholders</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20">
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{primaryStakeholders.length}</div>
                <div className="text-xs text-slate-500">Primary Contacts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Building2 className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {new Set(stakeholders.map(s => s.organization)).size}
                </div>
                <div className="text-xs text-slate-500">Organizations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Primary Stakeholders */}
      {primaryStakeholders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-400" />
            Primary Stakeholders
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {primaryStakeholders.map(stakeholder => (
              <StakeholderCard
                key={stakeholder.id}
                stakeholder={stakeholder}
                onEdit={handleOpenDialog}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Stakeholders */}
      {otherStakeholders.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-slate-400" />
            Additional Stakeholders
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {otherStakeholders.map(stakeholder => (
              <StakeholderCard
                key={stakeholder.id}
                stakeholder={stakeholder}
                onEdit={handleOpenDialog}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {stakeholders.length === 0 && (
        <Card className="bg-slate-800/50 border-slate-700 border-dashed">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No stakeholders yet</h3>
            <p className="text-sm text-slate-400 mb-4">
              Add key stakeholders to keep track of project contacts
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleOpenDialog()}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Stakeholder
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
