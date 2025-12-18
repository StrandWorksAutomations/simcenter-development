"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Users, Shield, Database, Bell, Key } from "lucide-react"

const userRoles = [
  { role: "Admin", description: "Full access to all features", users: 1 },
  { role: "Project Manager", description: "Edit projects, view all data", users: 0 },
  { role: "Finance", description: "Edit budgets, view all data", users: 0 },
  { role: "Viewer", description: "Read-only access", users: 0 },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500">Application configuration and user management</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Roles
            </CardTitle>
            <CardDescription>Manage access permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userRoles.map((role) => (
                <div key={role.role} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{role.role}</p>
                    <p className="text-sm text-slate-500">{role.description}</p>
                  </div>
                  <Badge variant="outline">{role.users} users</Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Manage Users in Clerk
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Authentication and data protection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Clerk Authentication</p>
                    <p className="text-sm text-green-700">Active & Configured</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Supabase RLS</p>
                    <p className="text-sm text-green-700">Row-Level Security</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="font-medium">Audit Logging</p>
                    <p className="text-sm text-slate-500">Track all data access</p>
                  </div>
                </div>
                <Badge variant="outline">Configure</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Import, export, and backup options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Import from Markdown Document
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export All Data (Excel)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate PDF Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Backup Database
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Application Info
            </CardTitle>
            <CardDescription>Version and environment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Version</span>
                <span className="font-mono">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Environment</span>
                <span className="font-mono">Development</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Framework</span>
                <span className="font-mono">Next.js 14</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Database</span>
                <span className="font-mono">Supabase</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auth</span>
                <span className="font-mono">Clerk</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
