import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'
import type { SimulatorParameters, BudgetResults } from '@/data/seed/budget-simulator'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/scenarios/[id] - Get a specific scenario
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createServerClient()

    const { data, error } = await (supabase as any)
      .from('scenarios')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Scenario not found' },
          { status: 404 }
        )
      }
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch scenario' },
        { status: 500 }
      )
    }

    return NextResponse.json({ scenario: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/scenarios/[id] - Update a scenario
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, params: scenarioParams, results, is_default } = body as {
      name?: string
      description?: string
      params?: SimulatorParameters
      results?: BudgetResults
      is_default?: boolean
    }

    const supabase = createServerClient()

    // Verify ownership
    const { data: existing } = await (supabase as any)
      .from('scenarios')
      .select('id')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (!existing) {
      return NextResponse.json(
        { error: 'Scenario not found' },
        { status: 404 }
      )
    }

    // If setting as default, unset other defaults first
    if (is_default) {
      await (supabase as any)
        .from('scenarios')
        .update({ is_default: false })
        .eq('user_id', userId)
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    }

    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (scenarioParams !== undefined) updateData.params = scenarioParams
    if (results !== undefined) updateData.results_snapshot = results
    if (is_default !== undefined) updateData.is_default = is_default

    const { data, error } = await (supabase as any)
      .from('scenarios')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update scenario' },
        { status: 500 }
      )
    }

    return NextResponse.json({ scenario: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/scenarios/[id] - Delete a scenario
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { userId } = await auth()
    const { id } = await params

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createServerClient()

    const { error } = await (supabase as any)
      .from('scenarios')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete scenario' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
