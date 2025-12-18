import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/client'
import type { SimulatorParameters, BudgetResults } from '@/data/seed/budget-simulator'

// GET /api/scenarios - List all scenarios for the current user
export async function GET() {
  try {
    const { userId } = await auth()

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
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch scenarios' },
        { status: 500 }
      )
    }

    return NextResponse.json({ scenarios: data })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/scenarios - Create a new scenario
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, params, results } = body as {
      name: string
      description?: string
      params: SimulatorParameters
      results?: BudgetResults
    }

    if (!name || !params) {
      return NextResponse.json(
        { error: 'Name and params are required' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // If this should be default, unset other defaults first
    if (body.is_default) {
      await (supabase as any)
        .from('scenarios')
        .update({ is_default: false })
        .eq('user_id', userId)
    }

    const { data, error } = await (supabase as any)
      .from('scenarios')
      .insert({
        user_id: userId,
        name,
        description: description || null,
        params: params,
        results_snapshot: results || null,
        is_default: body.is_default || false
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create scenario' },
        { status: 500 }
      )
    }

    return NextResponse.json({ scenario: data }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
